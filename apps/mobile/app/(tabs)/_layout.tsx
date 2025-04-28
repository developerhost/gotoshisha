import React from "react";
import { View } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return <View style={{ flex: 1 }}>test</View>;
}
