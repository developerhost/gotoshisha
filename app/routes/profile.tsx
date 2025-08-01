/**
 * プロフィール画面
 *
 * ユーザーのプロフィール情報の表示・編集機能を提供します。
 * - プロフィール情報（名前、メールアドレス、自己紹介）の表示
 * - プロフィール編集モーダルの表示
 * - お気に入り、レビュー履歴、設定画面への導線
 * - ログアウト機能
 */

import React, { useState } from "react";
import {
  YStack,
  Text,
  Button,
  ScrollView,
  Card,
  XStack,
  Avatar,
  Input,
  TextArea,
} from "tamagui";
import { useRouter } from "expo-router";
import { TabBar } from "../components/TabBar";
import { useProfileManager } from "../features/profile/useProfileManager";
import { UpdateProfileRequest } from "../api/profile";

/**
 * プロフィール画面コンポーネント
 * 認証状態に応じてログイン画面またはプロフィール詳細を表示
 * @returns {JSX.Element} プロフィール画面
 */
export default function ProfileScreen() {
  const router = useRouter();
  const {
    user,
    logout,
    isAuthenticated,
    profile,
    isProfileLoading,
    handleProfileUpdate,
  } = useProfileManager();

  // インライン編集の状態管理
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 編集モード開始時の初期値設定
  const handleStartEdit = () => {
    setEditName(profile?.name || user?.name || "");
    setEditBio(profile?.bio || "");
    setIsEditMode(true);
    setSaveError(null);
  };

  // 編集のキャンセル
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditName("");
    setEditBio("");
    setSaveError(null);
  };

  // 編集内容の保存
  const handleSaveEdit = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);

      const updateData: UpdateProfileRequest = {};

      // 変更があった場合のみ更新データに含める
      if (editName !== profile?.name) {
        updateData.name = editName;
      }
      if (editBio !== profile?.bio) {
        updateData.bio = editBio;
      }

      // 何も変更がない場合は編集モードを終了
      if (Object.keys(updateData).length === 0) {
        setIsEditMode(false);
        return;
      }

      await handleProfileUpdate(updateData);
      setIsEditMode(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "更新に失敗しました";
      setSaveError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <YStack flex={1} backgroundColor="$backgroundSoft">
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
        >
          <YStack alignItems="center" gap="$4">
            <Text fontSize="$8">👤</Text>
            <Text
              fontSize="$6"
              fontWeight="bold"
              textAlign="center"
              marginBottom="$2"
            >
              プロフィール
            </Text>
            <Text
              fontSize="$4"
              color="$gray10"
              textAlign="center"
              marginBottom="$4"
            >
              ログインしてプロフィールを確認しましょう
            </Text>
            <Button
              onPress={() => router.push("/routes/login")}
              backgroundColor="$blue10"
              borderRadius="$6"
              size="$4"
            >
              <Text color="white" fontWeight="600">
                ログイン
              </Text>
            </Button>
          </YStack>
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
          {/* ヘッダー */}
          <YStack alignItems="center" gap="$3" marginTop="$6">
            <Avatar circular size="$8" backgroundColor="$blue8">
              <Text fontSize="$6" color="white">
                {profile?.name?.charAt(0) ||
                  user?.name?.charAt(0) ||
                  user?.email?.charAt(0) ||
                  "U"}
              </Text>
            </Avatar>
            <YStack alignItems="center">
              <Text fontSize="$6" fontWeight="bold">
                {profile?.name || user?.name || "ユーザー"}
              </Text>
              <Text fontSize="$4" color="$gray10">
                {user?.email}
              </Text>
            </YStack>
          </YStack>

          {/* プロフィール情報 */}
          <Card padding="$4" backgroundColor="$background" marginTop="$4">
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom="$3"
            >
              <Text fontSize="$5" fontWeight="600">
                アカウント情報
              </Text>
              {!isEditMode ? (
                <Button
                  size="$3"
                  backgroundColor="$blue10"
                  onPress={handleStartEdit}
                  pressStyle={{ opacity: 0.8 }}
                  disabled={isProfileLoading}
                >
                  <Text color="white" fontSize="$3" fontWeight="600">
                    {isProfileLoading ? "読み込み中..." : "編集"}
                  </Text>
                </Button>
              ) : (
                <XStack gap="$2">
                  <Button
                    size="$3"
                    backgroundColor="$gray8"
                    onPress={handleCancelEdit}
                    pressStyle={{ opacity: 0.8 }}
                    disabled={isSaving}
                  >
                    <Text color="$gray12" fontSize="$3" fontWeight="600">
                      キャンセル
                    </Text>
                  </Button>
                  <Button
                    size="$3"
                    backgroundColor="$blue10"
                    onPress={handleSaveEdit}
                    pressStyle={{ opacity: 0.8 }}
                    disabled={isSaving}
                  >
                    <Text color="white" fontSize="$3" fontWeight="600">
                      {isSaving ? "保存中..." : "保存"}
                    </Text>
                  </Button>
                </XStack>
              )}
            </XStack>

            {saveError && (
              <Card backgroundColor="$red2" padding="$2" marginBottom="$3">
                <Text color="$red11" fontSize="$3">
                  {saveError}
                </Text>
              </Card>
            )}

            <YStack gap="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$4" color="$gray11">
                  名前
                </Text>
                {isEditMode ? (
                  <Input
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="名前を入力"
                    backgroundColor="$backgroundSoft"
                    borderRadius="$3"
                    size="$3"
                    flex={1}
                    maxWidth={200}
                    disabled={isSaving}
                  />
                ) : (
                  <Text fontSize="$4">
                    {profile?.name || user?.name || "未設定"}
                  </Text>
                )}
              </XStack>
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$4" color="$gray11">
                  メールアドレス
                </Text>
                <Text fontSize="$4">{user?.email}</Text>
              </XStack>
            </YStack>
          </Card>

          {/* 自己紹介セクション */}
          <Card padding="$4" backgroundColor="$background" marginTop="$3">
            <XStack
              justifyContent="space-between"
              alignItems="center"
              marginBottom="$3"
            >
              <Text fontSize="$5" fontWeight="600">
                自己紹介
              </Text>
            </XStack>
            {isEditMode ? (
              <YStack gap="$2">
                <TextArea
                  value={editBio}
                  onChangeText={setEditBio}
                  placeholder="自己紹介を入力（最大500文字）"
                  backgroundColor="$backgroundSoft"
                  borderRadius="$3"
                  size="$4"
                  minHeight={120}
                  maxLength={500}
                  disabled={isSaving}
                />
                <Text fontSize="$2" color="$gray10" textAlign="right">
                  {editBio.length}/500
                </Text>
              </YStack>
            ) : profile?.bio ? (
              <Text fontSize="$4" lineHeight="$5" color="$gray12">
                {profile.bio}
              </Text>
            ) : (
              <Text fontSize="$4" color="$gray10" fontStyle="italic">
                自己紹介が設定されていません
              </Text>
            )}
          </Card>

          {/* メニュー */}
          <YStack gap="$3" marginTop="$4">
            <Card
              padding="$4"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              onPress={() => router.push("/routes/favorites")}
              backgroundColor="$background"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$5">❤️</Text>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600">
                    お気に入り店舗
                  </Text>
                  <Text fontSize="$3" color="$gray10">
                    保存した店舗を確認
                  </Text>
                </YStack>
                <Text fontSize="$4" color="$gray10">
                  ›
                </Text>
              </XStack>
            </Card>

            <Card
              padding="$4"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              onPress={() => router.push("/routes/reviews")}
              backgroundColor="$background"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$5">⭐</Text>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600">
                    レビュー履歴
                  </Text>
                  <Text fontSize="$3" color="$gray10">
                    投稿したレビューを確認
                  </Text>
                </YStack>
                <Text fontSize="$4" color="$gray10">
                  ›
                </Text>
              </XStack>
            </Card>

            <Card
              padding="$4"
              pressStyle={{ opacity: 0.8, scale: 0.98 }}
              onPress={() => router.push("/routes/settings")}
              backgroundColor="$background"
            >
              <XStack alignItems="center" gap="$3">
                <Text fontSize="$5">⚙️</Text>
                <YStack flex={1}>
                  <Text fontSize="$4" fontWeight="600">
                    設定
                  </Text>
                  <Text fontSize="$3" color="$gray10">
                    アプリの設定を変更
                  </Text>
                </YStack>
                <Text fontSize="$4" color="$gray10">
                  ›
                </Text>
              </XStack>
            </Card>
          </YStack>

          {/* ログアウトボタン */}
          <Button
            backgroundColor="$red9"
            marginTop="$6"
            marginBottom="$20"
            onPress={logout}
            pressStyle={{ opacity: 0.8 }}
          >
            <Text color="white" fontSize="$4" fontWeight="600">
              ログアウト
            </Text>
          </Button>
        </YStack>
      </ScrollView>

      {/* タブバー */}
      <TabBar user={user} />
    </YStack>
  );
}
