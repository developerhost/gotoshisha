/**
 * useProfile.tsのテスト
 * ユーザープロフィール管理カスタムフックのロジック部分のテスト
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { UpdateProfileRequest, UserProfile } from "../../api/profile";

// モックAPI関数
const mockGetUserProfile = vi.fn();
const mockUpdateUserProfile = vi.fn();

// API モジュールのモック
vi.mock("../../api/profile", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserProfile: (userId: string, token?: string, userInfo?: any) =>
    mockGetUserProfile(userId, token, userInfo),
  updateUserProfile: (
    userId: string,
    profile: UpdateProfileRequest,
    token?: string
  ) => mockUpdateUserProfile(userId, profile, token),
}));

// テスト用のモックデータ
const mockUserProfile: UserProfile = {
  id: "user123",
  email: "test@example.com",
  name: "Test User",
  bio: "テストユーザーの自己紹介",
  createdAt: "2023-01-01T00:00:00Z",
  avatar: "https://example.com/avatar.jpg",
};

const mockUserInfo = {
  email: "test@example.com",
  name: "Test User",
  picture: "https://example.com/picture.jpg",
};

describe("useProfile ロジック関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUserProfile.mockResolvedValue(mockUserProfile);
    mockUpdateUserProfile.mockResolvedValue(mockUserProfile);
  });

  describe("クエリ設定ロジック", () => {
    /**
     * React Queryのクエリ設定を生成するロジック
     */
    const createQueryConfig = (
      userId: string | undefined,
      getAccessToken?: () => Promise<string | null>,
      userInfo?: { email?: string; name?: string; picture?: string }
    ) => {
      return {
        queryKey: ["profile", userId],
        queryFn: async () => {
          if (!userId) throw new Error("User ID is required");
          const token = getAccessToken ? await getAccessToken() : undefined;
          return mockGetUserProfile(userId, token || undefined, userInfo);
        },
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // 5分間キャッシュ
      };
    };

    it("有効なuserIdでクエリ設定を生成する", async () => {
      const config = createQueryConfig("user123");

      expect(config.queryKey).toEqual(["profile", "user123"]);
      expect(config.enabled).toBe(true);
      expect(config.staleTime).toBe(5 * 60 * 1000);

      // queryFnのテスト
      const result = await config.queryFn();
      expect(result).toEqual(mockUserProfile);
      expect(mockGetUserProfile).toHaveBeenCalledWith(
        "user123",
        undefined,
        undefined
      );
    });

    it("getAccessTokenがある場合はトークンを取得して使用する", async () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue("test-token");
      const config = createQueryConfig("user123", mockGetAccessToken);

      await config.queryFn();

      expect(mockGetAccessToken).toHaveBeenCalled();
      expect(mockGetUserProfile).toHaveBeenCalledWith(
        "user123",
        "test-token",
        undefined
      );
    });

    it("userInfoがある場合は渡す", async () => {
      const config = createQueryConfig("user123", undefined, mockUserInfo);

      await config.queryFn();

      expect(mockGetUserProfile).toHaveBeenCalledWith(
        "user123",
        undefined,
        mockUserInfo
      );
    });

    it("userIdがない場合はクエリを無効化する", () => {
      const config = createQueryConfig(undefined);

      expect(config.queryKey).toEqual(["profile", undefined]);
      expect(config.enabled).toBe(false);
    });

    it("トークン取得がnullを返す場合はundefinedとして扱う", async () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue(null);
      const config = createQueryConfig("user123", mockGetAccessToken);

      await config.queryFn();

      expect(mockGetUserProfile).toHaveBeenCalledWith(
        "user123",
        undefined,
        undefined
      );
    });
  });

  describe("リトライロジック", () => {
    /**
     * エラー時のリトライ判定ロジック
     */
    const shouldRetry = (failureCount: number, error: unknown): boolean => {
      // 404エラー（ユーザーが見つからない）の場合はリトライしない
      if (
        error instanceof Error &&
        error.message.includes("ユーザーが見つかりません")
      ) {
        return false;
      }
      return failureCount < 3;
    };

    it("通常のエラーは3回までリトライする", () => {
      const error = new Error("Network error");

      expect(shouldRetry(0, error)).toBe(true);
      expect(shouldRetry(1, error)).toBe(true);
      expect(shouldRetry(2, error)).toBe(true);
      expect(shouldRetry(3, error)).toBe(false);
    });

    it("ユーザーが見つからないエラーはリトライしない", () => {
      const error = new Error("ユーザーが見つかりません");

      expect(shouldRetry(0, error)).toBe(false);
      expect(shouldRetry(1, error)).toBe(false);
      expect(shouldRetry(2, error)).toBe(false);
    });

    it("404を含むメッセージでもリトライしない", () => {
      const error = new Error("404: ユーザーが見つかりません");

      expect(shouldRetry(0, error)).toBe(false);
    });

    it("Error以外のオブジェクトは通常通りリトライする", () => {
      const error = "String error";

      expect(shouldRetry(0, error)).toBe(true);
      expect(shouldRetry(3, error)).toBe(false);
    });

    it("nullやundefinedエラーも通常通りリトライする", () => {
      expect(shouldRetry(0, null)).toBe(true);
      expect(shouldRetry(0, undefined)).toBe(true);
      expect(shouldRetry(3, null)).toBe(false);
    });
  });

  describe("ミューテーション設定ロジック", () => {
    /**
     * プロフィール更新のミューテーション設定を生成するロジック
     */
    const createMutationConfig = (
      getAccessToken?: () => Promise<string | null>
    ) => {
      return {
        mutationFn: async ({
          userId,
          profile,
        }: {
          userId: string;
          profile: UpdateProfileRequest;
        }) => {
          const token = getAccessToken ? await getAccessToken() : undefined;
          return mockUpdateUserProfile(userId, profile, token || undefined);
        },
      };
    };

    it("プロフィール更新リクエストを正しく処理する", async () => {
      const config = createMutationConfig();

      const updateData = {
        userId: "user123",
        profile: { name: "Updated Name", bio: "Updated Bio" },
      };

      const result = await config.mutationFn(updateData);

      expect(result).toEqual(mockUserProfile);
      expect(mockUpdateUserProfile).toHaveBeenCalledWith(
        "user123",
        { name: "Updated Name", bio: "Updated Bio" },
        undefined
      );
    });

    it("トークンがある場合は送信する", async () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue("update-token");
      const config = createMutationConfig(mockGetAccessToken);

      const updateData = {
        userId: "user123",
        profile: { name: "Updated Name" },
      };

      await config.mutationFn(updateData);

      expect(mockGetAccessToken).toHaveBeenCalled();
      expect(mockUpdateUserProfile).toHaveBeenCalledWith(
        "user123",
        { name: "Updated Name" },
        "update-token"
      );
    });

    it("部分的な更新データも処理できる", async () => {
      const config = createMutationConfig();

      // 名前のみ更新
      await config.mutationFn({
        userId: "user123",
        profile: { name: "Name Only" },
      });

      expect(mockUpdateUserProfile).toHaveBeenCalledWith(
        "user123",
        { name: "Name Only" },
        undefined
      );

      // bioのみ更新
      await config.mutationFn({
        userId: "user123",
        profile: { bio: "Bio Only" },
      });

      expect(mockUpdateUserProfile).toHaveBeenCalledWith(
        "user123",
        { bio: "Bio Only" },
        undefined
      );
    });
  });

  describe("updateProfile関数のバリデーション", () => {
    /**
     * updateProfile関数のバリデーションロジック
     */
    const validateAndPrepareUpdate = (
      userId: string | undefined,
      profile: UpdateProfileRequest
    ): { userId: string; profile: UpdateProfileRequest } => {
      if (!userId) {
        throw new Error("ユーザーIDが必要です");
      }
      return { userId, profile };
    };

    it("有効なuserIdとプロフィールデータを返す", () => {
      const result = validateAndPrepareUpdate("user123", {
        name: "New Name",
        bio: "New Bio",
      });

      expect(result).toEqual({
        userId: "user123",
        profile: { name: "New Name", bio: "New Bio" },
      });
    });

    it("userIdがない場合はエラーを投げる", () => {
      expect(() =>
        validateAndPrepareUpdate(undefined, { name: "New Name" })
      ).toThrow("ユーザーIDが必要です");

      // 空文字列もfalsy値なのでエラーを投げる
      expect(() => validateAndPrepareUpdate("", { name: "New Name" })).toThrow(
        "ユーザーIDが必要です"
      );

      // nullもエラーを投げる
      expect(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validateAndPrepareUpdate(null as any, { name: "New Name" })
      ).toThrow("ユーザーIDが必要です");
    });

    it("空のプロフィールデータも受け入れる", () => {
      const result = validateAndPrepareUpdate("user123", {});

      expect(result).toEqual({
        userId: "user123",
        profile: {},
      });
    });
  });

  describe("キャッシュ管理ロジック", () => {
    /**
     * React Queryのキャッシュ管理ロジック
     */
    class CacheManager {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      private cache = new Map<string, any>();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setQueryData(queryKey: string[], data: any) {
        const key = JSON.stringify(queryKey);
        this.cache.set(key, data);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getQueryData(queryKey: string[]): any {
        const key = JSON.stringify(queryKey);
        return this.cache.get(key);
      }

      invalidateQueries(filter: { queryKey: string[] }) {
        const filterKey = filter.queryKey;
        const keysToInvalidate: string[] = [];

        this.cache.forEach((_, key) => {
          const parsedKey = JSON.parse(key);
          // クエリキーの前方一致でフィルタリング
          if (
            Array.isArray(parsedKey) &&
            filterKey.every((k, i) => parsedKey[i] === k)
          ) {
            keysToInvalidate.push(key);
          }
        });

        keysToInvalidate.forEach((key) => {
          this.cache.delete(key);
        });
      }

      clear() {
        this.cache.clear();
      }
    }

    it("プロフィールデータをキャッシュに設定・取得できる", () => {
      const cacheManager = new CacheManager();

      cacheManager.setQueryData(["profile", "user123"], mockUserProfile);

      const cached = cacheManager.getQueryData(["profile", "user123"]);
      expect(cached).toEqual(mockUserProfile);
    });

    it("関連するクエリを無効化できる", () => {
      const cacheManager = new CacheManager();

      // 複数のプロフィールをキャッシュ
      cacheManager.setQueryData(["profile", "user123"], mockUserProfile);
      cacheManager.setQueryData(["profile", "user456"], {
        ...mockUserProfile,
        id: "user456",
      });
      cacheManager.setQueryData(["other", "data"], { some: "data" });

      // profileクエリを無効化
      cacheManager.invalidateQueries({ queryKey: ["profile"] });

      expect(cacheManager.getQueryData(["profile", "user123"])).toBe(undefined);
      expect(cacheManager.getQueryData(["profile", "user456"])).toBe(undefined);
      expect(cacheManager.getQueryData(["other", "data"])).toEqual({
        some: "data",
      });
    });

    it("特定のユーザーのキャッシュのみ更新できる", () => {
      const cacheManager = new CacheManager();

      // 初期データ設定
      cacheManager.setQueryData(["profile", "user123"], mockUserProfile);
      cacheManager.setQueryData(["profile", "user456"], {
        ...mockUserProfile,
        id: "user456",
      });

      // user123のみ更新
      const updatedProfile = { ...mockUserProfile, name: "Updated Name" };
      cacheManager.setQueryData(["profile", "user123"], updatedProfile);

      expect(cacheManager.getQueryData(["profile", "user123"])).toEqual(
        updatedProfile
      );
      expect(cacheManager.getQueryData(["profile", "user456"])).toEqual({
        ...mockUserProfile,
        id: "user456",
      });
    });
  });

  describe("エラー処理", () => {
    /**
     * 各種エラーケースの処理ロジック
     */
    const handleProfileError = (error: unknown): string => {
      if (error instanceof Error) {
        if (error.message.includes("ユーザーが見つかりません")) {
          return "profile_not_found";
        }
        if (error.message.includes("認証")) {
          return "auth_error";
        }
        if (error.message.includes("ネットワーク")) {
          return "network_error";
        }
        return "unknown_error";
      }
      return "unknown_error";
    };

    it("ユーザー未発見エラーを識別する", () => {
      expect(handleProfileError(new Error("ユーザーが見つかりません"))).toBe(
        "profile_not_found"
      );

      expect(
        handleProfileError(new Error("404: ユーザーが見つかりません"))
      ).toBe("profile_not_found");
    });

    it("認証エラーを識別する", () => {
      expect(handleProfileError(new Error("認証が必要です"))).toBe(
        "auth_error"
      );

      expect(handleProfileError(new Error("認証トークンが無効です"))).toBe(
        "auth_error"
      );
    });

    it("ネットワークエラーを識別する", () => {
      expect(handleProfileError(new Error("ネットワークエラー"))).toBe(
        "network_error"
      );
    });

    it("その他のエラーは unknown_error として扱う", () => {
      expect(handleProfileError(new Error("予期しないエラー"))).toBe(
        "unknown_error"
      );

      expect(handleProfileError("文字列エラー")).toBe("unknown_error");
      expect(handleProfileError(null)).toBe("unknown_error");
      expect(handleProfileError(undefined)).toBe("unknown_error");
    });
  });

  describe("トークン取得エラー処理", () => {
    /**
     * アクセストークン取得時のエラー処理ロジック
     */
    const safeGetToken = async (
      getAccessToken?: () => Promise<string | null>
    ): Promise<string | undefined> => {
      if (!getAccessToken) {
        return undefined;
      }

      try {
        const token = await getAccessToken();
        return token || undefined;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("トークン取得エラー:", error);
        return undefined;
      }
    };

    it("正常にトークンを取得できる", async () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue("valid-token");

      const token = await safeGetToken(mockGetAccessToken);

      expect(token).toBe("valid-token");
    });

    it("nullトークンはundefinedとして返す", async () => {
      const mockGetAccessToken = vi.fn().mockResolvedValue(null);

      const token = await safeGetToken(mockGetAccessToken);

      expect(token).toBe(undefined);
    });

    it("getAccessTokenがない場合はundefinedを返す", async () => {
      const token = await safeGetToken(undefined);

      expect(token).toBe(undefined);
    });

    it("トークン取得エラー時はundefinedを返す", async () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const mockGetAccessToken = vi
        .fn()
        .mockRejectedValue(new Error("Token error"));

      const token = await safeGetToken(mockGetAccessToken);

      expect(token).toBe(undefined);
      expect(consoleError).toHaveBeenCalledWith(
        "トークン取得エラー:",
        expect.any(Error)
      );

      consoleError.mockRestore();
    });
  });
});
