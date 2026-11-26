import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
import { Pressable, Text, View } from "react-native";
import CircleCheckbox from "../CircleCheckbox";
import { useState } from "react";

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

const ListCard = () => {
  return (
    <View className="flex w-full border border-base-300 rounded-md p-5 bg-base-100">
      <View className="flex w-full flex-row  justify-between items-center">
        <View className="flex items-center w-1/2 flex-row">
          <CircleCheckbox />
          <Text className="ml-5 text-base-content text-xs">White Bread</Text>
        </View>
        <View className=" flex w-1/2 flex-row items-start justify-end">
          <View className="p-2 bg-success rounded-md">
            <Text className="text-[8px] text-base-100">LOW</Text>
          </View>
          <Pressable className="ml-5 bg-red-500 p-3 rounded-md">
            <Ionicons
              name="close-outline"
              size={20}
              className="text-base-100"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ListCard;
