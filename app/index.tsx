import { YStack, XStack, Text, Button } from "tamagui";
import { SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "./contexts/AuthContext.web";
import { useEffect } from "react";

export default function HomeScreen() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="$backgroundSoft"
      >
        <Text fontSize="$6" color="$purple11" marginBottom="$2">
          🚀
        </Text>
        <Text fontSize="$5" fontWeight="600" color="$purple11">
          GoToShisha
        </Text>
        <Text fontSize="$3" color="$gray10">
          読み込み中...
        </Text>
      </YStack>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
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
        <XStack alignItems="center" gap="$2">
          <Text fontSize="$5">🚀</Text>
          <Text fontSize="$4" color="$purple11" fontWeight="600">
            GoToShisha
          </Text>
        </XStack>
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
        <YStack alignItems="center" gap="$3">
          <Text fontSize="$8">🚀</Text>
          <Text
            fontSize="$8"
            fontWeight="bold"
            textAlign="center"
            color="$purple11"
          >
            GoToShisha
          </Text>
          <Text
            fontSize="$5"
            textAlign="center"
            color="$gray11"
            marginBottom="$2"
            lineHeight="$2"
          >
            あなたの理想のシーシャカフェを見つけよう
          </Text>
          <Text
            fontSize="$3"
            textAlign="center"
            color="$gray10"
            marginBottom="$6"
          >
            近くの素敵なシーシャスポットを発見して、最高のひと時を過ごしませんか？
          </Text>
        </YStack>

        <YStack gap="$3" width="100%" maxWidth={300}>
          <Link href="/map" asChild>
            <Button
              size="$5"
              backgroundColor="$purple10"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              borderRadius="$6"
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.3}
              shadowRadius={8}
              elevation={4}
            >
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$4">🗺️</Text>
                <Text color="white" fontSize="$5" fontWeight="600">
                  シーシャマップを見る
                </Text>
              </XStack>
            </Button>
          </Link>

          <Link href="/home" asChild>
            <Button
              size="$4"
              backgroundColor="$blue10"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              borderRadius="$6"
              variant="outlined"
            >
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$4">🏠</Text>
                <Text color="white" fontSize="$4" fontWeight="600">
                  ホームに戻る
                </Text>
              </XStack>
            </Button>
          </Link>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
}
