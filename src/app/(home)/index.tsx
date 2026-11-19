import { useClerk, useUser } from "@clerk/expo";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const { signOut } = useClerk();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.log("Sign out error:", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
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
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          {loading ? "Signing out..." : "Sign out"}
        </Text>
      </Pressable>
    </View>
  );
};

export default HomePage;
