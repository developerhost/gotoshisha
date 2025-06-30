/**
 * アプリ使用方法のチュートリアル画面
 * Tamaguiを使用したUI実装
 */
import { useState } from "react";
import { Dimensions } from "react-native";
import type { ImageSourcePropType } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  Circle,
  Image,
  Sheet,
} from "tamagui";
import { setTutorialCompleted } from "../utils/tutorial/storage";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface TutorialStep {
  title: string;
  description: string;
  image?: ImageSourcePropType;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "位置情報を共有しよう",
    description:
      "Gotoshishaでは、シーシャ店の位置情報を友達と共有できます。マップ上から簡単に店舗を見つけることができます。",
  },
  {
    title: "お気に入りの店を投稿",
    description:
      "あなたのお気に入りのシーシャ店を投稿して、みんなと共有しましょう。写真やコメントを添えて投稿できます。",
  },
  {
    title: "コミュニティに参加",
    description:
      "他のユーザーの投稿にいいねやコメントをして、シーシャ好きのコミュニティに参加しましょう。",
  },
  {
    title: "近くの店舗を検索",
    description:
      "現在地から近いシーシャ店を簡単に検索できます。営業時間や評価も確認できます。",
  },
];

interface TutorialProps {
  visible: boolean;
  onComplete: () => void;
}

/**
 * チュートリアル画面コンポーネント
 */
export const Tutorial = ({ visible, onComplete }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    await setTutorialCompleted();
    onComplete();
  };

  const currentTutorial = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  return (
    <Sheet
      modal
      open={visible}
      onOpenChange={(open: boolean) => !open && handleSkip()}
      snapPointsMode="fit"
      dismissOnSnapToBottom
    >
      <Sheet.Frame backgroundColor="$background" flex={1}>
        <YStack flex={1} backgroundColor="$background">
          {/* Header */}
          <YStack
            paddingTop="$8"
            paddingBottom="$4"
            paddingHorizontal="$4"
            backgroundColor="$backgroundStrong"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <Text
              fontSize="$6"
              fontWeight="700"
              color="$color"
              textAlign="center"
            >
              このアプリの使い方を説明します
            </Text>
          </YStack>

          {/* Content */}
          <ScrollView
            flex={1}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <YStack flex={1} paddingHorizontal="$4" paddingBottom="$12">
              {/* Step Indicator */}
              <XStack
                justifyContent="center"
                alignItems="center"
                paddingVertical="$4"
                gap="$2"
              >
                {tutorialSteps.map((_, index) => (
                  <Circle
                    key={index}
                    size={index === currentStep ? 24 : 8}
                    backgroundColor={
                      index === currentStep ? "$blue10" : "$gray6"
                    }
                    animation="bouncy"
                  />
                ))}
              </XStack>

              {/* Tutorial Content */}
              <YStack
                flex={1}
                justifyContent="center"
                alignItems="center"
                paddingVertical="$8"
                gap="$4"
              >
                <Text
                  fontSize="$8"
                  fontWeight="700"
                  color="$color"
                  textAlign="center"
                  animation="quick"
                  key={`title-${currentStep}`}
                >
                  {currentTutorial.title}
                </Text>

                <Text
                  fontSize="$5"
                  color="$color11"
                  lineHeight="$6"
                  textAlign="center"
                  paddingHorizontal="$4"
                  animation="quick"
                  key={`description-${currentStep}`}
                >
                  {currentTutorial.description}
                </Text>

                {currentTutorial.image && (
                  <Image
                    source={currentTutorial.image}
                    width={screenWidth * 0.8}
                    height={screenHeight * 0.3}
                    marginTop="$6"
                    resizeMode="contain"
                    animation="lazy"
                    key={`image-${currentStep}`}
                  />
                )}
              </YStack>
            </YStack>
          </ScrollView>

          {/* Button Container */}
          <XStack
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            paddingHorizontal="$4"
            paddingBottom="$8"
            paddingTop="$4"
            backgroundColor="$background"
            borderTopWidth={1}
            borderTopColor="$borderColor"
            gap="$3"
          >
            <Button
              flex={1}
              size="$4"
              backgroundColor="$gray4"
              color="$gray11"
              borderRadius="$4"
              fontWeight="600"
              onPress={handleSkip}
              pressStyle={{
                backgroundColor: "$gray5",
                scale: 0.97,
              }}
              animation="bouncy"
            >
              スキップ
            </Button>

            <Button
              flex={1}
              size="$4"
              backgroundColor="$blue10"
              color="white"
              borderRadius="$4"
              fontWeight="600"
              onPress={handleNext}
              pressStyle={{
                backgroundColor: "$blue11",
                scale: 0.97,
              }}
              animation="bouncy"
            >
              {isLastStep ? "始める" : "次へ"}
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
