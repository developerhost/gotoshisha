/**
 * ゴートゥーシーシャ - ホーム画面コンポーネント
 * シーシャカフェを見つけるためのメイン画面
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
        <Text
          fontSize="$6"
          fontWeight="bold"
          textAlign="center"
          marginBottom="$2"
        >
          🚀 GoToShisha
        </Text>
        <Text
          fontSize="$4"
          color="$gray10"
          textAlign="center"
          marginBottom="$4"
        >
          シーシャカフェを見つけよう
        </Text>
        <Button
          marginTop="$4"
          onPress={() => router.push("/routes/login")}
          backgroundColor="$purple10"
          borderRadius="$6"
          size="$4"
        >
          <Text color="white" fontWeight="600">
            ログインして始める
          </Text>
        </Button>
      </YStack>
    );
  }

  return (
    <ScrollView flex={1} backgroundColor="$backgroundSoft">
      <YStack padding="$4" gap="$4">
        <YStack alignItems="center" marginBottom="$2">
          <Text
            fontSize="$9"
            fontWeight="bold"
            textAlign="center"
            color="$purple11"
          >
            🚀 GoToShisha
          </Text>
          <Text fontSize="$4" color="$gray10" textAlign="center">
            あなたの理想のシーシャカフェを見つけよう
          </Text>
        </YStack>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$purple2"
          borderColor="$purple6"
        >
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$purple11">
              こんにちは、{user?.name || user?.email || "シーシャラバー"}さん ✨
            </Text>
            <Text fontSize="$4" color="$gray11">
              今日はどちらのシーシャカフェに行きますか？
              お気に入りの場所を見つけて、最高のひと時を過ごしましょう。
            </Text>
          </YStack>
        </Card>

        <YStack gap="$3">
          <Text
            fontSize="$6"
            fontWeight="600"
            marginBottom="$2"
            color="$gray12"
          >
            🎯 今すぐ探す
          </Text>

          <Card
            elevate
            bordered
            padding="$4"
            pressStyle={{ scale: 0.97, backgroundColor: "$purple3" }}
            onPress={() => router.push("/routes/map")}
            backgroundColor="$purple1"
            borderColor="$purple6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">🗺️</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$purple11">
                  シーシャマップ
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  近くのシーシャカフェを地図で探す
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card
            elevate
            bordered
            padding="$4"
            pressStyle={{ scale: 0.97, backgroundColor: "$blue3" }}
            backgroundColor="$blue1"
            borderColor="$blue6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">📍</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$blue11">
                  お気に入り登録
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  行ったカフェをお気に入りに追加
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card
            elevate
            bordered
            padding="$4"
            pressStyle={{ scale: 0.97, backgroundColor: "$green3" }}
            backgroundColor="$green1"
            borderColor="$green6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">💬</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$green11">
                  レビュー投稿
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  体験を他の人とシェアしよう
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>

        <YStack gap="$3" marginTop="$4">
          <Text
            fontSize="$5"
            fontWeight="600"
            marginBottom="$2"
            color="$gray12"
          >
            🔥 最近の活動
          </Text>

          <Card elevate bordered padding="$4" backgroundColor="$gray2">
            <YStack alignItems="center" gap="$2">
              <Text fontSize="$5">🌟</Text>
              <Text fontSize="$3" color="$gray10" textAlign="center">
                まだ活動がありません
              </Text>
              <Text fontSize="$2" color="$gray9" textAlign="center">
                シーシャカフェを探して、あなたの冒険を始めましょう！
              </Text>
            </YStack>
          </Card>
        </YStack>

        <YStack gap="$3" marginTop="$4">
          <Text
            fontSize="$5"
            fontWeight="600"
            marginBottom="$2"
            color="$gray12"
          >
            ℹ️ サービス情報
          </Text>

          <Card
            elevate
            bordered
            padding="$4"
            pressStyle={{ scale: 0.97, backgroundColor: "$gray3" }}
            onPress={() => router.push("/routes/terms")}
            backgroundColor="$gray1"
            borderColor="$gray6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">📋</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$gray11">
                  利用規約
                </Text>
                <Text fontSize="$3" color="$gray10" marginTop="$1">
                  サービス利用規約をご確認ください
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
