// reference: https://github.com/expo/router/issues/41#issuecomment-2569739770
//index.js
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./src/app"); //Path with src folder
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);