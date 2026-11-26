import { GroceryItem } from "@/store/grocery-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
import { memo, useState } from "react";
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

const ListCard = memo(
  ({ id, name, category, quantity, purchased, priority }: GroceryItem) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isMinusClicked, setIsMinusClicked] = useState(false);
    const [isPlusClicked, setIsPlusClicked] = useState(false);

    return (
      <View
        key={id}
        className="flex flex-row justify-between w-full border border-base-300 rounded-lg p-5 bg-base-100"
      >
        {/*Top row */}
        <View className="">
          <CircleCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
        </View>
        <View className="ml-2 flex flex-col justify-start w-1/2">
          <Text className="text-base-content text-sm">{name}</Text>
          <View className="mt-3 mb-5 flex self-start justify-center bg-primary/25 p-2 rounded-md">
            <Text className="text-primary text-[8px]">{category}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Pressable
              onPress={() => setIsMinusClicked(!isMinusClicked)}
              className="p-3 border border-base-300 rounded active:bg-base-200"
            >
              <Ionicons name="remove-outline" size={20} />
            </Pressable>
            <Text className="mx-5 text-sm">{quantity}</Text>
            <Pressable
              onPress={() => setIsPlusClicked(!isPlusClicked)}
              className="p-3 border border-base-300 rounded active:bg-base-200"
            >
              <Ionicons name="add-outline" size={20} />
            </Pressable>
          </View>
        </View>
        <View className="flex w-auto flex-row items-start justify-end">
          <View
            className={`py-2 px-5 ${priority === "high" ? "bg-red-200/75" : priority === "medium" ? "bg-green-200/75" : "bg-blue-200/75"} rounded-l-full rounded-r-full`}
          >
            <Text
              className={`${priority === "high" ? "text-red-400" : priority === "medium" ? "text-green-400" : "text-blue-400"} rounded-l-full rounded-r-full text-[8px]`}
            >
              {priority}
            </Text>
          </View>
          <Pressable className="ml-2 bg-red-800 p-3 rounded-md">
            <Ionicons
              name="close-outline"
              size={20}
              className="text-base-100"
            />
          </Pressable>
        </View>
      </View>
    );
  },
);

export default ListCard;
