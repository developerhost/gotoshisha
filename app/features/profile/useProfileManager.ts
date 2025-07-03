/**
 * プロフィール管理カスタムフック
 *
 * ユーザー認証状態とプロフィールデータの管理を一元化します。
 * - 認証状態の取得（Auth0連携）
 * - プロフィール情報の取得・更新
 * - プロフィール編集シートの状態管理
 * - プロフィール更新のハンドリング
 */
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "./useProfile";
import { UpdateProfileRequest } from "../../api/profile";
/**
 * プロフィール管理のカスタムフック
 * プロフィールの取得、更新、編集シートの状態管理を一元化する
 */
export const useProfileManager = () => {
  const { user, logout, isAuthenticated, getAccessToken } = useAuth();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  // ユーザーIDを取得（Auth0のsubフィールドから）
  const userId = user?.sub;

  // プロフィール情報を取得・管理
  const {
    profile,
    isLoading: isProfileLoading,
    updateProfile,
  } = useProfile(
    userId,
    getAccessToken,
    user
      ? {
          email: user.email,
          name: user.name,
          picture: user.picture,
        }
      : undefined
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

  const handleEditSheetClose = () => {
    setIsEditSheetOpen(false);
  };

  return {
    // ユーザー情報
    user,
    logout,
    isAuthenticated,
    userId,

    // プロフィール情報
    profile,
    isProfileLoading,

    // 編集シート状態
    isEditSheetOpen,
    setIsEditSheetOpen,

    // ハンドラー関数
    handleProfileUpdate,
    handleEditButtonClick,
    handleEditSheetClose,
  };
};
