import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";

import { View } from "@/src/components/View";
import { useQuery } from "@tanstack/react-query";
import MenuApi from "@/src/api/routes/menu";
import { TGETMenu } from "@/src/api/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Error } from "@/src/components/Error";
import { Loading } from "@/src/components/Loading";

export default function HomeScreen() {
  const {
    data: menu,
    isFetching,
    error,
  } = useQuery<TGETMenu>({
    queryKey: ["menu"],
    queryFn: MenuApi.getMenu,
  });

  if (isFetching) return <Loading />;

  if (error) return <Error />;

  if (!menu?.recipes) return <Error />;

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View className="px-3">
          <Text className="text-2xl font-semibold">Hey, Margaret</Text>
          <Text className="">asdsa</Text>
          <Text className="text-2xl font-semibold">Menu</Text>
          <FlatList
            data={menu.recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="mt-5">
                <Text className="text-xl font-semibold">{item.name}</Text>
                <Text className="text-sm text-gray-500">{item.difficulty}</Text>
              </View>
            )}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ height: 200 }}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
