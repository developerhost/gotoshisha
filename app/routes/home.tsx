/**
 * ゴートゥーシーシャ - ホーム画面コンポーネント
 * シーシャカフェを見つけるためのメイン画面
 */
import React from "react";
import { YStack, Text, Button, ScrollView, Card, XStack } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { TabBar } from "../components/TabBar";

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <YStack flex={1} backgroundColor="$backgroundSoft">
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
        >
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

        {/* タブバー */}
        <TabBar user={user} />
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      <ScrollView flex={1}>
        <YStack padding="$4" gap="$4" paddingBottom="$20">
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
              onPress={() => router.push("/routes/search")}
              backgroundColor="$purple1"
              borderColor="$purple6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">🔍</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$purple11">
                    シーシャを探す
                  </Text>
                  <Text fontSize="$3" color="$gray10" marginTop="$1">
                    お気に入りのシーシャを見つける
                  </Text>
                </YStack>
              </XStack>
            </Card>

            <Card
              elevate
              bordered
              padding="$4"
              pressStyle={{ scale: 0.97, backgroundColor: "$blue3" }}
              onPress={() => router.push("/routes/map")}
              backgroundColor="$blue1"
              borderColor="$blue6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">🗺️</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$blue11">
                    地図からシーシャを探す
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
              pressStyle={{ scale: 0.97, backgroundColor: "$green3" }}
              onPress={() => router.push("/routes/categories")}
              backgroundColor="$green1"
              borderColor="$green6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">📋</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$green11">
                    タイプから探す
                  </Text>
                  <Text fontSize="$3" color="$gray10" marginTop="$1">
                    カテゴリー別にシーシャを探す
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
              ℹ️ サービス情報
            </Text>

            <Card
              elevate
              bordered
              padding="$4"
              pressStyle={{ scale: 0.97, backgroundColor: "$purple3" }}
              onPress={() => router.push("/routes/about")}
              backgroundColor="$purple1"
              borderColor="$purple6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">ℹ️</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$purple11">
                    アプリについて
                  </Text>
                  <Text fontSize="$3" color="$gray10" marginTop="$1">
                    GoToShishaの機能と使い方
                  </Text>
                </YStack>
              </XStack>
            </Card>

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

            <Card
              elevate
              bordered
              padding="$4"
              pressStyle={{ scale: 0.97, backgroundColor: "$gray3" }}
              onPress={() => router.push("/routes/privacy")}
              backgroundColor="$gray1"
              borderColor="$gray6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">🔒</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$gray11">
                    プライバシーポリシー
                  </Text>
                  <Text fontSize="$3" color="$gray10" marginTop="$1">
                    個人情報の取扱いについて
                  </Text>
                </YStack>
              </XStack>
            </Card>

            <Card
              elevate
              bordered
              padding="$4"
              pressStyle={{ scale: 0.97, backgroundColor: "$orange3" }}
              onPress={() => router.push("/routes/feedback")}
              backgroundColor="$orange1"
              borderColor="$orange6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">💭</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$orange11">
                    ご意見・ご要望
                  </Text>
                  <Text fontSize="$3" color="$gray10" marginTop="$1">
                    フィードバックをお聞かせください
                  </Text>
                </YStack>
              </XStack>
            </Card>

            <Card
              elevate
              bordered
              padding="$4"
              pressStyle={{ scale: 0.97, backgroundColor: "$teal3" }}
              onPress={() => router.push("/routes/company")}
              backgroundColor="$teal1"
              borderColor="$teal6"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$6">🏢</Text>
                <YStack flex={1}>
                  <Text fontSize="$5" fontWeight="600" color="$teal11">
                    運営会社
                  </Text>
                  <Text fontSize="$3" color="$gray10" marginTop="$1">
                    会社情報・企業理念
                  </Text>
                </YStack>
              </XStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>

      {/* タブバー */}
      <TabBar user={user} />
    </YStack>
  );
}
