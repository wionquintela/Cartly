import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";

interface ChildProps {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

const CircleCheckbox = ({ isChecked, setIsChecked }: ChildProps) => {
  return (
    <Pressable onPress={() => setIsChecked(!isChecked)}>
      <View
        className={`rounded-full border border-base-300 transition ${isChecked ? "bg-primary" : "bg-base-100"} w-10 h-10`}
      ></View>
    </Pressable>
  );
};

export default CircleCheckbox;
