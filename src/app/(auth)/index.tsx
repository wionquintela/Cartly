import CustomModal from "@/components/Modal";
import useSocialAuth from "@/hooks/useSocialAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

export default function SignInScreen() {
  const [showModal, setShowModal] = useState(false);
  const { handleSocialAuth, loadingStrategy } = useSocialAuth({
    showModal,
    setShowModal,
  });
  const [showPass, setShowPass] = useState(false);

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isGithubClicked = loadingStrategy === "oauth_github";
  const isAppleClicked = loadingStrategy === "oauth_apple";

  const isLoading = isGoogleClicked || isGithubClicked || isAppleClicked;

  const ssoApp = ["google", "github", "apple"] as const;

  return (
    <SafeAreaView className="flex-1 justify-start pt-10 items-center bg-base-200">
      <View className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/30" />

      {/* Bottom-left tilted square */}
      <View className="absolute -bottom-16 -left-16 w-64 h-64 rounded-3xl rotate-45 bg-emerald-500/20" />

      <View className="my-1">
        <View>
          <CustomModal
            title="Sign in failed"
            subtitle="Failed sign in, Please try again."
            buttonText="Close"
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </View>
        <Ionicons
          name="lock-closed-outline"
          size={35}
          className="text-primary"
        />
      </View>
      <Text className="text-base-content text-5xl  leading-relaxed">
        Cartly Sign In
      </Text>
      <View className="flex justify-center w-5/6">
        <Text className="text-base-content/75">Email</Text>
        <TextInput className="bg-base-100  text-base-content rounded-md border border-base-300 px-3 focus:border-primary" />
        <Text className="mt-3 text-base-content/75">Password</Text>
        <View className="bg-base-100 rounded-md border border-base-300 flex flex-row items-center focus:border-primary">
          <TextInput
            className=" flex-1 px-3 text-base-content"
            textContentType="password"
            secureTextEntry={showPass}
          />
          <Pressable className="px-3" onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye-outline" : "eye-off-outline"}
              size={25}
              className="text-primary"
            />
          </Pressable>
        </View>
        <Pressable
          className={`${isLoading ? "opacity-75" : ""}  flex justify-center items-center p-3 rounded-md my-7 bg-primary active:bg-primary/75`}
          onPress={() => alert("clicked")}
          disabled={isLoading}
        >
          {({ pressed }) => (
            <Text
              className={
                pressed ? "text-primary-content/75" : "text-primary-content"
              }
            >
              {isLoading ? "Loading..." : "Continue"}
            </Text>
          )}
        </Pressable>
        <View className="mt-5 flex flex-row justify-center items-center">
          {ssoApp.map((app, index) => (
            <Pressable
              key={index}
              onPress={() => handleSocialAuth(`oauth_${app}`)}
              className="mx-3 p-3 bg-neutral  rounded-md shadow-sm active:bg-neutral/50"
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
      </View>
    </SafeAreaView>
  );
}
