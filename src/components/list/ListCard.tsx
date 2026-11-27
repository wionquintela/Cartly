import { GroceryItem } from "@/store/grocery-store";
import { capitalizeFirstLetter } from "@/utils/formatter";
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
        className="flex flex-row justify-between w-full border border-base-300 rounded-[25px] p-5 bg-base-100"
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
          <View className="flex flex-row justify-between items-center">
            <Pressable
              onPress={() => setIsMinusClicked(!isMinusClicked)}
              className="p-3 border border-base-300 rounded active:bg-base-200"
            >
              <Ionicons
                name="remove-outline"
                size={20}
                className="text-base-content"
              />
            </Pressable>
            <Text className="mx-5 text-sm text-base-content">{quantity}</Text>
            <Pressable
              onPress={() => setIsPlusClicked(!isPlusClicked)}
              className="p-3 border border-base-300 rounded active:bg-base-200"
            >
              <Ionicons
                name="add-outline"
                size={20}
                className="text-base-content"
              />
            </Pressable>
          </View>
        </View>
        <View className="flex w-auto flex-row items-start justify-end">
          <View
            className={`rounded-full py-2 px-5 ${priority === "high" ? "bg-red-200/75" : priority === "medium" ? "bg-green-200/75" : "bg-blue-200/75"}`}
          >
            <Text className={`text-[8px] text-base-content `}>
              {capitalizeFirstLetter(priority)}
            </Text>
          </View>
          <Pressable className="ml-2 bg-red-600 p-3 rounded-md active:bg-red-800">
            <Ionicons
              name="close-outline"
              size={20}
              className="text-base-content"
            />
          </Pressable>
        </View>
      </View>
    );
  },
);

export default ListCard;
