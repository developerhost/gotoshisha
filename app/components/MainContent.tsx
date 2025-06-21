/**
 * メインコンテンツコンポーネント
 * アプリケーションのメインコンテンツ部分を表示
 */
import { YStack, XStack, Text, Button } from "tamagui";
import { Link } from "expo-router";

export function MainContent() {
  return (
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
        <Link href="/routes/map" asChild>
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

        <Link href="/routes/home" asChild>
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
  );
}
