// This is a shim for web and Android where the tab bar is generally opaque.
import * as React from "react";
import { View } from "react-native";

// 空のコンポーネントを返すコンポーネントをエクスポート
const TabBarBackground = () => {
  return <View style={{ flex: 1 }} />;
};

export default TabBarBackground;

export function useBottomTabOverflow() {
  return 0;
}
