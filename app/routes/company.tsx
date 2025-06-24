/**
 * ゴートゥーシーシャ - 運営会社画面コンポーネント
 * サービス運営会社の情報を表示する画面
 */
import React from "react";
import { YStack, Text, ScrollView, Card, Button } from "tamagui";
import { useRouter } from "expo-router";

export default function CompanyScreen() {
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
            🏢 運営会社
          </Text>
          <Text fontSize="$4" color="$gray10" textAlign="center" marginTop="$2">
            GoToShisha 運営会社情報
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
              🚀 会社概要
            </Text>
            <Text fontSize="$4" color="$gray11" lineHeight="$2">
              GoToShishaは、シーシャ文化の普及と、シーシャ愛好家同士の交流促進を目的として開発されたサービスです。
              私たちは、テクノロジーを通じてシーシャコミュニティをつなぎ、
              より豊かなシーシャ体験を提供することを使命としています。
            </Text>
          </YStack>
        </Card>

        <Card elevate bordered padding="$4" backgroundColor="$gray1">
          <YStack gap="$4">
            <Text fontSize="$6" fontWeight="600" color="$gray12">
              📋 会社情報
            </Text>

            <YStack gap="$3">
              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  会社名
                </Text>
                <Text fontSize="$4" color="$gray11">
                  株式会社Swappy
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  設立年月日
                </Text>
                <Text fontSize="$4" color="$gray11">
                  2023年12月14日
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  代表者
                </Text>
                <Text fontSize="$4" color="$gray11">
                  代表取締役社長 橋田 至
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  本社所在地
                </Text>
                <Text fontSize="$4" color="$gray11" lineHeight="$2">
                  〒150-0001{"\n"}
                  東京都渋谷区神宮前1-1-1{"\n"}
                  シーシャビル 10F
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  資本金
                </Text>
                <Text fontSize="$4" color="$gray11">
                  1,000万円
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  従業員数
                </Text>
                <Text fontSize="$4" color="$gray11">
                  1名（2025年7月現在）
                </Text>
              </YStack>

              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$gray12">
                  事業内容
                </Text>
                <Text fontSize="$4" color="$gray11" lineHeight="$2">
                  ・シーシャカフェ検索・情報共有アプリの開発・運営{"\n"}
                  ・シーシャ関連のデジタルプラットフォーム事業{"\n"}
                  ・シーシャ文化の普及・啓発活動{"\n"}
                  ・シーシャ業界向けのDXソリューション提供
                </Text>
              </YStack>
            </YStack>
          </YStack>
        </Card>

        <YStack gap="$3">
          <Text
            fontSize="$6"
            fontWeight="600"
            marginBottom="$2"
            color="$gray12"
          >
            🎯 企業理念・ビジョン
          </Text>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$blue1"
            borderColor="$blue6"
          >
            <YStack gap="$3">
              <Text fontSize="$5" fontWeight="600" color="$blue11">
                🌟 企業理念
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                「シーシャで世界をつなぐ」{"\n"}
                {"\n"}
                私たちは、シーシャという文化を通じて、人と人とのつながりを深め、
                新しい体験と出会いの場を創造することを目指しています。
                テクノロジーの力で、シーシャ愛好家のコミュニティを支援し、
                より豊かで楽しいシーシャライフを実現します。
              </Text>
            </YStack>
          </Card>

          <Card
            elevate
            bordered
            padding="$4"
            backgroundColor="$green1"
            borderColor="$green6"
          >
            <YStack gap="$3">
              <Text fontSize="$5" fontWeight="600" color="$green11">
                🚀 ビジョン
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                「シーシャ文化の架け橋となる」{"\n"}
                {"\n"}
                2030年までに、世界中のシーシャ愛好家が集まる
                最大のデジタルプラットフォームを構築し、
                シーシャ文化の発展と普及に貢献します。
                国境を超えて、シーシャを通じた文化交流を促進し、
                世界平和に貢献する企業を目指します。
              </Text>
            </YStack>
          </Card>
        </YStack>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$orange1"
          borderColor="$orange6"
        >
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$orange11">
              💼 事業展開
            </Text>
            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🎯 主力事業</Text>
                {"\n"}
                GoToShishaアプリの開発・運営を通じて、
                シーシャカフェとユーザーをつなぐプラットフォームを提供しています。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">📱 技術基盤</Text>
                {"\n"}
                最新のクラウド技術（Cloudflare Workers、React Native）を活用し、
                高速で安全なサービスを提供しています。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🌍 展開地域</Text>
                {"\n"}
                現在は日本国内からサービスを開始し、
                将来的には東南アジア、中東地域への展開を計画しています。
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
              👥 チーム・組織
            </Text>
            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🔧 開発チーム</Text>
                {"\n"}
                フロントエンド、バックエンド、モバイルアプリ開発の
                専門エンジニアが在籍し、日々サービスの改善に取り組んでいます。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🎨 デザインチーム</Text>
                {"\n"}
                ユーザーエクスペリエンスを重視したデザインで、
                直感的で使いやすいインターフェースを提供しています。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">📊 ビジネスチーム</Text>
                {"\n"}
                マーケティング、営業、カスタマーサポートを通じて、
                ユーザーと加盟店様の満足度向上に努めています。
              </Text>
            </YStack>
          </YStack>
        </Card>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$pink1"
          borderColor="$pink6"
        >
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$pink11">
              🌱 社会貢献活動
            </Text>
            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🎓 教育支援</Text>
                {"\n"}
                シーシャ文化の正しい理解と普及のため、
                セミナーやワークショップを定期的に開催しています。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🌍 環境保護</Text>
                {"\n"}
                デジタル化によるペーパーレス化の推進と、
                環境に配慮したサービス運営を心がけています。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">🤝 地域活性化</Text>
                {"\n"}
                地域のシーシャカフェとの連携を通じて、
                地域経済の活性化に貢献しています。
              </Text>
            </YStack>
          </YStack>
        </Card>

        <Card
          elevate
          bordered
          padding="$4"
          backgroundColor="$yellow1"
          borderColor="$yellow6"
        >
          <YStack gap="$3">
            <Text fontSize="$6" fontWeight="600" color="$yellow11">
              📞 お問い合わせ
            </Text>
            <YStack gap="$2">
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">一般のお問い合わせ</Text>
                {"\n"}
                GoToShishaアプリ内のお問い合わせフォームをご利用ください。
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">メディア・取材関係</Text>
                {"\n"}
                hasuh4803@gmail.com
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">事業提携・協業</Text>
                {"\n"}
                hasuh4803@gmail.com
              </Text>
              <Text fontSize="$4" color="$gray11" lineHeight="$2">
                <Text fontWeight="600">採用関係</Text>
                {"\n"}
                hasuh4803@gmail.com
              </Text>
            </YStack>
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
              🎯 一緒に働きませんか？
            </Text>
            <Text
              fontSize="$4"
              color="$gray11"
              textAlign="center"
              lineHeight="$2"
            >
              私たちと一緒にシーシャ文化の未来を創造しませんか？
              情熱的なメンバーを随時募集しています。
            </Text>
            <Text fontSize="$3" color="$gray10" textAlign="center">
              採用情報については、採用専用メールアドレスまでお問い合わせください。
            </Text>
          </YStack>
        </Card>

        <YStack
          alignItems="center"
          marginTop="$4"
          paddingTop="$4"
          borderTopWidth={1}
          borderTopColor="$gray6"
        >
          <Text fontSize="$3" color="$gray10">
            © 2024 株式会社Swappy
          </Text>
          <Text fontSize="$3" color="$gray10" marginTop="$1">
            All rights reserved.
          </Text>
        </YStack>

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
