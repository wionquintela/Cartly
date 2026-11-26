import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import CircleCheckbox from "../CircleCheckbox";

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

const ListCard = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isMinusClicked, setIsMinusClicked] = useState(false);
  const [isPlusClicked, setIsPlusClicked] = useState(false);

  return (
    <View className="flex flex-row justify-between w-full border border-base-300 rounded-md p-5 bg-base-100">
      {/*Top row */}
      <View className="">
        <CircleCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
      </View>
      <View className="ml-2 flex flex-col justify-start w-1/2">
        <Text className="text-base-content text-sm">White Bread</Text>
        <View className="my-1 flex self-start justify-center bg-primary/25 p-2 rounded-md">
          <Text className="text-primary text-[8px]">Pastry</Text>
        </View>
        <View className="flex flex-row items-center mt-5">
          <Pressable
            onPress={() => setIsMinusClicked(!isMinusClicked)}
            className="p-3 border border-base-300 rounded active:bg-base-200"
          >
            <Ionicons name="remove-outline" size={20} />
          </Pressable>
          <Text className="mx-5">10</Text>
          <Pressable
            onPress={() => setIsPlusClicked(!isPlusClicked)}
            className="p-3 border border-base-300 rounded active:bg-base-200"
          >
            <Ionicons name="add-outline" size={20} />
          </Pressable>
        </View>
      </View>
      <View className="flex w-auto flex-row items-start justify-end">
        <View className="py-2 px-5 bg-base-300 rounded-l-full rounded-r-full">
          <Text className="text-[8px] text-base-content">LOW</Text>
        </View>
        <Pressable className="ml-2 bg-red-800 p-3 rounded-md">
          <Ionicons name="close-outline" size={20} className="text-base-100" />
        </Pressable>
      </View>
    </View>
  );
};

export default ListCard;
