import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfile,
  updateUserProfile,
  UpdateProfileRequest,
} from "../utils/api/profile";

/**
 * プロフィール管理用のカスタムフック
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
      // 404エラー（ユーザーが見つからない）の場合はリトライしない
      if (error instanceof Error && error.message.includes('ユーザーが見つかりません')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // プロフィール更新
  const updateMutation = useMutation({
    mutationFn: async ({ userId, profile }: { userId: string; profile: UpdateProfileRequest }) => {
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
