import { Link, Stack } from "expo-router";
import { View } from "@/components/View";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="h-full items-center justify-center p-5">
        <Text className="text-3xl">This screen doesn't exist.</Text>
        <Link href="/" className="mt-3 py-3">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
