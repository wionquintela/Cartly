import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AuthPage() {
  const {
    signIn,
    errors: signInErrors,
    fetchStatus: signInFetchStatus,
  } = useSignIn();
  const {
    signUp,
    errors: signUpErrors,
    fetchStatus: signUpFetchStatus,
  } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFetching =
    signInFetchStatus === "fetching" || signUpFetchStatus === "fetching";

  const navigateAfterAuth = ({
    session,
    decorateUrl,
  }: {
    session: { currentTask?: unknown } | null | undefined;
    decorateUrl: (url: string) => string;
  }) => {
    if (session?.currentTask) {
      // Handle pending session tasks
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
      console.log(session.currentTask);
      return;
    }

    const url = decorateUrl("/");
    if (url.startsWith("http")) {
      window.location.href = url;
    } else {
      router.push(url as Href);
    }
  };

  const handleSubmit = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });
    if (error) {
      // If the identifier is not found, the user is not signed up yet — swap to the sign-up flow
      if (
        isClerkAPIResponseError(error) &&
        error.errors[0]?.code === "form_identifier_not_found"
      ) {
        try {
          const { error: signUpError } = await signUp.password({
            emailAddress,
            password,
          });
          if (signUpError) {
            console.error(
              "Sign-up after identifier-not-found:",
              JSON.stringify(signUpError, null, 2),
            );
            return;
          }

          // Send the user a verification code to verify their email address
          await signUp.verifications.sendEmailCode();

          const needsEmailCode =
            Array.isArray(signUp.unverifiedFields) &&
            signUp.unverifiedFields.includes("email_address");

          // Display second form to collect the verification code
          if (needsEmailCode) {
            setShowEmailCode(true);
            return;
          }

          // If the user is missing required fields, handle accordingly
          // This example redirects to the continue page; see https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
          if (
            signUp.status === "missing_requirements" &&
            (signUp.missingFields?.length ?? 0) > 0
          ) {
            router.push("/continue" as Href);
            return;
          }

          console.error("Unexpected sign-up state after password:", {
            status: signUp.status,
            unverifiedFields: signUp.unverifiedFields,
            missingFields: signUp.missingFields,
          });
          return;
        } catch (err: unknown) {
          console.error(JSON.stringify(err, null, 2));
          return;
        }
      }
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    // If the identifier is found, no need to swap to sign-up. Continue with sign-in flow.
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          navigateAfterAuth({ session, decorateUrl });
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/device-trust
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  // Handles both the sign-up and sign-in email code verification
  const handleVerify = async () => {
    // Handle sign-up with email code verification
    if (showEmailCode) {
      const { error } = await signUp.verifications.verifyEmailCode({
        code,
      });
      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            navigateAfterAuth({ session, decorateUrl });
          },
        });
        return;
      }

      // Check why the status is not complete
      console.error("Sign-up attempt not complete. Status:", signUp.status);
      return;
    }

    // Handle sign-in with email code verification
    const { error } = await signIn.mfa.verifyEmailCode({
      code,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          navigateAfterAuth({ session, decorateUrl });
        },
      });
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete. Status:", signIn.status);
    }
  };

  const handleStartOver = () => {
    signIn.reset();
    setShowEmailCode(false);
    setCode("");
  };

  if (showEmailCode || signIn.status === "needs_client_trust") {
    const codeError = signUpErrors.fields?.code ?? signInErrors.fields?.code;

    return (
      <View style={styles.flex}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex justify-center items-center mt-20">
            <Text className="text-purple-500">Verify your account</Text>
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Code</Text>
            <TextInput
              style={styles.input}
              value={code}
              placeholder="Enter verification code"
              placeholderTextColor="#666666"
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {codeError ? (
              <Text style={styles.error}>{codeError.message}</Text>
            ) : null}
          </View>

          <Pressable
            className="bg-slate-600 flex-1 justify-center items-center p-3 rounded"
            onPress={handleVerify}
            disabled={!code || isFetching}
          >
            <Text style={styles.buttonText}>
              {isFetching ? "Verifying..." : "Verify"}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => signIn.mfa.sendEmailCode()}
          >
            <Text style={styles.secondaryButtonText}>I need a new code</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleStartOver}
          >
            <Text style={styles.secondaryButtonText}>Start over</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  const canContinue =
    emailAddress.length > 0 && password.length > 0 && !isFetching;

  return (
    <View style={styles.flex}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center mt-20">
          <Text className="text-purple-500 text-5xl">Cartly</Text>
          <Text className="text-slate-500 text-xl">Sign up / sign in</Text>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            value={emailAddress}
            placeholder="Enter email address"
            placeholderTextColor="#666666"
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            aria-disabled={isFetching}
          />
          {signInErrors.fields?.identifier ? (
            <Text style={styles.error}>
              {signInErrors.fields.identifier.message}
            </Text>
          ) : null}
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Password</Text>
          <View className="flex flex-row items-center w-full bg-white border border-gray-300 rounded-lg px-3">
            <TextInput
              value={password}
              className="flex-1 "
              placeholder="Enter password"
              placeholderTextColor="#666666"
              onChangeText={setPassword}
              secureTextEntry={showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              aria-disabled={isFetching}
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="px-2"
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={25}
                color="#64748B"
              />
            </Pressable>
          </View>

          {signInErrors.fields?.password ? (
            <Text className="text-red-600 italic text-sm">
              {signInErrors.fields.password.message}
            </Text>
          ) : null}
        </View>

        <Pressable
          className={`${isFetching || canContinue ? "bg-slate-500" : "bg-slate-500/50"} flex-1 justify-center items-center p-3 rounded`}
          onPress={handleSubmit}
          disabled={!canContinue || isFetching}
        >
          <Text style={styles.buttonText}>
            {isFetching ? "Continuing..." : "Continue"}
          </Text>
        </Pressable>

        {(signInErrors || signUpErrors) && (
          <Text style={styles.debug}>
            {JSON.stringify({ signInErrors, signUpErrors }, null, 2)}
          </Text>
        )}

        {/* For your debugging purposes. You can just console.log errors, but
    we put them in the UI for convenience */}
        {signInErrors && (
          <Text style={styles.debug}>
            {JSON.stringify(signInErrors, null, 2)}
          </Text>
        )}
        {signUpErrors && (
          <Text style={styles.debug}>
            {JSON.stringify(signUpErrors, null, 2)}
          </Text>
        )}

        {/*
        If you're building for web, add a <div id="clerk-captcha" /> element for legacy bot sign-up protection.
        See https://clerk.com/docs/guides/secure/legacy-bot-protection
        If you're building for native, Clerk handles risk checks without that DOM mount.
      */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: 30,
    fontWeight: "900",
    color: "purple",
  },
  fieldBlock: {
    gap: 6,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: {
    color: "#0a7ea4",
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 12,
    alignItems: "center",
  },
  error: {
    color: "#d32f2f",
    fontSize: 12,
    marginTop: 4,
  },
  debug: {
    fontSize: 10,
    opacity: 0.5,
    marginTop: 8,
  },
});

//custom made
// import { useSignIn } from "@clerk/expo";
// import { Link } from "expo-router";
// import { useState } from "react";
// import { Pressable, Text, TextInput, View } from "react-native";

// export default function SignInScreen() {
//   const { signIn, errors, fetchStatus } = useSignIn();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fieldError, setFieldError] = useState("");

//   async function handleSignIn(email: string, password: string) {
//     if (fetchStatus === "fetching") {
//       return;
//     }
//     console.log(fetchStatus);
//     if (email === "" || password === "") {
//       setFieldError("Please complete all fields");
//       return;
//     }

//     try {
//       const { error } = await signIn.password({
//         emailAddress: email,
//         password,
//       });
//       //check error
//       if (error) {
//         setFieldError(JSON.stringify(error.message, null, 2));
//         console.log(JSON.stringify(error.message, null, 2));
//         return;
//       }
//       //
//       if (signIn.status === "complete") {
//         await signIn.finalize();
//       }
//     } catch (error) {
//       console.log("Error signing in", error);
//     }
//   }

//   return (
//     <View className="flex-1 justify-center px-6 bg-white">
//       <Text className="text-2xl font-bold text-purple-600 mb-6 text-center">
//         Sign in to Cartly
//       </Text>

//       <TextInput
//         placeholder="Email address"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//         className="border border-slate-300 rounded-lg px-4 py-3 mb-3"
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         className="border border-slate-300 rounded-lg px-4 py-3 mb-3"
//       />
//       {fieldError ? (
//         <Text className="text-red-500 mb-3 text-center">{fieldError}</Text>
//       ) : null}
//       <View className="mt-3">
//         <Pressable
//           onPress={() => handleSignIn(email, password)}
//           className="bg-blue-600 py-3 rounded-lg items-center active:opacity-75"
//           disabled={fetchStatus !== "idle"}
//         >
//           <Text className="text-white font-semibold text-base">
//             {fetchStatus !== "idle" ? "Signing in..." : "Sign in"}
//           </Text>
//         </Pressable>
//       </View>
//       <View className="my-3">
//         <Link href={"/sign-up"} asChild>
//           <Pressable
//             onPress={() => console.log("click")}
//             className="bg-purple-600 py-3 rounded-lg items-center active:opacity-75"
//             disabled={fetchStatus !== "idle"}
//           >
//             <Text className="text-white font-semibold text-base">
//               Create Account
//             </Text>
//           </Pressable>
//         </Link>
//       </View>
//     </View>
//   );
// }
