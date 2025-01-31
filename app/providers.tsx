import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/src/hooks/useColorScheme";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/src/store";

type ProvidersTypes = {
  children: React.ReactNode;
};

export const Providers = (props: ProvidersTypes) => {
  const { children } = props;

  const colorScheme = useColorScheme();

  return (
    <ReduxProvider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
};
