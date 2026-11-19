import { useClerk, useUser } from "@clerk/expo";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

const HomePage = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(!showModal);
    }
  }

  return (
    <View className={`flex-1 justify-center items-center`}>
      <Modal
        animationType="slide"
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white pt-10 rounded shadow m-5">
            <View className="flex justify-center items-center px-10">
              <Text className="text-lg">Confirm Dialog</Text>
              <Text className="text-sm text-slate-600 mt-2">
                Are you sure you want to sign out?
              </Text>
            </View>
            <View className=" flex flex-row  mt-5 border-t border-t-slate-600">
              <View className="py-5 w-1/2">
                <Pressable
                  onPress={() => setShowModal(!showModal)}
                  disabled={loading}
                  className=""
                >
                  <Text className="text-center text-sm">Close</Text>
                </Pressable>
              </View>
              <View
                className={`py-5 w-1/2 ${loading ? "bg-red-500/50" : "bg-red-500"} border-l border-l-slate-600`}
              >
                <Pressable onPress={handleSignOut} disabled={loading}>
                  <Text className="text-white text-center text-sm">
                    {loading ? "Signing out" : "Sign out"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Image
        source={require("@/assets/images/cart.png")}
        style={styles.networkImage}
      />
      <Text className="text-purple-500 text-2xl font-bold">
        Welcome to Cartly!
      </Text>
      <Text className="text-slate-500 pt-1">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>

      <Pressable
        onPress={() => setShowModal(!showModal)}
        className="mt-5 bg-blue-600 px-6 py-3 rounded-lg active:opacity-75"
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  localImage: {
    // Optional: Local images automatically infer their dimensions
  },
  networkImage: {
    width: 150,
    height: 150,
  },
});

export default HomePage;
