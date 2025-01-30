import MenuApi from "@/src/api/routes/menu";
import { RootState } from "@/src/store";
import { setStatus, Status, setMenuData } from "@/src/store/slices/menuSlice";
import { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const useHome = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const { data: menuData, status } = useSelector(
    (state: RootState) => state.menu
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const filteredRecipes =
    (menuData &&
      menuData.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      )) ??
    [];

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
      fetchMenu();
    }
  }, []);

  return {
    menuData,
    status,
    colorScheme,
    searchQuery,
    setSearchQuery,
    handleSearchQuery,
    filteredRecipes,
  };
};
