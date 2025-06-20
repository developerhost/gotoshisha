import React from "react";
import { YStack, Text, Button } from "tamagui";
import { SafeAreaView } from "react-native";
import { useAuth } from "./contexts/AuthContext.web";
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
        backgroundColor="$backgroundSoft"
      >
        <YStack alignItems="center" gap="$3" marginBottom="$6">
          <Text fontSize="$9">🚀</Text>
          <Text fontSize="$9" fontWeight="bold" color="$purple11" textAlign="center">
            GoToShisha
          </Text>
          <Text fontSize="$5" color="$gray11" textAlign="center" lineHeight="$1">
            シーシャカフェを見つけよう
          </Text>
          <Text fontSize="$4" color="$gray10" textAlign="center" marginTop="$2">
            ログインして、あなたの理想のシーシャスポットを発見しましょう
          </Text>
        </YStack>

        <Button
          size="$5"
          backgroundColor="$purple10"
          pressStyle={{ opacity: 0.8, scale: 0.98 }}
          disabled={isLoading}
          opacity={isLoading ? 0.6 : 1}
          onPress={handleLogin}
          minWidth={280}
          borderRadius="$6"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          elevation={4}
        >
          <Text color="white" fontSize="$5" fontWeight="600">
            {isLoading ? "🔄 ログイン中..." : "✨ ログインして始める"}
          </Text>
        </Button>

        <YStack alignItems="center" gap="$2" marginTop="$4">
          <Text fontSize="$3" color="$gray9" textAlign="center">
            Auth0による安全なログイン
          </Text>
          <Text fontSize="$2" color="$gray8" textAlign="center">
            あなたのプライバシーを保護します
          </Text>
        </YStack>

        {error && (
          <YStack alignItems="center" marginTop="$4" backgroundColor="$red2" padding="$3" borderRadius="$4" borderColor="$red6" borderWidth={1}>
            <Text color="$red11" textAlign="center" fontSize="$3" fontWeight="600">
              ⚠️ ログインエラー
            </Text>
            <Text color="$red10" marginTop="$1" textAlign="center" fontSize="$2">
              {error.message}
            </Text>
          </YStack>
        )}
      </YStack>
    </SafeAreaView>
  );
}