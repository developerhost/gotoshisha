// This is a shim for web and Android where the tab bar is generally opaque.
import * as React from "react";
import { View } from "react-native";

// 空のコンポーネントを返す関数をエクスポート
export default function TabBarBackground() {
  return <View style={{ flex: 1 }} />;
}

export function useBottomTabOverflow() {
  return 0;
}
