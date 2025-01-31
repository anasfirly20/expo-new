import { Text, FlatList, SafeAreaView, TextInput } from "react-native";
import { View } from "@/src/components/View";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Error } from "@/src/components/Error";
import { Loading } from "@/src/components/Loading";
import { Status } from "@/src/store/slices/menuSlice";
import { useHome } from "./functions";
import { cn } from "@/utils/cn";
import { Empty } from "@/src/components/Empty";
import { RecipeCard } from "@/src/components/Home/RecipeCard";

export default function HomeScreen() {
  const {
    menuData,
    status,
    colorScheme,
    filteredRecipes,
    searchQuery,
    handleSearchQuery,
  } = useHome();
  const isDarkMode = colorScheme === "dark";

  if (status === Status.LOADING) return <Loading />;
  if (status === Status.ERROR) return <Error />;
  if (!menuData?.recipes) return <Empty />;

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        className={cn(
          "flex-1",
          colorScheme === "dark" ? "bg-black" : "bg-gray-50"
        )}
      >
        <View className="px-3 flex-1">
          <View className="mb-4">
            <Text
              className={cn(
                "text-xl font-semibold mb-1",
                colorScheme === "dark" ? "text-white" : "text-zinc-900"
              )}
            >
              Recipe List
            </Text>
          </View>

          <TextInput
            placeholder="Search by name"
            value={searchQuery}
            onChangeText={handleSearchQuery}
            className={cn(
              "mb-4 p-3 rounded-lg border border-zinc-300",
              isDarkMode ? "bg-zinc-700 text-white" : "bg-white text-black"
            )}
          />

          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RecipeCard item={item} isDarkMode={isDarkMode} />
            )}
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
