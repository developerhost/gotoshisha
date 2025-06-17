import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext.web";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";
import { QueryProvider } from "./providers/QueryProvider";

export default function RootLayout() {
  return (
    <QueryProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="map"
              options={{
                title: "マップ",
                headerBackTitle: "戻る",
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                title: "ログイン",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              options={{
                title: "ホーム",
                headerBackTitle: "戻る",
              }}
            />
          </Stack>
        </AuthProvider>
      </TamaguiProvider>
    </QueryProvider>
  );
}
