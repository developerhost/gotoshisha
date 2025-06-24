/**
 * ゴートゥーシーシャ - アバウト画面コンポーネント
 * サービスの概要や特徴、使い方を説明する画面
 */
import React from "react";
import { YStack, Text, ScrollView, Card, Button, XStack } from "tamagui";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView flex={1} backgroundColor="$backgroundSoft">
      <YStack padding="$4" gap="$4">
        <YStack alignItems="center" marginBottom="$4">
          <Text
            fontSize="$9"
            fontWeight="bold"
            textAlign="center"
            color="$purple11"
          >
            🚀 GoToShisha
          </Text>
          <Text fontSize="$5" color="$gray10" textAlign="center" marginTop="$2">
            シーシャカフェ探索アプリ
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
              🌟 GoToShishaとは
            </Text>
            <Text fontSize="$4" color="$gray11" lineHeight="$2">
              GoToShishaは、シーシャカフェを見つけ、共有し、体験を記録するためのソーシャルアプリです。
              あなたの理想のシーシャカフェを見つけて、最高のひと時を過ごしましょう。
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
            ✨ 主な機能
          </Text>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$blue1"
            borderColor="$blue6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">🗺️</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$blue11">
                  シーシャマップ
                </Text>
                <Text
                  fontSize="$3"
                  color="$gray11"
                  marginTop="$1"
                  lineHeight="$2"
                >
                  位置情報を使って近くのシーシャカフェを地図上で簡単に見つけることができます。
                  営業時間や評価も一目で確認できます。
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$green1"
            borderColor="$green6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">📍</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$green11">
                  お気に入り機能
                </Text>
                <Text
                  fontSize="$3"
                  color="$gray11"
                  marginTop="$1"
                  lineHeight="$2"
                >
                  気に入ったシーシャカフェをお気に入りに登録して、いつでも簡単にアクセスできます。
                  あなただけのシーシャスポットリストを作成しましょう。
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$orange1"
            borderColor="$orange6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">💬</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$orange11">
                  レビュー・投稿
                </Text>
                <Text
                  fontSize="$3"
                  color="$gray11"
                  marginTop="$1"
                  lineHeight="$2"
                >
                  シーシャカフェでの体験を投稿し、他のユーザーと共有できます。
                  写真や評価、おすすめフレーバーなども投稿可能です。
                </Text>
              </YStack>
            </XStack>
          </Card>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$red1"
            borderColor="$red6"
          >
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6">👥</Text>
              <YStack flex={1}>
                <Text fontSize="$5" fontWeight="600" color="$red11">
                  コミュニティ
                </Text>
                <Text
                  fontSize="$3"
                  color="$gray11"
                  marginTop="$1"
                  lineHeight="$2"
                >
                  シーシャ愛好家のコミュニティに参加して、情報交換や新しいカフェの発見を楽しめます。
                  いいねやコメント機能で交流を深めましょう。
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>

        <Card elevate bordered padding="$4" backgroundColor="$gray1">
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$gray12">
              🎯 使い方
            </Text>
            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">1. アカウント作成</Text>
                {"\n"}Auth0を使用した安全な認証でアカウントを作成します。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">2. 位置情報の許可</Text>
                {"\n"}
                近くのシーシャカフェを見つけるために位置情報の使用を許可してください。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">3. カフェを探索</Text>
                {"\n"}
                地図からお気に入りのシーシャカフェを見つけて訪問しましょう。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">4. 体験を共有</Text>
                {"\n"}
                訪問したカフェの写真やレビューを投稿して、コミュニティと共有しましょう。
              </Text>
            </YStack>
          </YStack>
        </Card>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$teal1"
          borderColor="$teal6"
        >
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$teal11">
              🎨 デザインコンセプト
            </Text>
            <Text fontSize="$4" color="$gray11" lineHeight="$2">
              GoToShishaは、シーシャの煙のようにリラックスした雰囲気と、
              カフェ探索の楽しさを表現したデザインを採用しています。
              直感的な操作性と美しいビジュアルで、ユーザーにとって使いやすいアプリを目指しています。
            </Text>
          </YStack>
        </Card>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$purple1"
          borderColor="$purple6"
        >
          <YStack alignItems="center" gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$purple11">
              📱 今すぐ始めよう！
            </Text>
            <Text
              fontSize="$4"
              color="$gray11"
              textAlign="center"
              lineHeight="$2"
            >
              GoToShishaで最高のシーシャ体験を見つけて、
              素晴らしいひと時を過ごしましょう。
            </Text>
            <Text fontSize="$3" color="$gray10" textAlign="center">
              バージョン 1.0.0
            </Text>
          </YStack>
        </Card>

        <Button
          onPress={() => router.back()}
          backgroundColor="$purple10"
          borderRadius="$6"
          size="$4"
          marginTop="$4"
          marginBottom="$8"
        >
          <Text color="white" fontWeight="600">
            戻る
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
}
