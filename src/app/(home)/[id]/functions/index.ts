import MenuApi from "@/src/api/routes/menu";
import { TGETMenu } from "@/src/api/types";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export const useRecipeDetail = () => {
  const searchParams = useLocalSearchParams();
  const { id } = searchParams;
  const [recipe, setRecipe] = useState<TGETMenu["recipes"][number]>();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "success"
  );

  const fetchRecipe = async (id: number) => {
    try {
      setStatus("loading");
      const data = await MenuApi.getMenuById(id);
      setRecipe(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipe(Number(id));
    }
  }, [id]);

  return {
    recipe,
    status,
  };
};
