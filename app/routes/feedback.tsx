/**
 * ゴートゥーシーシャ - ご意見・ご要望画面コンポーネント
 * ユーザーからのフィードバックを収集する画面
 */
import React, { useState } from "react";
import {
  YStack,
  Text,
  ScrollView,
  Card,
  Button,
  XStack,
  Input,
  TextArea,
} from "tamagui";
import { useRouter } from "expo-router";

export default function FeedbackScreen() {
  const router = useRouter();
  const [feedbackType, setFeedbackType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    // TODO: 実際の送信処理を実装
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFeedbackType("");
    setTitle("");
    setContent("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <ScrollView flex={1} backgroundColor="$backgroundSoft">
        <YStack padding="$4" gap="$4">
          <YStack alignItems="center" marginBottom="$4">
            <Text
              fontSize="$8"
              fontWeight="bold"
              textAlign="center"
              color="$green11"
            >
              ✅ 送信完了
            </Text>
            <Text
              fontSize="$4"
              color="$gray10"
              textAlign="center"
              marginTop="$2"
            >
              フィードバックありがとうございます
            </Text>
          </YStack>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$green2"
            borderColor="$green6"
          >
            <YStack alignItems="center" gap="$3">
              <Text fontSize="$6">🎉</Text>
              <Text
                fontSize="$5"
                fontWeight="600"
                color="$green11"
                textAlign="center"
              >
                ご意見・ご要望を受け付けました
              </Text>
              <Text
                fontSize="$4"
                color="$gray11"
                textAlign="center"
                lineHeight="$2"
              >
                貴重なご意見をありがとうございます。
                いただいたフィードバックは、サービス改善のため大切に活用させていただきます。
              </Text>
              <Text fontSize="$3" color="$gray10" textAlign="center">
                回答が必要な内容については、後日ご連絡いたします。
              </Text>
            </YStack>
          </Card>

          <YStack gap="$3">
            <Button
              onPress={resetForm}
              backgroundColor="$green10"
              borderRadius="$6"
              size="$4"
            >
              <Text color="white" fontWeight="600">
                別のフィードバックを送信
              </Text>
            </Button>

            <Button
              onPress={() => router.back()}
              backgroundColor="$gray8"
              borderRadius="$6"
              size="$4"
            >
              <Text color="white" fontWeight="600">
                戻る
              </Text>
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    );
  }

  return (
    <ScrollView flex={1} backgroundColor="$backgroundSoft">
      <YStack padding="$4" gap="$4">
        <YStack alignItems="center" marginBottom="$4">
          <Text
            fontSize="$8"
            fontWeight="bold"
            textAlign="center"
            color="$purple11"
          >
            💭 ご意見・ご要望
          </Text>
          <Text fontSize="$4" color="$gray10" textAlign="center" marginTop="$2">
            GoToShishaをより良いサービスにするために
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
              📝 フィードバックをお聞かせください
            </Text>
            <Text fontSize="$4" color="$gray11" lineHeight="$2">
              GoToShishaをご利用いただき、ありがとうございます。
              皆様からのご意見やご要望は、サービス改善のための貴重な情報です。
              どんな小さなことでも結構ですので、お気軽にお聞かせください。
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
            📋 フィードバック種類
          </Text>

          <YStack gap="$2">
            {[
              {
                value: "improvement",
                label: "機能改善のご提案",
                icon: "⚡",
                color: "$blue",
              },
              {
                value: "new_feature",
                label: "新機能のご要望",
                icon: "✨",
                color: "$green",
              },
              {
                value: "bug_report",
                label: "不具合のご報告",
                icon: "🐛",
                color: "$red",
              },
              {
                value: "ui_ux",
                label: "UI/UXに関するご意見",
                icon: "🎨",
                color: "$orange",
              },
              {
                value: "general",
                label: "その他のご意見",
                icon: "💬",
                color: "$purple",
              },
            ].map((type) => (
              <Card
                key={type.value}
                elevate
                bordered
                padding="$3"
                pressStyle={{ scale: 0.98, backgroundColor: `${type.color}3` }}
                onPress={() => setFeedbackType(type.value)}
                backgroundColor={
                  feedbackType === type.value ? `${type.color}2` : "$gray1"
                }
                borderColor={
                  feedbackType === type.value ? `${type.color}6` : "$gray6"
                }
              >
                <XStack alignItems="center" gap="$3">
                  <Text fontSize="$5">{type.icon}</Text>
                  <Text
                    fontSize="$4"
                    fontWeight="600"
                    color={
                      feedbackType === type.value
                        ? `${type.color}11`
                        : "$gray11"
                    }
                  >
                    {type.label}
                  </Text>
                </XStack>
              </Card>
            ))}
          </YStack>
        </YStack>

        {feedbackType && (
          <YStack gap="$3">
            <Text fontSize="$5" fontWeight="600" color="$gray12">
              📝 詳細内容
            </Text>

            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11">
                タイトル
              </Text>
              <Input
                placeholder="簡潔なタイトルを入力してください"
                value={title}
                onChangeText={setTitle}
                backgroundColor="$gray1"
                borderColor="$gray6"
                borderRadius="$4"
                padding="$3"
              />
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11">
                詳細内容
              </Text>
              <TextArea
                placeholder={
                  feedbackType === "bug_report"
                    ? "どのような状況で問題が発生したか、具体的にお聞かせください。\n\n例：\n- 発生した操作手順\n- 期待していた動作\n- 実際に起こった現象"
                    : feedbackType === "improvement"
                    ? "現在の機能についてのご意見や改善提案をお聞かせください。\n\n例：\n- 使いにくいと感じる点\n- こうなったら良いなと思う点"
                    : feedbackType === "new_feature"
                    ? "どのような新機能があると便利か、詳しくお聞かせください。\n\n例：\n- 欲しい機能の概要\n- その機能があることで解決したい課題"
                    : "ご意見・ご要望を自由にお書きください。"
                }
                value={content}
                onChangeText={setContent}
                backgroundColor="$gray1"
                borderColor="$gray6"
                borderRadius="$4"
                padding="$3"
                minHeight={120}
                textAlignVertical="top"
              />
            </YStack>
          </YStack>
        )}

        {feedbackType && (
          <Card elevate bordered padding="$4" backgroundColor="$yellow1">
            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$yellow11">
                💡 フィードバックのコツ
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                ・具体的な状況や操作手順を教えてください
                ・スクリーンショットがあるとより詳しく把握できます
                ・ご要望の背景や理由も一緒にお聞かせください
              </Text>
            </YStack>
          </Card>
        )}

        <YStack gap="$3" marginTop="$4">
          <Button
            onPress={handleSubmit}
            backgroundColor="$purple10"
            borderRadius="$6"
            size="$4"
            disabled={!feedbackType || !title.trim() || !content.trim()}
            opacity={
              !feedbackType || !title.trim() || !content.trim() ? 0.5 : 1
            }
          >
            <Text color="white" fontWeight="600">
              フィードバックを送信
            </Text>
          </Button>

          <Button
            onPress={() => router.back()}
            backgroundColor="$gray8"
            borderRadius="$6"
            size="$4"
          >
            <Text color="white" fontWeight="600">
              戻る
            </Text>
          </Button>
        </YStack>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$gray1"
          marginBottom="$8"
        >
          <YStack gap="$3">
            <Text fontSize="$5" fontWeight="600" color="$gray12">
              📞 その他のお問い合わせ方法
            </Text>
            <YStack gap="$2">
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">緊急の問題:</Text>
                {"\n"}アプリが使用できない等の緊急性の高い問題については、
                こちらのフォームよりご連絡ください。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">営業・提携に関するお問い合わせ:</Text>
                {"\n"}ビジネス関連のお問い合わせは、別途ご連絡ください。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">個人情報に関するお問い合わせ:</Text>
                {"\n"}プライバシーポリシーに記載の方法でお問い合わせください。
              </Text>
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
}
