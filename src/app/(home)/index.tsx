import { useClerk, useUser } from "@clerk/expo";
import { Pressable, Text, View } from "react-native";

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("Sign out error:", JSON.stringify(error, null, 2));
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-purple-500 text-2xl font-bold">
        Welcome to Cartly!
      </Text>
      <Text className="text-slate-500 pt-1">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>

      <Pressable
        onPress={handleSignOut}
        className="mt-5 bg-blue-600 px-6 py-3 rounded-lg active:opacity-75"
      >
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

export default HomePage;
