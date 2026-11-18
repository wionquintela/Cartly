import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/android-icon-foreground.png")}
        style={{ width: 200, height: 200, borderRadius: 35 }}
      />
      <Text className="text-red-500">Welcome to cartly</Text>
      <Link href={"/(auth)"}>Sign up</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffcf",
  },
  text: {
    color: "#4b0082",
  },
});
