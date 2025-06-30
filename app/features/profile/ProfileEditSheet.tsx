/**  
 * プロフィール編集用のシートコンポーネント  
 * ユーザーの名前と自己紹介を編集するモーダルシートを提供する  
 * @param isOpen - シートの表示状態  
 * @param onClose - シートを閉じる際のコールバック  
 * @param userProfile - 編集対象のユーザープロフィール  
 * @param onSave - プロフィール保存時のコールバック  
 */  

import React from "react";
import { TextInput } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  Card,
  Sheet,
} from "tamagui";
import { UserProfile, UpdateProfileRequest } from "../utils/api/profile";
import { useProfileEditForm } from "../hooks/useProfileEditForm";

interface ProfileEditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | {
    id: string;
    email: string;
    name?: string;
    bio?: string;
    createdAt: string;
    avatar?: string;
  };
  /** プロフィール保存時のコールバック関数 */
  onSave: (profile: UpdateProfileRequest) => Promise<void>;
}

/**
 * プロフィール編集シートコンポーネント
 * 
 * ボトムシート形式でプロフィール編集フォームを表示する。
 * 名前と自己紹介を編集でき、適切なバリデーションとエラーハンドリングを提供する。
 * 
 * @param props - プロフィール編集シートのプロパティ
 * @param props.isOpen - シートの表示状態
 * @param props.onClose - シートを閉じる際のコールバック
 * @param props.userProfile - 編集対象のプロフィール情報
 * @param props.onSave - 保存時のコールバック関数
 * @returns プロフィール編集シートのJSXエレメント
 * 
 * @example
 * ```tsx
 * <ProfileEditSheet
 *   isOpen={isEditSheetOpen}
 *   onClose={() => setIsEditSheetOpen(false)}
 *   userProfile={profile}
 *   onSave={handleProfileUpdate}
 * />
 * ```
 */
export function ProfileEditSheet({
  isOpen,
  onClose,
  userProfile,
  onSave,
}: ProfileEditSheetProps) {
  const {
    name,
    bio,
    isLoading,
    error,
    handleNameChange,
    handleBioChange,
    handleSave,
    handleCancel,
  } = useProfileEditForm({
    isOpen,
    userProfile,
    onSave,
    onClose,
  });

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={(open: boolean) => !open && handleCancel()}
      snapPoints={[80]}
      position={0}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" backgroundColor="$background">
        <YStack gap="$4" height="100%">
          <Text fontSize="$6" fontWeight="bold" textAlign="center">
            プロフィール編集
          </Text>

          {error && (
            <Card backgroundColor="$red2" padding="$3">
              <Text color="$red11" fontSize="$3">
                {error}
              </Text>
            </Card>
          )}

          <YStack gap="$3" flex={1}>
            <YStack gap="$2">
              <Text fontSize="$4" fontWeight="600">
                名前
              </Text>
              <Input
                key={`name-${isOpen}`}
                value={name}
                onChangeText={handleNameChange}
                placeholder="名前を入力"
                backgroundColor="$backgroundSoft"
                borderRadius="$3"
                size="$4"
              />
            </YStack>

            <YStack gap="$2" flex={1}>
              <Text fontSize="$4" fontWeight="600">
                自己紹介
              </Text>
              <TextInput
                defaultValue={userProfile?.bio || ""}
                onChangeText={handleBioChange}
                placeholder="自己紹介を入力（最大500文字）"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: 8,
                  padding: 16,
                  minHeight: 120,
                  textAlignVertical: 'top',
                  fontSize: 16,
                  lineHeight: 22,
                  fontFamily: 'System',
                  borderWidth: 1,
                  borderColor: '#e9ecef',
                }}
                maxLength={500}
                multiline
                textAlignVertical="top"
                scrollEnabled={true}
                submitBehavior="newline"
                returnKeyType="default"
                enablesReturnKeyAutomatically={false}
              />
              <Text fontSize="$2" color="$gray10" textAlign="right">
                {bio.length}/500
              </Text>
            </YStack>
          </YStack>

          <XStack gap="$3" marginTop="$4">
            <Button
              flex={1}
              onPress={handleCancel}
              backgroundColor="$gray8"
              disabled={isLoading}
            >
              <Text color="$gray12">キャンセル</Text>
            </Button>
            <Button
              flex={1}
              onPress={handleSave}
              backgroundColor="$blue10"
              disabled={isLoading}
              opacity={isLoading ? 0.7 : 1}
            >
              <Text color="white" fontWeight="600">
                {isLoading ? "保存中..." : "保存"}
              </Text>
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
