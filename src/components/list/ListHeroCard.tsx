import { Text, View } from "react-native";
import * as Progress from "react-native-progress";

const ListHeroCard = () => {
  return (
    <View className="flex-1 justify-center items-start p-5 border border-base-300 rounded-[25px] bg-base-100">
      <View className="flex-1 w-full">
        <Text className="text-sm text-base-content/75 p-1">TODAY</Text>
        <Text className="text-3xl font-bold text-base-content p-1">
          ListHeroCard
        </Text>
        <View className="flex-1 w-full  flex-row items-center">
          <Text className="mx-1 text-xs text-base-content/75">6 pending</Text>
          <Text className="text-base-content/75 pb-1">·</Text>
          <Text className="mx-1 text-xs text-base-content/75">5 completed</Text>
        </View>
        <View className="py-2">
          <Progress.Bar progress={0.75} width={null} color={"#4C563D"} />
        </View>
      </View>
    </View>
  );
};

export default ListHeroCard;
