import React, { useState } from "react";
import { YStack, Text, Button, ScrollView, Card, XStack, Avatar } from "tamagui";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext.web";
import { TabBar } from "../components/TabBar";
import { ProfileEditSheet } from "../components/ProfileEditSheet";
import { useProfile } from "../hooks/useProfile";
import { UpdateProfileRequest } from "../utils/api/profile";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, isAuthenticated, getAccessToken } = useAuth();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  
  // ユーザーIDを取得（Auth0のsubフィールドから）
  const userId = user?.sub;
  
  // プロフィール情報を取得・管理
  const { profile, isLoading: isProfileLoading, updateProfile } = useProfile(
    userId, 
    getAccessToken, 
    user ? {
      email: user.email,
      name: user.name,
      picture: user.picture,
    } : undefined
  );

  const handleProfileUpdate = async (updateData: UpdateProfileRequest) => {
    await updateProfile(updateData);
  };

  const handleEditButtonClick = () => {
    if (profile) {
      setIsEditSheetOpen(true);
    }
    // プロフィール情報がまだ読み込まれていない場合は何もしない（ボタンがdisabledになる）
  };

  if (!isAuthenticated) {
    return (
      <YStack flex={1} backgroundColor="$backgroundSoft">
        <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
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
              {profile?.name?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
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
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
            <Text fontSize="$5" fontWeight="600">
              アカウント情報
            </Text>
            <Button
              size="$3"
              backgroundColor="$blue10"
              onPress={handleEditButtonClick}
              pressStyle={{ opacity: 0.8 }}
              disabled={isProfileLoading || !profile}
            >
              <Text color="white" fontSize="$3" fontWeight="600">
                {isProfileLoading ? "読み込み中..." : "編集"}
              </Text>
            </Button>
          </XStack>
          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$4" color="$gray11">名前</Text>
              <Text fontSize="$4">{profile?.name || user?.name || "未設定"}</Text>
            </XStack>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$4" color="$gray11">メールアドレス</Text>
              <Text fontSize="$4">{user?.email}</Text>
            </XStack>
          </YStack>
        </Card>

        {/* 自己紹介セクション */}
        <Card padding="$4" backgroundColor="$background" marginTop="$3">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
            <Text fontSize="$5" fontWeight="600">
              自己紹介
            </Text>
            <Button
              size="$3"
              backgroundColor="$blue10"
              onPress={handleEditButtonClick}
              pressStyle={{ opacity: 0.8 }}
              disabled={isProfileLoading || !profile}
            >
              <Text color="white" fontSize="$3" fontWeight="600">
                {isProfileLoading ? "読み込み中..." : "編集"}
              </Text>
            </Button>
          </XStack>
          {profile?.bio ? (
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
              <Text fontSize="$4" color="$gray10">›</Text>
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
              <Text fontSize="$4" color="$gray10">›</Text>
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
              <Text fontSize="$4" color="$gray10">›</Text>
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
      
      {/* プロフィール編集シート */}
      {profile && (
        <ProfileEditSheet
          isOpen={isEditSheetOpen}
          onClose={() => setIsEditSheetOpen(false)}
          userProfile={profile}
          onSave={handleProfileUpdate}
        />
      )}
      
      {/* タブバー */}
      <TabBar user={user} />
    </YStack>
  );
}
