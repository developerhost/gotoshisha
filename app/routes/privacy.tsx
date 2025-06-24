/**
 * ゴートゥーシーシャ - プライバシーポリシー画面コンポーネント
 * サービスのプライバシーポリシーを表示する画面
 */
import React from "react";
import { YStack, Text, ScrollView, Card, Button } from "tamagui";
import { useRouter } from "expo-router";

export default function PrivacyScreen() {
  const router = useRouter();

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
            🔒 プライバシーポリシー
          </Text>
          <Text fontSize="$4" color="$gray10" textAlign="center" marginTop="$2">
            GoToShisha プライバシーポリシー
          </Text>
        </YStack>

        <Card elevate bordered padding="$4" backgroundColor="$gray1">
          <YStack gap="$4">
            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                1. 個人情報の収集について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                GoToShisha（以下「当サービス」といいます。）では、以下の個人情報を収集させていただく場合があります。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・氏名、メールアドレス ・プロフィール情報（アバター画像等）
                ・位置情報（ユーザーが許可した場合のみ）
                ・利用履歴、投稿内容、コメント
                ・端末情報、IPアドレス、クッキー情報
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                2. 個人情報の利用目的
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                収集した個人情報は、以下の目的で利用いたします。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・当サービスの提供、維持、改善 ・ユーザー認証、アカウント管理
                ・カスタマーサポートの提供 ・利用規約違反や不正利用の防止
                ・統計データの作成（個人を特定できない形で加工）
                ・重要なお知らせの送信 ・新機能やキャンペーンのご案内
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                3. 個人情報の第三者提供について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、以下の場合を除き、収集した個人情報を第三者に提供することはありません。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・ユーザーの同意がある場合 ・法令に基づく場合
                ・人の生命、身体または財産の保護のために必要がある場合
                ・公衆衛生の向上または児童の健全な育成の推進のため特に必要がある場合
                ・国の機関等が法令の定める事務を遂行することに対して協力する必要がある場合
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                4. 個人情報の管理について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、個人情報の漏洩、滅失又は毀損の防止その他個人情報の安全管理のために必要かつ適切な措置を講じます。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・データの暗号化 ・アクセス制御の実施 ・定期的なセキュリティ監査
                ・従業員への教育・研修
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                5. Cookie（クッキー）について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスでは、利便性の向上のためにCookieを使用する場合があります。Cookieは、ウェブサイトがお客様のコンピュータのハードディスク上に置かれる小さなテキストファイルです。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                Cookieを無効にする場合は、ブラウザの設定を変更することで可能ですが、一部の機能が正常に動作しない場合があります。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                6. 位置情報について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスでは、シーシャカフェの検索機能を提供するために位置情報を利用する場合があります。位置情報の利用については、事前にユーザーの同意を得た上で行います。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                位置情報の利用を停止したい場合は、端末の設定から位置サービスを無効にすることができます。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                7. アクセス解析ツールについて
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスでは、サービス向上のためにアクセス解析ツールを利用する場合があります。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                8. 外部サービスとの連携について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスでは、以下の外部サービスと連携する場合があります。これらのサービスについては、各サービスのプライバシーポリシーが適用されます。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・Auth0（認証サービス） ・Cloudflare（インフラサービス）
                ・Google Maps（地図サービス）
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                9. 個人情報の開示、訂正、削除について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                ユーザーは、当サービスが保有する自己の個人情報について、開示、訂正、削除を求めることができます。これらの請求については、当サービスが定める方法により受け付けます。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                ただし、法令により保存が義務付けられている場合や、当サービスの運営に著しい支障をきたす場合は、対応できない場合があります。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                10. 未成年者の個人情報について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスでは、15歳未満の方の個人情報を収集する場合は、保護者の同意を得た上で行います。15歳未満の方が保護者の同意なく個人情報を提供していることが判明した場合は、速やかに当該情報を削除いたします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                11. プライバシーポリシーの変更について
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、法令の変更やサービス内容の変更等に伴い、本プライバシーポリシーを変更する場合があります。変更後のプライバシーポリシーは、当サービス上に掲載した時点で効力を生じるものとします。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                重要な変更については、サービス内での通知やメール等でお知らせいたします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                12. お問い合わせ窓口
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                個人情報の取扱いに関するご質問やご相談については、以下の窓口までお問い合わせください。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                サービス名：GoToShisha
                お問い合わせ方法：アプリ内お問い合わせフォーム
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                13. 適用範囲
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                本プライバシーポリシーは、当サービスにおいてのみ適用されます。当サービスからリンクされている他のウェブサイトについては、それぞれのプライバシーポリシーが適用されます。
              </Text>
            </YStack>

            <YStack
              alignItems="center"
              marginTop="$4"
              paddingTop="$4"
              borderTopWidth={1}
              borderTopColor="$gray6"
            >
              <Text fontSize="$3" color="$gray10">
                制定日：2024年1月1日
              </Text>
              <Text fontSize="$3" color="$gray10" marginTop="$1">
                最終更新：2024年6月24日
              </Text>
            </YStack>
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
