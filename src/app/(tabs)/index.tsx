import ListCard from "@/components/list/ListCard";
import ListHeroCard from "@/components/list/ListHeroCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { useClerk, useUser } from "@clerk/expo";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ListScreen = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { signOut } = useClerk();

  const { loadItems, items } = useGroceryStore();

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
    <View className="flex-1 bg-base-200">
      <TabScreenBackground />
      <ScrollView
        className="flex-1 bg-transparent"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
          gap: 14,
        }}
      >
        <View className="mt-10">
          <ListHeroCard />
        </View>
        <View className="flex-row items-center justify-between mx-4">
          <Text className="text-base-content/70 font-semibold text-sm">
            Shopping Items
          </Text>
          <Text className="text-base-content/70 text-sm">
            {items.length} active
          </Text>
        </View>
        <View>
          <ListCard />
        </View>
      </ScrollView>
    </View>
  );
};

//   <View
//     className={`flex-1 bg-base-200 justify-center items-center ${showModal ? "opacity-50" : ""}`}
//   >

//     <Modal
//       animationType="slide"
//       visible={showModal}
//       transparent={true}
//       onRequestClose={() => {
//         alert("Modal has been closed.");
//         setShowModal(!showModal);
//       }}
//     >
//       <View className="flex-1 justify-center items-center">
//         <View className="border border-base-300 bg-base-100 pt-10 shadow m-5 rounded-lg">
//           <View className="flex justify-center items-center px-10">
//             <Text className="text-lg text-base-content">Confirm Dialog</Text>
//             <Text className="text-sm text-base-content/75 mt-2">
//               Are you sure you want to sign out?
//             </Text>
//           </View>
//           <View className="flex flex-row  mt-5">
//             <Pressable
//               onPress={() => setShowModal(!showModal)}
//               disabled={loading}
//               className="py-5 w-1/2 bg-base-300/75 active:bg-base-300 rounded-bl-lg"
//             >
//               <Text className="text-center text-sm">Close</Text>
//             </Pressable>
//             <Pressable
//               onPress={handleSignOut}
//               disabled={loading}
//               className={`py-5 w-1/2 ${loading ? "bg-neutral/50" : "bg-neutral"} border-l border-l-base-300 rounded-br-lg`}
//             >
//               <Text className="text-neutral-content text-center text-sm">
//                 {loading ? "Signing out" : "Sign out"}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//     <Image
//       source={require("@/assets/images/cart.png")}
//       style={styles.networkImage}
//     />
//     <Text className="text-base-content text-2xl font-inter-bold">
//       Welcome to Cartly!
//     </Text>
//     <View className="flex justify-center items-center">
//       <UserButton />
//       <Text className="text-base-content/75 pt-1">
//         {user?.primaryEmailAddress?.emailAddress}
//       </Text>
//     </View>

//     <Pressable
//       onPress={() => setShowModal(!showModal)}
//       className="mt-5 bg-primary px-6 py-3 rounded-lg active:opacity-75"
//       disabled={loading}
//     >
//       <Text className="text-white font-semibold text-base" numberOfLines={1}>
//         Sign out
//       </Text>
//     </Pressable>
//   </View>
// );

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

export default ListScreen;
