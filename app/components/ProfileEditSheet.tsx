/**  
 * プロフィール編集用のシートコンポーネント  
 * ユーザーの名前と自己紹介を編集するモーダルシートを提供する  
 * @param isOpen - シートの表示状態  
 * @param onClose - シートを閉じる際のコールバック  
 * @param userProfile - 編集対象のユーザープロフィール  
 * @param onSave - プロフィール保存時のコールバック  
 */  

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

  // 安定したハンドラー関数
  /**
   * 自己紹介テキストの変更ハンドラー
   * 
   * @param text - 新しい自己紹介テキスト
   */
  const handleBioChange = useCallback((text: string) => {
    setBio(text);
  }, []);

  /**
   * 名前の変更ハンドラー
   * 
   * @param text - 新しい名前
   */
  const handleNameChange = useCallback((text: string) => {
    setName(text);
  }, []);

  // モーダルが開かれた時のみ初期値を設定
  useEffect(() => {
    if (isOpen && userProfile && !initializedRef.current) {
      setName(userProfile.name || "");
      setBio(userProfile.bio || "");
      setError(null);
      initializedRef.current = true;
    }
  }, [isOpen, userProfile]);

  // モーダルが閉じられた時に初期化フラグをリセット
  useEffect(() => {
    if (!isOpen) {
      initializedRef.current = false;
    }
  }, [isOpen]);

  /**
   * プロフィールの保存処理
   * 
   * 変更されたフィールドのみを抽出してサーバーに送信する。
   * 変更がない場合は更新処理をスキップする。
   */
  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const updateData: UpdateProfileRequest = {};
      
      // 変更があった場合のみ更新データに含める
      if (name !== userProfile.name) {
        updateData.name = name;
      }
      if (bio !== userProfile.bio) {
        updateData.bio = bio;
      }

      // 何も変更がない場合は更新をスキップ
      if (Object.keys(updateData).length === 0) {
        onClose();
        return;
      }

      await onSave(updateData);
      initializedRef.current = false;
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * キャンセル処理
   * 
   * 編集内容を破棄して初期値にリセットし、シートを閉じる。
   * 初期化フラグもリセットして次回開く際に正しく初期化されるようにする。
   */
  const handleCancel = () => {
    // 変更を破棄してリセット
    if (userProfile) {
      setName(userProfile.name || "");
      setBio(userProfile.bio || "");
    } else {
      setName("");
      setBio("");
    }
    setError(null);
    initializedRef.current = false;
    onClose();
  };

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
