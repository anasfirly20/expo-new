import React, { useState } from "react";
import {
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { View } from "@/src/components/View";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Error } from "@/src/components/Error";
import { Loading } from "@/src/components/Loading";
import { Status } from "@/src/store/slices/menuSlice";
import { Ionicons } from "@expo/vector-icons";
import { TGETMenu } from "@/src/api/types";
import { useHome } from "./functions";
import { cn } from "@/utils/cn";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

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
  if (!menuData?.recipes) return <Error />;

  const renderItem = ({ item }: { item: TGETMenu["recipes"][number] }) => (
    <Link
      href={{
        pathname: "/(home)/[id]",
        params: {
          id: item.id,
        },
      }}
    >
      <View className="mb-4" style={{ width: CARD_WIDTH }}>
        <View
          className={cn(
            "rounded-3xl p-4 shadow-sm",
            isDarkMode ? "bg-zinc-800" : "bg-white"
          )}
        >
          <Image
            source={{ uri: item.image }}
            className="w-full h-32 rounded-2xl mb-3"
            resizeMode="cover"
          />
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              isDarkMode ? "text-white" : "text-zinc-900"
            )}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View row className="justify-between items-center">
            <View row className="items-center space-x-1">
              <Ionicons
                name="time-outline"
                size={14}
                color={isDarkMode ? "#999" : "#666"}
              />
              <Text
                className={cn(
                  "text-xs",
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                )}
              >
                {item.cookTimeMinutes} Min
              </Text>
            </View>
            <View row className="items-center space-x-1">
              <Ionicons
                name="flame-outline"
                size={14}
                color={isDarkMode ? "#999" : "#666"}
              />
              <Text
                className={cn(
                  "text-xs",
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                )}
              >
                {item.difficulty} Lvl
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Link>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
              Meal Category
            </Text>
          </View>

          <TextInput
            placeholder="Search by name"
            value={searchQuery}
            onChangeText={handleSearchQuery}
            className={cn(
              "mb-4 p-2 rounded-lg",
              isDarkMode ? "bg-zinc-700 text-white" : "bg-white text-black"
            )}
          />

          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
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
