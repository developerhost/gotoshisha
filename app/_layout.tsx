import { Stack } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import { auth0Config } from "./config/auth0";
import { AuthProvider } from "./contexts/AuthContext";

export default function RootLayout() {
  return (
    <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId}>
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
    </Auth0Provider>
  );
}
