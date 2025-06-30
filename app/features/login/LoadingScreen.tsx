/**
 * ローディング画面コンポーネント
 * アプリケーションの読み込み中に表示される画面
 */
import { YStack, Text } from "tamagui";

export function LoadingScreen() {
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
