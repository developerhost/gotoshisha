import { Stack } from "expo-router";
import { AuthProvider } from "./contexts/AuthContext.web";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="routes/map"
          options={{
            title: "マップ",
            headerBackTitle: "戻る",
          }}
        />
        <Stack.Screen
          name="routes/login"
          options={{
            title: "ログイン",
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
