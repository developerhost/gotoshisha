/**
 * プロフィールAPI クライアント
 *
 * ユーザープロフィールの取得・更新を行うAPIクライアント機能を提供します。
 * - プロフィール情報の取得（GET/POST）
 * - プロフィール情報の更新（PUT）
 * - エラーハンドリングとログ出力
 */
import { BaseApi } from "./baseApi";

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
}

/**
 * ユーザープロフィールを取得する
 *
 * 指定されたユーザーIDのプロフィール情報を取得する。
 * 初回アクセス時（userInfo提供時）はPOST（retrieve）でアカウント作成も行う。
 * 2回目以降はGETで効率的に取得する。
 *
 * @param userId - 取得するユーザーのID
 * @param token - 認証用アクセストークン（オプション）
 * @param userInfo - 初回作成時のユーザー情報（メール、名前、画像等）
 * @returns プロフィール情報のPromise
 * @throws {Error} 認証エラー（401）、バリデーションエラー（400）、重複エラー（409）等
 *
 * @example
 * ```typescript
 * // 既存ユーザーの取得
 * const profile = await getUserProfile('user123', accessToken);
 *
 * // 初回ユーザー作成
 * const newProfile = await getUserProfile('user123', accessToken, {
 *   email: 'user@example.com',
 *   name: 'John Doe'
 * });
 * ```
 */
export async function getUserProfile(
  userId: string,
  token?: string,
  userInfo?: { email?: string; name?: string; picture?: string }
): Promise<UserProfile> {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("getUserProfile called with userId:", userId);
    // eslint-disable-next-line no-console
    console.log("User info provided:", userInfo);
  }

  try {
    // ユーザー情報がある場合はPOST（retrieve）を使用、ない場合はGETを使用
    const response = userInfo
      ? await BaseApi.post<UserProfile>(
          `/api/profile/${userId}/retrieve`,
          { user: userInfo },
          { skipAuth: !token }
        )
      : await BaseApi.get<UserProfile>(
          `/api/profile/${userId}`,
          {},
          { skipAuth: !token }
        );

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("Profile data:", response);
    }

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "プロフィールの取得に失敗しました");
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("API error:", error);
    }

    // BaseApiのApiErrorを使用したエラーハンドリング
    if (error instanceof Error && error.message.includes("401")) {
      throw new Error("認証が必要です。ログインしてから再試行してください。");
    } else if (error instanceof Error && error.message.includes("400")) {
      throw new Error(
        "ユーザー情報の取得に失敗しました。有効なメールアドレスが必要です。"
      );
    } else if (error instanceof Error && error.message.includes("409")) {
      throw new Error("このメールアドレスは既に使用されています。");
    } else {
      throw new Error("プロフィールの取得に失敗しました");
    }
  }
}

/**
 * ユーザープロフィールを更新する
 *
 * 指定されたユーザーIDのプロフィール情報を更新する。
 * 名前や自己紹介など、変更されたフィールドのみを送信して効率的に更新する。
 *
 * @param userId - 更新するユーザーのID
 * @param profile - 更新するプロフィール情報（変更されたフィールドのみ）
 * @param token - 認証用アクセストークン（オプション）
 * @returns 更新後のプロフィール情報のPromise
 * @throws {Error} 認証エラー、バリデーションエラー等
 *
 * @example
 * ```typescript
 * const updatedProfile = await updateUserProfile('user123', {
 *   name: '新しい名前',
 *   bio: '更新された自己紹介'
 * }, accessToken);
 * ```
 */
export async function updateUserProfile(
  userId: string,
  profile: UpdateProfileRequest,
  token?: string
): Promise<UserProfile> {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("updateUserProfile called with:", { userId, profile });
  }

  try {
    const response = await BaseApi.put<UserProfile>(
      `/api/profile/${userId}`,
      profile,
      { skipAuth: !token }
    );

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("Updated profile data:", response);
    }

    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || "プロフィールの更新に失敗しました");
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("Update API error:", error);
    }
    throw new Error("プロフィールの更新に失敗しました");
  }
}
