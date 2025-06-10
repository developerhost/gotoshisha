import { YStack, XStack, Text, Button } from "tamagui";
import { SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "./contexts/AuthContext.web";
import { useEffect } from "react";

export default function HomeScreen() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/routes/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>読み込み中...</Text>
      </YStack>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/routes/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$3"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text fontSize="$4" color="$color">
          ようこそ、{user?.name || user?.email || "ユーザー"}さん
        </Text>
        <Button
          size="$3"
          backgroundColor="$red10"
          onPress={handleLogout}
          pressStyle={{ opacity: 0.8 }}
        >
          <Text color="white" fontSize="$3" fontWeight="600">
            ログアウト
          </Text>
        </Button>
      </XStack>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$backgroundSoft"
        padding="$4"
        gap="$4"
      >
        <Text fontSize="$7" fontWeight="bold" textAlign="center" color="$color">
          React Native Maps Demo
        </Text>
        <Text
          fontSize="$4"
          textAlign="center"
          color="$gray10"
          marginBottom="$6"
        >
          Expo Router を使用したマップアプリ
        </Text>

        <Link href="/routes/map" asChild>
          <Button
            size="$4"
            backgroundColor="$blue10"
            pressStyle={{ opacity: 0.8 }}
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={2}
          >
            <Text color="white" fontSize="$5" fontWeight="600">
              マップを表示
            </Text>
          </Button>
        </Link>
      </YStack>
    </SafeAreaView>
  );
}
