import ListCard from "@/components/list/ListCard";
import ListHeroCard from "@/components/list/ListHeroCard";
import { useGroceryStore } from "@/store/grocery-store";
import { useClerk, useUser } from "@clerk/expo";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const ListScreen = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { signOut } = useClerk();

  const { loadItems, items } = useGroceryStore();

  console.log("LIST SCREEN MOUNTED");

  useEffect(() => {
    loadItems();
  }, []);

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
    <View className="flex-1 bg-base-200 pt-5 px-5">
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View className="my-3">
            <ListCard {...item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <View className="mt-10">
              <ListHeroCard />
            </View>
            <View className="flex-row items-center justify-between mx-4 mt-3">
              <Text className="text-base-content/70 font-semibold text-sm">
                Shopping Items
              </Text>
              <Text className="text-base-content/70 text-sm">
                {items.length} actives
              </Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default ListScreen;
