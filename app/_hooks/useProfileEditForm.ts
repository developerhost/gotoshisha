/**
 * プロフィール編集フォーム管理カスタムフック
 *
 * プロフィール編集シートのフォーム状態とロジックを管理するカスタムフックです。
 * - フォーム入力値の状態管理（名前、自己紹介）
 * - 編集状態の管理（ローディング、エラー、初期化フラグ）
 * - 保存・キャンセル処理の実装
 * - フォームの初期化とバリデーション
 *
 * @param isOpen - シートの表示状態
 * @param userProfile - 編集対象のユーザープロフィール
 * @param onSave - プロフィール保存コールバック
 * @param onClose - シート閉じるコールバック
 * @returns フォーム管理に必要な状態とハンドラー関数
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { UpdateProfileRequest, UserProfile } from "../utils/api/profile";

interface UseProfileEditFormParams {
  isOpen: boolean;
  userProfile:
    | UserProfile
    | {
        id: string;
        email: string;
        name?: string;
        bio?: string;
        createdAt: string;
        avatar?: string;
      }
    | null;
  onSave: (profile: UpdateProfileRequest) => Promise<void>;
  onClose: () => void;
}

export const useProfileEditForm = ({
  isOpen,
  userProfile,
  onSave,
  onClose,
}: UseProfileEditFormParams) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initializedRef = useRef(false);

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

  /**
   * プロフィールの保存処理
   *
   * 変更されたフィールドのみを抽出してサーバーに送信する。
   * 変更がない場合は更新処理をスキップする。
   */
  const handleSave = useCallback(async () => {
    if (!userProfile) return;

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
  }, [name, bio, userProfile, onSave, onClose]);

  /**
   * キャンセル処理
   *
   * 編集内容を破棄して初期値にリセットし、シートを閉じる。
   * 初期化フラグもリセットして次回開く際に正しく初期化されるようにする。
   */
  const handleCancel = useCallback(() => {
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
  }, [userProfile, onClose]);

  return {
    // フォーム状態
    name,
    bio,
    isLoading,
    error,

    // ハンドラー関数
    handleNameChange,
    handleBioChange,
    handleSave,
    handleCancel,
  };
};
