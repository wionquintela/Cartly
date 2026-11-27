import { View } from "react-native";

const TabScreenBackground = () => {
  return (
    <>
      <View className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-neutral/70" />
      <View className="absolute top-32 -left-20 w-56 h-56 rounded-full bg-neutral/20" />
      <View className="absolute bottom-36 right-4 w-52 h-52 rounded-full bg-neutral/50" />
      <View className="absolute -bottom-24 -left-16 w-64 h-64 rounded-3xl rotate-45 bg-neutral/70" />
    </>
  );
};

export default TabScreenBackground;
