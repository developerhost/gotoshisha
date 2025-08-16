/**
 * タブバーコンポーネント
 * ホーム、マップ、通知、プロフィールページ間のナビゲーションを提供する
 * 現在のルートに基づいてアクティブタブをハイライト表示する
 */
import { XStack, YStack, Text } from "tamagui";
import { useRouter, usePathname } from "expo-router";
import { Pressable } from "react-native";

interface TabBarProps {
  user?: {
    name?: string;
    email?: string;
  } | null;
}

/**
 * タブボタンのプロパティ
 */
interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

/**
 * 個別のタブボタンコンポーネント
 */
function TabButton({ icon, label, isActive, onPress }: TabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
      }}
    >
      <YStack alignItems="center" gap="$1">
        <Text
          fontSize="$6"
          color={isActive ? "$blue10" : "$gray8"}
          fontWeight={isActive ? "bold" : "normal"}
        >
          {icon}
        </Text>
        <Text
          fontSize="$1"
          color={isActive ? "$blue10" : "$gray8"}
          fontWeight={isActive ? "600" : "400"}
          textAlign="center"
        >
          {label}
        </Text>
      </YStack>
    </Pressable>
  );
}

/**
 * タブバーコンポーネント
 *
 * アプリの下部に固定表示されるナビゲーションバー。
 * ホーム、マップ、通知、プロフィールの4つのタブを提供する。
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
    <XStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="white"
      borderTopWidth={1}
      borderTopColor="$gray4"
      paddingTop="$2"
      paddingBottom="$4"
      paddingHorizontal="$3"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      elevation={10}
    >
      <TabButton
        icon="🏠"
        label="ホーム"
        isActive={isActive("/routes/home")}
        onPress={() => router.push("/routes/home")}
      />

      <TabButton
        icon="🗺️"
        label="マップ"
        isActive={isActive("/routes/map")}
        onPress={() => router.push("/routes/map")}
      />

      <TabButton
        icon="🔔"
        label="通知"
        isActive={isActive("/routes/notifications")}
        onPress={() => router.push("/routes/notifications")}
      />

      <TabButton
        icon="👤"
        label="プロフィール"
        isActive={isActive("/routes/profile")}
        onPress={() => router.push("/routes/profile")}
      />
    </XStack>
  );
}
