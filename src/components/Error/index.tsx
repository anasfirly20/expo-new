import { SafeAreaView, Text } from "react-native";
import { View } from "@/components/View";

export const Error = () => {
  return (
    <SafeAreaView>
      <View className="px-5">
        <Text>An Error has occurred</Text>
      </View>
    </SafeAreaView>
  );
};
