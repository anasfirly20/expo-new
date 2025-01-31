import React from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { Loading } from "@/src/components/Loading";
import { Error } from "@/src/components/Error";
import { Ionicons } from "@expo/vector-icons";
import { useRecipeDetail } from "./functions";
import { Empty } from "@/src/components/Empty";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RecipeDetail() {
  const { recipe, status } = useRecipeDetail();
  const insets = useSafeAreaInsets();

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error />;
  if (!recipe) return <Empty />;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Ionicons
        key={i}
        name={i < rating ? "star" : "star-outline"}
        size={16}
        color="#FF6318"
      />
    ));
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View
          className="relative"
          style={{
            paddingTop: Platform.OS === "android" ? insets.top : 0,
          }}
        >
          <Image
            source={{ uri: recipe.image }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="absolute bottom-2 left-2"
            contentContainerClassName="gap-2"
          >
            {recipe.tags.map((tag) => (
              <View
                key={tag}
                className="bg-black/70 p-1.5 px-3 rounded-2xl shadow-md"
              >
                <Text className="text-white font-medium">{tag}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="p-4">
          <Text className="text-3xl font-bold mb-2">{recipe.name}</Text>
          <View className="flex-row items-center mb-4">
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text className="ml-1 mr-4 text-sm text-gray-600">
              {recipe.cookTimeMinutes} mins
            </Text>
            <Ionicons name="flame-outline" size={16} color="#666" />
            <Text className="ml-1 mr-4 text-sm text-gray-600">
              {recipe.difficulty}
            </Text>
            <Ionicons name="restaurant-outline" size={16} color="#666" />
            <Text className="ml-1 text-sm text-gray-600">
              {recipe.caloriesPerServing} cal
            </Text>
          </View>
          <Text className="text-2xl font-bold">Cuisine</Text>
          <Text className="text-lg text-gray-800">{recipe.cuisine}</Text>
          <Text className="text-2xl font-bold mt-6">Meal Type</Text>
          <Text className="text-lg text-gray-800">
            {recipe.mealType.join(", ")}
          </Text>
          <Text className="text-2xl font-bold mt-6">Rating</Text>
          <View className="flex-row items-center">
            {renderStars(Math.round(recipe.rating))}
            <Text className="ml-2.5">({recipe.reviewCount} reviews)</Text>
          </View>
          <Text className="text-2xl font-bold mt-6">Ingredients</Text>
          <Text className="text-lg text-gray-800">
            {recipe.ingredients.join(", ")}
          </Text>
          <Text className="text-2xl font-bold mt-6">Instructions</Text>
          <Text className="text-lg text-gray-800">
            {recipe.instructions.join("\n")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
