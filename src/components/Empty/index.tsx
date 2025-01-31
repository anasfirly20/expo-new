import React from "react";
import { Text, SafeAreaView } from "react-native";
import { View } from "../View";

export const Empty = () => {
  return (
    <SafeAreaView>
      <View center>
        <Text className="text-lg text-gray-500">No menu found.</Text>
      </View>
    </SafeAreaView>
  );
};
