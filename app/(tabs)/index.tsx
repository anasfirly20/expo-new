import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import { View } from "@/src/components/View";
import MenuApi from "@/src/api/routes/menu";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Error } from "@/src/components/Error";
import { Loading } from "@/src/components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { setMenuData, setStatus, Status } from "@/src/store/slices/menuSlice";
import { useEffect } from "react";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { data: menuData, status } = useSelector(
    (state: RootState) => state.menu
  );

  const fetchMenu = async () => {
    try {
      dispatch(setStatus(Status.LOADING));
      const data = await MenuApi.getMenu();
      dispatch(setMenuData(data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };

  useEffect(() => {
    if (!menuData?.recipes) {
      console.log("FETCH API");
      fetchMenu();
    }
  }, []);

  if (status === Status.LOADING) return <Loading />;

  if (status === Status.ERROR) return <Error />;

  if (!menuData?.recipes) return <Error />;

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View className="px-3">
          <Text className="text-2xl font-semibold">Hey, Margaret</Text>
          <Text className="">asdsa</Text>
          <Text className="text-2xl font-semibold">Menu</Text>
          <FlatList
            data={menuData.recipes}
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
