/**
 * ユーザープロフィールの取得・更新・キャッシュ管理を行うReact Queryベースのカスタムフック。
 * 認証情報とユーザー情報を組み合わせて、効率的にプロフィール操作を実現する。
 *
 * 主な機能:
 * - プロフィール情報の取得（React Query自動キャッシュ）
 * - プロフィール更新（楽観的更新対応）
 * - 認証トークンの自動取得・送信
 * - エラーハンドリング
 * - リアルタイムキャッシュ更新
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  UpdateProfileRequest,
} from "../../api/profile";

/**
 * プロフィール管理用のカスタムフック
 *
 * ユーザープロフィールの取得と更新機能を提供する。
 * React Queryを使用してキャッシュ管理と楽観的更新を実現する。
 *
 * @param userId - 取得・更新対象のユーザーID
 * @param getAccessToken - アクセストークン取得関数（認証用）
 * @param userInfo - 初回作成時のユーザー情報（Auth0から取得）
 * @returns プロフィール操作のためのクエリとミューテーション関数
 *
 * @example
 * ```tsx
 * const { profile, isLoading, updateProfile } = useProfile(
 *   user?.sub,
 *   getAccessTokenSilently,
 *   user
 * );
 *
 * // プロフィール更新
 * await updateProfile({ name: '新しい名前', bio: '新しい自己紹介' });
 * ```
 */
export function useProfile(
  userId: string | undefined,
  getAccessToken?: () => Promise<string | null>,
  userInfo?: { email?: string; name?: string; picture?: string }
) {
  const queryClient = useQueryClient();

  // プロフィール取得
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const token = getAccessToken ? await getAccessToken() : undefined;
      return getUserProfile(userId!, token || undefined, userInfo);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    retry: (failureCount, error) => {
      // 404エラーまたは特定のエラータイプの場合はリトライしない
      if (
        error instanceof Error &&
        (error.message.includes("404") ||
          error.message.includes("not found") ||
          error.message.includes("ユーザーが見つかりません"))
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // プロフィール更新
  const updateMutation = useMutation({
    mutationFn: async ({
      userId,
      profile,
    }: {
      userId: string;
      profile: UpdateProfileRequest;
    }) => {
      const token = getAccessToken ? await getAccessToken() : undefined;
      return updateUserProfile(userId, profile, token || undefined);
    },
    onSuccess: (updatedProfile) => {
      // キャッシュを更新
      queryClient.setQueryData(["profile", userId], updatedProfile);
      // 他の関連するクエリも無効化
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const updateProfile = async (profile: UpdateProfileRequest) => {
    if (!userId) {
      throw new Error("ユーザーIDが必要です");
    }
    return updateMutation.mutateAsync({ userId, profile });
  };

  return {
    profile,
    isLoading,
    error,
    refetch,
    updateProfile,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}
