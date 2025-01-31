import {
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Platform,
} from "react-native";
import { View } from "@/src/components/View";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Error } from "@/src/components/Error";
import { Loading } from "@/src/components/Loading";
import { Status } from "@/src/store/slices/menuSlice";
import { useHome } from "./functions";
import { Empty } from "@/src/components/Empty";
import { RecipeCard } from "@/src/components/Home/RecipeCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { menuData, status, filteredRecipes, searchQuery, handleSearchQuery } =
    useHome();
  const insets = useSafeAreaInsets();

  if (status === Status.LOADING) return <Loading />;
  if (status === Status.ERROR) return <Error />;
  if (!menuData?.recipes) return <Empty />;

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        className="flex-1 bg-gray-5"
        style={{
          paddingTop: Platform.OS === "android" ? insets.top : 0,
        }}
      >
        <View className="px-3 flex-1">
          <View className="mb-4">
            <Text className="text-xl font-semibold mb-1 text-zinc-900">
              Recipe List
            </Text>
          </View>

          <TextInput
            placeholder="Search by name"
            value={searchQuery}
            onChangeText={handleSearchQuery}
            className="mb-4 p-3 rounded-lg border border-zinc-300 bg-white text-black"
          />

          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RecipeCard item={item} />}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
