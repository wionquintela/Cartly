import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ListHeroCard = () => {
  const { items, isLoading } = useGroceryStore();
  const completedCount = items.filter((item) => item.purchased).length;
  const pendingCount = items.filter((item) => !item.purchased).length;
  const progress = items.length > 0 ? completedCount / items.length : 0;

  if (isLoading) {
    return null;
  }

  return (
    <View className="w-full justify-center items-start p-5 rounded-[25px] bg-neutral shadow">
      <View className="w-full">
        <Text className="text-sm text-neutral-content/75 p-1">TODAY</Text>
        <Text className="text-4xl font-inter-bold text-neutral-content p-1">
          Your Cartly List
        </Text>
        <View className="w-full  flex-row items-center">
          <Text className="mx-1 text-xs text-neutral-content/75">
            {pendingCount} pending
          </Text>
          <Text className="text-neutral-content/75 pb-1">·</Text>
          <Text className="mx-1 text-xs text-neutral-content/75">
            {completedCount} completed
          </Text>
        </View>
        <View className="py-2">
          <Progress.Bar
            progress={progress}
            width={null}
            height={20}
            color={"#419400"}
            borderWidth={0}
            unfilledColor={"#EBF0E1"}
          />
        </View>
      </View>
    </View>
  );
};

export default ListHeroCard;
