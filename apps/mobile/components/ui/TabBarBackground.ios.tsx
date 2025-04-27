import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BlurTabBarBackground() {
  // 二重の型アサーションを使用して型エラーを解決
  const BlurViewComponent = BlurView as unknown as React.ComponentType<any>;

  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurViewComponent
        // System chrome material automatically adapts to the system's theme
        // and matches the native tab bar appearance on iOS.
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

export function useBottomTabOverflow() {
  try {
    const tabHeight = useBottomTabBarHeight();
    const { bottom } = useSafeAreaInsets();
    return tabHeight - bottom;
  } catch (error) {
    // タブナビゲーション外の場合はセーフエリアの下部の高さを返す
    const { bottom } = useSafeAreaInsets();
    return bottom;
  }
}
