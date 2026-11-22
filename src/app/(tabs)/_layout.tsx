import { NativeTabs } from "expo-router/native-tabs";

const TabsLayout = () => {
  return (
    <NativeTabs
      tintColor={"#419400"}
      backgroundColor={"#F8FDEF"}
      indicatorColor="#e1e6d9"
      rippleColor="#cbcfc3"
      iconColor={{
        default: "#343300",
        selected: "#419400",
      }}
      labelStyle={{
        default: {
          color: "#343300",
          fontSize: 11,
          fontWeight: "500",
        },
        selected: {
          color: "#419400",
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="list.bullet.clipboard"
          md="format_list_bulleted"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Icon sf="note.text.badge.plus" md="add_circle" />
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Icon
          sf="chart.line.uptrend.xyaxis"
          md="analytics"
        />
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
