import { SafeAreaView, Text } from "react-native";
import { View } from "@/components/View";

export const Loading = () => {
  return (
    <SafeAreaView>
      <View container center>
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};
