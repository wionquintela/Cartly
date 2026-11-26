import CustomModal from "@/components/Modal";
import useSocialAuth from "@/hooks/useSocialAuth";
import { useSignIn, useSignUp } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

export default function SignInScreen() {
  const { signIn, fetchStatus: isSignInLoaded } = useSignIn();
  const { signUp, fetchStatus: isSignUpLoaded } = useSignUp();

  // Mode & verification state
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Loading & error modal state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Authentication failed. Please try again.",
  );

  const { handleSocialAuth, loadingStrategy } = useSocialAuth({
    showModal,
    setShowModal,
  });

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isGithubClicked = loadingStrategy === "oauth_github";
  const isAppleClicked = loadingStrategy === "oauth_apple";

  const isLoading =
    isSubmitting || isGoogleClicked || isGithubClicked || isAppleClicked;

  const ssoApp = ["google", "github", "apple"] as const;

  // 1. Handle Sign-In
  const handleSignIn = async () => {
    if (!isSignInLoaded) return;
    setIsSubmitting(true);

    try {
      const { error } = await signIn.password({
        emailAddress: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        setShowModal(true);
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize();
      }
    } catch (err: any) {
      setErrorMessage(
        err?.errors?.[0]?.message || "Failed to sign in. Please try again.",
      );
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Handle Sign-Up (Step 1: Send Verification Code)
  const handleSignUp = async () => {
    if (!isSignUpLoaded) return;
    setIsSubmitting(true);

    try {
      const { error } = await signUp.password({
        emailAddress: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Could not create account.");
        setShowModal(true);
        return;
      }

      await signUp.verifications.sendEmailCode();
      setPendingVerification(true);
    } catch (err: any) {
      setErrorMessage(
        err?.errors?.[0]?.message || "Failed to sign up. Please try again.",
      );
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Handle Sign-Up (Step 2: Verify 6-Digit Email Code)
  const handleVerifyCode = async () => {
    if (!isSignUpLoaded) return;
    setIsSubmitting(true);

    try {
      const { error } = await signUp.verifications.verifyEmailCode({
        code: code.trim(),
      });

      if (error) {
        setErrorMessage(error.message || "Invalid verification code.");
        setShowModal(true);
        return;
      }

      if (signUp.status === "complete") {
        await signUp.finalize();
      }
    } catch (err: any) {
      setErrorMessage(
        err?.errors?.[0]?.message || "Verification failed. Please try again.",
      );
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-start pt-10 items-center bg-base-200">
      <View className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/30" />
      <View className="absolute -bottom-16 -left-16 w-64 h-64 rounded-3xl rotate-45 bg-emerald-500/20" />

      <View className="my-1">
        <CustomModal
          title={isSignUpMode ? "Sign up failed" : "Sign in failed"}
          subtitle={errorMessage}
          buttonText="Close"
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Ionicons
          name="lock-closed-outline"
          size={35}
          className="text-primary"
        />
      </View>

      <Text className="text-base-content text-5xl leading-relaxed">
        {pendingVerification
          ? "Verify Email"
          : isSignUpMode
            ? "Cartly Sign Up"
            : "Cartly Log In"}
      </Text>

      <View className="flex justify-center w-5/6">
        {pendingVerification ? (
          <>
            <Text className="text-base-content/75 mb-2">
              Enter the 6-digit code sent to {email}
            </Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              placeholder="123456"
              className="bg-base-100 text-base-content rounded-md border border-base-300 px-3 py-3 focus:border-primary"
            />
            <Pressable
              className={`${isLoading ? "opacity-75" : ""} flex justify-center items-center p-3 rounded-md my-7 bg-primary active:bg-primary/75`}
              onPress={handleVerifyCode}
              disabled={isLoading}
            >
              <Text className="text-primary-content">
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text className="text-base-content/75">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="bg-base-100 text-base-content rounded-md border border-base-300 px-3 py-2.5 focus:border-primary"
            />

            <Text className="mt-3 text-base-content/75">Password</Text>
            <View className="bg-base-100 rounded-md border border-base-300 flex flex-row items-center focus:border-primary">
              <TextInput
                value={password}
                onChangeText={setPassword}
                className="flex-1 px-3 py-2.5 text-base-content"
                textContentType="password"
                secureTextEntry={!showPass}
              />
              <Pressable
                className="px-3"
                onPress={() => setShowPass(!showPass)}
              >
                <Ionicons
                  name={showPass ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  className="text-primary"
                />
              </Pressable>
            </View>

            <Pressable
              className={`${isLoading ? "opacity-75" : ""} flex justify-center items-center p-3 rounded-md my-7 bg-primary active:bg-primary/75`}
              onPress={isSignUpMode ? handleSignUp : handleSignIn}
              disabled={isLoading}
            >
              {({ pressed }) => (
                <Text
                  className={
                    pressed ? "text-primary-content/75" : "text-primary-content"
                  }
                >
                  {isLoading
                    ? "Loading..."
                    : isSignUpMode
                      ? "Create Account"
                      : "Continue"}
                </Text>
              )}
            </Pressable>

            {/* Toggle between Sign-In and Sign-Up */}
            <Pressable
              onPress={() => setIsSignUpMode(!isSignUpMode)}
              className="items-center mb-2"
            >
              <Text className="text-base-content/80">
                {isSignUpMode
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <Text className="text-primary font-bold">
                  {isSignUpMode ? "Sign In" : "Sign Up"}
                </Text>
              </Text>
            </Pressable>

            {/* Social Auth Buttons */}
            <View className="mt-5 flex flex-row justify-center items-center">
              {ssoApp.map((app, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleSocialAuth(`oauth_${app}`)}
                  className="mx-3 p-3 bg-neutral rounded-md shadow-sm active:bg-neutral/50"
                >
                  {({ pressed }) => (
                    <Ionicons
                      name={`logo-${app}`}
                      size={30}
                      className={`${pressed ? "text-base-300/75" : "text-base-300"}`}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
