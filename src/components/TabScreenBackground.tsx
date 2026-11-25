import { View } from "react-native";

const TabScreenBackground = () => {
  return (
    <>
      <View className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/30" />
      <View className="absolute -bottom-16 -left-16 w-64 h-64 rounded-3xl rotate-45 bg-emerald-500/20" />
    </>
  );
};

export default TabScreenBackground;
