import TabScreenBackground from "@/components/TabScreenBackground";
import { ScrollView, Text, View } from "react-native";

const InsightsPage = () => {
  return (
    <View className="flex-1 bg-base-200">
      <TabScreenBackground />
      <ScrollView
        className="flex-1 py-4 bg-transparent"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          gap: 14,
        }}
      >
        <View>
          <Text>Insights</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InsightsPage;
