import { useSignIn } from "@clerk/expo";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignIn() {
    if (!isLoaded) return;
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Sign in failed");
    }
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-purple-600 mb-6 text-center">
        Sign in to Cartly
      </Text>

      {error ? (
        <Text className="text-red-500 mb-3 text-center">{error}</Text>
      ) : null}

      <TextInput
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-slate-300 rounded-lg px-4 py-3 mb-3"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-slate-300 rounded-lg px-4 py-3 mb-5"
      />

      <Pressable
        onPress={handleSignIn}
        className="bg-blue-600 py-3 rounded-lg items-center active:opacity-75"
      >
        <Text className="text-white font-semibold text-base">Sign in</Text>
      </Pressable>
    </View>
  );
}
