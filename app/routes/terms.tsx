/**
 * ゴートゥーシーシャ - 利用規約画面コンポーネント
 * サービスの利用規約を表示する画面
 */
import React from "react";
import { YStack, Text, ScrollView, Card, Button } from "tamagui";
import { useRouter } from "expo-router";

export default function TermsScreen() {
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
            📋 利用規約
          </Text>
          <Text fontSize="$4" color="$gray10" textAlign="center" marginTop="$2">
            GoToShisha サービス利用規約
          </Text>
        </YStack>

        <Card elevate bordered padding="$4" backgroundColor="$gray1">
          <YStack gap="$4">
            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第1条（目的）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                本利用規約（以下「本規約」といいます。）は、GoToShisha（以下「当サービス」といいます。）の利用条件について定めるものです。ユーザーの皆様（以下「ユーザー」といいます。）には、本規約に従って当サービスをご利用いただきます。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第2条（利用登録）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                1.
                当サービスにおいては、登録希望者が本規約に同意の上、当サービスの定める方法によって利用登録を申請し、当サービスがこれを承認することによって、利用登録が完了するものとします。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                2.
                当サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・利用登録の申請に際して虚偽の事項を届け出た場合
                ・本規約に違反したことがある者からの申請である場合
                ・その他、当サービスが利用登録を相当でないと判断した場合
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第3条（ユーザーIDおよびパスワードの管理）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                1.
                ユーザーは、自己の責任において、当サービスのユーザーIDおよびパスワードを適切に管理するものとします。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                2.
                ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第4条（利用料金および支払方法）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは現在無料で提供されており、ユーザーに利用料金は発生いたしません。ただし、将来的に有料サービスを導入する場合は、事前にユーザーに通知いたします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第5条（禁止事項）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                ユーザーは、当サービスの利用にあたり、以下の行為をしてはなりません。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・法令または公序良俗に違反する行為 ・犯罪行為に関連する行為
                ・当サービスの内容等、当サービスに含まれる著作権、商標権その他の知的財産権を侵害する行為
                ・当サービス、ほかのユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                ・当サービスによって得られた情報を商業的に利用する行為
                ・当サービスの運営を妨害するおそれのある行為
                ・不正アクセスをし、またはこれを試みる行為
                ・他のユーザーに関する個人情報等を収集または蓄積する行為
                ・不正な目的を持って当サービスを利用する行為
                ・当サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
                ・その他、当サービスが不適切と判断する行為
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第6条（本サービスの提供の停止等）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                ・地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                ・コンピュータまたは通信回線等が事故により停止した場合
                ・その他、当サービスが本サービスの提供が困難と判断した場合
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第7条（著作権）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                1.
                ユーザーが当サービスに投稿したコンテンツの著作権は、当該ユーザーその他既存の権利者に留保されるものとします。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                2.
                ユーザーは、当サービスに投稿したコンテンツについて、当サービスが当サービスの改良、品質の向上、または不備の是正等を目的として利用することを許諾するものとします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第8条（利用制限および登録抹消）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して当サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
              </Text>
              <Text
                fontSize="$2"
                color="$gray10"
                lineHeight="$2"
                marginLeft="$3"
              >
                ・本規約のいずれかの条項に違反した場合
                ・登録事項に虚偽の事実があることが判明した場合
                ・その他、当サービスが本サービスの利用を適当でないと判断した場合
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第9条（免責事項）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                1.
                当サービスは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する瑕疵、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                2.
                当サービスは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第10条（サービス内容の変更等）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第11条（利用規約の変更）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第12条（個人情報の取扱い）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                当サービスは、本サービスの利用によって取得する個人情報については、当サービス「プライバシーポリシー」に従い適切に取り扱うものとします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第13条（通知または連絡）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                ユーザーと当サービスとの間の通知または連絡は、当サービスの定める方法によって行うものとします。当サービスは、ユーザーから、当サービスが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第14条（権利義務の譲渡の禁止）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                ユーザーは、当サービスの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </Text>
            </YStack>

            <YStack gap="$2">
              <Text fontSize="$5" fontWeight="600" color="$gray12">
                第15条（準拠法・裁判管轄）
              </Text>
              <Text fontSize="$3" color="$gray11" lineHeight="$2">
                本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。
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
                施行日：2024年1月1日
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
