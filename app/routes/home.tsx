/**
 * ホーム画面コンポーネント
 * Tamagui コンポーネントを使用したメイン画面
 */
import React from "react";
import { YStack, Text, Button, ScrollView, Card, XStack } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext.web";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text fontSize="$5">ログインしてください</Text>
        <Button
          marginTop="$4"
          onPress={() => router.push("/routes/login")}
          backgroundColor="$blue10"
        >
          <Text color="white">ログイン</Text>
        </Button>
      </YStack>
    );
  }

  return (
    <ScrollView flex={1} backgroundColor="$backgroundSoft">
      <YStack padding="$4" gap="$4">
        <Text fontSize="$8" fontWeight="bold" textAlign="center">
          ホーム
        </Text>

        <Card elevate bordered padding="$4">
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600">
              ようこそ、{user?.name || user?.email || "ゲスト"}さん
            </Text>
            <Text fontSize="$4" color="$gray10">
              Gotoshishaへようこそ。位置情報を共有しましょう。
            </Text>
          </YStack>
        </Card>

        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="600" marginBottom="$2">
            クイックアクション
          </Text>

          <Card
            elevate
            bordered
            padding="$4"
            pressStyle={{ scale: 0.98 }}
            onPress={() => router.push("/routes/map")}
          >
            <XStack alignItems="center" gap="$3">
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600">
                  マップを見る
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  現在の位置情報を確認
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card elevate bordered padding="$4" pressStyle={{ scale: 0.98 }}>
            <XStack alignItems="center" gap="$3">
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600">
                  投稿する
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  現在地を投稿
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card elevate bordered padding="$4" pressStyle={{ scale: 0.98 }}>
            <XStack alignItems="center" gap="$3">
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600">
                  フレンド
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  友達のリストを表示
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>

        <YStack gap="$3" marginTop="$4">
          <Text fontSize="$5" fontWeight="600" marginBottom="$2">
            最近のアクティビティ
          </Text>

          <Card elevate bordered padding="$3">
            <Text fontSize="$3" color="$gray10" textAlign="center">
              まだアクティビティがありません
            </Text>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
