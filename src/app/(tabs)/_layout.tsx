import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "react-native";

const TabsLayout = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  console.log("TABS LAYOUT MOUNTED");

  // Colors mapped directly from your CSS variables
  const theme = isDark
    ? {
        primary: "#a6d96a", // rgb(166 217 106)
        base100: "#181c16", // rgb(24 28 22)
        base200: "#22281e", // rgb(34 40 30)
        base300: "#31392a", // rgb(49 57 42)
        defaultText: "#ebf0e1", // rgb(235 240 225) - base-content
      }
    : {
        primary: "#419400", // rgb(65 148 0)
        base100: "#f8fdef", // rgb(248 253 239)
        base200: "#e1e6d9", // rgb(225 230 217)
        base300: "#cbcfc3", // rgb(203 207 195)
        defaultText: "#343300", // rgb(52 51 0) - neutral
      };

  return (
    <NativeTabs
      tintColor={theme.primary}
      backgroundColor={theme.base100}
      indicatorColor={theme.base200}
      rippleColor={theme.base300}
      iconColor={{
        default: theme.defaultText,
        selected: theme.primary,
      }}
      labelStyle={{
        default: {
          color: theme.defaultText,
          fontSize: 11,
          fontWeight: "500",
        },
        selected: {
          color: theme.primary,
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
        {/* <NativeTabs.Trigger.Badge>3+</NativeTabs.Trigger.Badge> */}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
