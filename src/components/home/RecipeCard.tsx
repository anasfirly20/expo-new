import React from "react";
import { Text, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TGETMenu } from "@/src/api/types";
import { Link } from "expo-router";
import { cn } from "@/utils/cn";
import { View } from "@/components/View";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

interface RecipeCardProps {
  item: TGETMenu["recipes"][number];
  isDarkMode: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ item, isDarkMode }) => (
  <Link
    href={{
      pathname: "/(home)/[id]",
      params: {
        id: item.id,
      },
    }}
    className="mb-4 border-2"
  >
    <View
      style={{
        width: CARD_WIDTH,
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View
        className={cn(
          "rounded-xl p-4",
          isDarkMode ? "bg-zinc-800" : "bg-white"
        )}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 150, height: 150 }}
          className="rounded-lg"
          resizeMode="contain"
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
        <View row gap="5" alignItems="center" justifyContent="space-between">
          <View row gap="2" alignItems="center">
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
          <View row gap="2" alignItems="center">
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
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </Link>
);
