import { StyleSheet, Text } from "react-native";

import { View } from "@/src/components/View";

export default function HomeScreen() {
  return (
    <View className="px-4">
      <Text className="text-2xl font-semibold text-white">Hey, Margaret</Text>
      <Text className="text-white">asdsa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
