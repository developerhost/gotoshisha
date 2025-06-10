import React from "react";
import { YStack, Text, Button } from "tamagui";
import { SafeAreaView } from "react-native";
import { useAuth } from "../contexts/AuthContext.web";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login();
      router.replace("/");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Login failed:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$4"
        gap="$4"
        backgroundColor="$background"
      >
        <Text fontSize="$9" fontWeight="bold">
          ようこそ
        </Text>
        <Text fontSize="$5" color="$gray10" marginBottom="$6">
          続行するにはログインしてください
        </Text>

        <Button
          size="$4"
          backgroundColor="$blue10"
          pressStyle={{ opacity: 0.8 }}
          disabled={isLoading}
          opacity={isLoading ? 0.6 : 1}
          onPress={handleLogin}
          minWidth={200}
        >
          <Text color="white" fontSize="$4" fontWeight="600">
            {isLoading ? "ログイン中..." : "Auth0でログイン"}
          </Text>
        </Button>

        {error && (
          <Text color="$red10" marginTop="$4" textAlign="center">
            エラー: {error.message}
          </Text>
        )}
      </YStack>
    </SafeAreaView>
  );
}
