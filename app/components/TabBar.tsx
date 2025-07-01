/**
 * タブバーコンポーネント
 * ホーム、マップ、プロフィールページ間のナビゲーションを提供する
 * 現在のルートに基づいてアクティブタブをハイライト表示する
 */
import { XStack, YStack, Button, Text } from "tamagui";
import { useRouter, usePathname } from "expo-router";

interface TabBarProps {
  user?: {
    name?: string;
    email?: string;
  } | null;
}

/**
 * タブバーコンポーネント
 *
 * アプリの下部に固定表示されるナビゲーションバー。
 * ホーム、マップ、プロフィールの3つのタブを提供する。
 *
 * @param props - タブバーのプロパティ
 * @param props.user - ユーザー情報（将来の拡張用、現在未使用）
 * @returns タブバーのJSXエレメント
 *
 * @example
 * ```tsx
 * <TabBar user={user} />
 * ```
 */
export function TabBar({ user: _ }: TabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 指定されたルートが現在アクティブかどうかを判定
   *
   * @param route - チェックするルートパス
   * @returns 現在のパスと一致する場合はtrue
   */
  const isActive = (route: string) => pathname === route;

  return (
    <YStack
      position="absolute"
      bottom={30}
      left={20}
      right={20}
      alignItems="center"
    >
      {/* 横長の楕円背景 */}
      <XStack
        backgroundColor="$background"
        paddingHorizontal="$3"
        paddingVertical="$3"
        borderRadius={50}
        borderWidth={1}
        borderColor="$borderColor"
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.15}
        shadowRadius={12}
        elevation={8}
        alignItems="center"
        justifyContent="space-around"
        width="100%"
        maxWidth={320}
      >
        {/* ホームボタン */}
        <Button
          size="$5"
          backgroundColor={isActive("/routes/home") ? "$blue8" : "transparent"}
          borderRadius="$6"
          paddingHorizontal="$3"
          paddingVertical="$3"
          width={60}
          height={60}
          alignItems="center"
          justifyContent="center"
          pressStyle={{
            backgroundColor: "$blue6",
            scale: 0.95,
          }}
          onPress={() => router.push("/routes/home")}
        >
          <Text fontSize="$8" lineHeight="$8" textAlign="center">
            {isActive("/routes/home") ? "🏠" : "🏡"}
          </Text>
        </Button>

        {/* マップボタン（中央、丸い円で目立たせる） */}
        <Button
          size="$6"
          backgroundColor={isActive("/routes/map") ? "$blue10" : "$blue9"}
          borderRadius={50}
          width={80}
          height={80}
          alignItems="center"
          justifyContent="center"
          pressStyle={{
            backgroundColor: "$blue10",
            scale: 0.9,
          }}
          shadowColor="$blue8"
          shadowOffset={{ width: 0, height: 3 }}
          shadowOpacity={0.5}
          shadowRadius={8}
          elevation={8}
          onPress={() => router.push("/routes/map")}
          marginTop={-2} // 少し上に浮かせる
        >
          <Text
            fontSize="$10"
            color="white"
            lineHeight="$10"
            textAlign="center"
          >
            🗺️
          </Text>
        </Button>

        {/* ユーザーボタン */}
        <Button
          size="$5"
          backgroundColor={
            isActive("/routes/profile") ? "$blue8" : "transparent"
          }
          borderRadius="$6"
          paddingHorizontal="$3"
          paddingVertical="$3"
          width={60}
          height={60}
          alignItems="center"
          justifyContent="center"
          pressStyle={{
            backgroundColor: "$blue6",
            scale: 0.95,
          }}
          onPress={() => router.push("/routes/profile")}
        >
          <Text fontSize="$8" lineHeight="$8" textAlign="center">
            👤
          </Text>
        </Button>
      </XStack>
    </YStack>
  );
}
