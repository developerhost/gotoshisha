/**
 * アプリケーションヘッダーコンポーネント
 * アプリロゴとログアウトボタンを含むヘッダー
 */
import { XStack, Text, Button } from "tamagui";

interface AppHeaderProps {
  onLogout: () => void;
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  return (
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
        onPress={onLogout}
        pressStyle={{ opacity: 0.8 }}
      >
        <Text color="white" fontSize="$3" fontWeight="600">
          ログアウト
        </Text>
      </Button>
    </XStack>
  );
}
