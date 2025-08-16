/**
 * 通知画面コンポーネント
 * ユーザーの通知一覧を表示する
 */
import { YStack, XStack, Text, ScrollView } from "tamagui";

/**
 * 通知アイテムの型定義
 */
interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "like" | "comment" | "follow" | "system";
}

/**
 * 通知アイテムコンポーネント
 */
function NotificationItem({
  notification,
}: {
  notification: NotificationItem;
}) {
  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "like":
        return "❤️";
      case "comment":
        return "💬";
      case "follow":
        return "👥";
      case "system":
        return "🔔";
      default:
        return "📢";
    }
  };

  return (
    <XStack
      padding="$3"
      backgroundColor={notification.isRead ? "white" : "$blue1"}
      borderBottomWidth={1}
      borderBottomColor="$gray3"
      alignItems="flex-start"
      gap="$3"
    >
      <Text fontSize="$5">{getIcon(notification.type)}</Text>
      <YStack flex={1} gap="$1">
        <Text
          fontSize="$3"
          fontWeight={notification.isRead ? "400" : "600"}
          color="$gray12"
        >
          {notification.title}
        </Text>
        <Text fontSize="$2" color="$gray10" numberOfLines={2}>
          {notification.message}
        </Text>
        <Text fontSize="$1" color="$gray8">
          {notification.timestamp}
        </Text>
      </YStack>
      {!notification.isRead && (
        <YStack
          width={8}
          height={8}
          borderRadius="$10"
          backgroundColor="$blue9"
        />
      )}
    </XStack>
  );
}

/**
 * 通知画面メインコンポーネント
 *
 * ユーザーの通知一覧を表示する。
 * 未読通知は背景色を変えて表示し、通知タイプごとに異なるアイコンを表示する。
 *
 * @returns 通知画面のJSXエレメント
 */
export default function NotificationsScreen() {
  // TODO: APIから通知データを取得するロジックを追加する
  // モックデータ（実際の実装では API から取得）
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "いいねされました",
      message: "田中太郎さんがあなたの投稿にいいねしました",
      timestamp: "2分前",
      isRead: false,
      type: "like",
    },
    {
      id: "2",
      title: "新しいコメント",
      message: "佐藤花子さんがあなたの投稿にコメントしました",
      timestamp: "1時間前",
      isRead: false,
      type: "comment",
    },
    {
      id: "3",
      title: "フォローされました",
      message: "山田次郎さんがあなたをフォローしました",
      timestamp: "3時間前",
      isRead: true,
      type: "follow",
    },
    {
      id: "4",
      title: "システム通知",
      message: "アプリのアップデートが利用可能です",
      timestamp: "1日前",
      isRead: true,
      type: "system",
    },
  ];

  return (
    <YStack flex={1} backgroundColor="$background">
      <XStack
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$3"
        backgroundColor="$background"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
      >
        <Text fontSize="$6" fontWeight="600" color="$gray12">
          通知
        </Text>
      </XStack>

      <ScrollView flex={1}>
        {notifications.length === 0 ? (
          <YStack
            flex={1}
            alignItems="center"
            justifyContent="center"
            padding="$6"
            gap="$3"
          >
            <Text fontSize="$8">📬</Text>
            <Text fontSize="$4" color="$gray10" textAlign="center">
              通知はありません
            </Text>
            <Text fontSize="$2" color="$gray8" textAlign="center">
              新しい通知が届くとここに表示されます
            </Text>
          </YStack>
        ) : (
          <YStack>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
}
