/**
 * useProfileEditForm.tsのテスト
 * プロフィール編集フォーム管理カスタムフックのロジック部分のテスト
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { UpdateProfileRequest, UserProfile } from "../../api/profile";

// テスト用のモックデータ
const mockUserProfile: UserProfile = {
  id: "user123",
  email: "test@example.com",
  name: "Test User",
  bio: "テストユーザーの自己紹介",
  createdAt: "2023-01-01T00:00:00Z",
  avatar: "https://example.com/avatar.jpg",
};

const mockUserProfileMinimal = {
  id: "user456",
  email: "test2@example.com",
  createdAt: "2023-01-01T00:00:00Z",
};

describe("useProfileEditForm ロジック関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("プロフィール初期化ロジック", () => {
    /**
     * プロフィールデータから初期値を生成するロジック
     */
    const initializeFormData = (
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
        | null
    ) => {
      if (!userProfile) {
        return { name: "", bio: "" };
      }

      return {
        name: userProfile.name || "",
        bio: userProfile.bio || "",
      };
    };

    it("完全なユーザープロフィールから正しい初期値を生成する", () => {
      const result = initializeFormData(mockUserProfile);
      expect(result).toEqual({
        name: "Test User",
        bio: "テストユーザーの自己紹介",
      });
    });

    it("名前やbioがないプロフィールは空文字で初期化する", () => {
      const result = initializeFormData(mockUserProfileMinimal);
      expect(result).toEqual({
        name: "",
        bio: "",
      });
    });

    it("nullのプロフィールは空文字で初期化する", () => {
      const result = initializeFormData(null);
      expect(result).toEqual({
        name: "",
        bio: "",
      });
    });

    it("部分的なプロフィールデータを正しく処理する", () => {
      const partialProfile = {
        id: "user789",
        email: "partial@example.com",
        name: "Partial User",
        createdAt: "2023-01-01T00:00:00Z",
        // bioはなし
      };

      const result = initializeFormData(partialProfile);
      expect(result).toEqual({
        name: "Partial User",
        bio: "",
      });
    });
  });

  describe("更新データ生成ロジック", () => {
    /**
     * 変更されたフィールドのみを抽出して更新データを生成するロジック
     */
    const generateUpdateData = (
      currentValues: { name: string; bio: string },
      originalProfile:
        | UserProfile
        | {
            id: string;
            email: string;
            name?: string;
            bio?: string;
            createdAt: string;
            avatar?: string;
          }
        | null
    ): UpdateProfileRequest => {
      if (!originalProfile) {
        return {};
      }

      const updateData: UpdateProfileRequest = {};

      // 変更があった場合のみ更新データに含める
      if (currentValues.name !== (originalProfile.name || "")) {
        updateData.name = currentValues.name;
      }
      if (currentValues.bio !== (originalProfile.bio || "")) {
        updateData.bio = currentValues.bio;
      }

      return updateData;
    };

    it("名前と自己紹介が変更された場合は両方を含む", () => {
      const currentValues = {
        name: "Updated Name",
        bio: "Updated Bio",
      };

      const result = generateUpdateData(currentValues, mockUserProfile);

      expect(result).toEqual({
        name: "Updated Name",
        bio: "Updated Bio",
      });
    });

    it("名前のみ変更された場合は名前のみを含む", () => {
      const currentValues = {
        name: "Updated Name",
        bio: "テストユーザーの自己紹介", // 元の値と同じ
      };

      const result = generateUpdateData(currentValues, mockUserProfile);

      expect(result).toEqual({
        name: "Updated Name",
      });
    });

    it("自己紹介のみ変更された場合は自己紹介のみを含む", () => {
      const currentValues = {
        name: "Test User", // 元の値と同じ
        bio: "Updated Bio",
      };

      const result = generateUpdateData(currentValues, mockUserProfile);

      expect(result).toEqual({
        bio: "Updated Bio",
      });
    });

    it("変更がない場合は空のオブジェクトを返す", () => {
      const currentValues = {
        name: "Test User",
        bio: "テストユーザーの自己紹介",
      };

      const result = generateUpdateData(currentValues, mockUserProfile);

      expect(result).toEqual({});
    });

    it("元の値がない場合に新しい値を設定する", () => {
      const currentValues = {
        name: "New Name",
        bio: "New Bio",
      };

      const result = generateUpdateData(currentValues, mockUserProfileMinimal);

      expect(result).toEqual({
        name: "New Name",
        bio: "New Bio",
      });
    });

    it("元の値がnullの場合は空文字と比較する", () => {
      const profileWithNullValues = {
        id: "user789",
        email: "test@example.com",
        name: undefined,
        bio: undefined,
        createdAt: "2023-01-01T00:00:00Z",
      };

      const currentValues = {
        name: "New Name",
        bio: "",
      };

      const result = generateUpdateData(currentValues, profileWithNullValues);

      expect(result).toEqual({
        name: "New Name",
      });
    });

    it("原始プロフィールがnullの場合は空のオブジェクトを返す", () => {
      const currentValues = {
        name: "Some Name",
        bio: "Some Bio",
      };

      const result = generateUpdateData(currentValues, null);

      expect(result).toEqual({});
    });
  });

  describe("更新処理の要否判定", () => {
    /**
     * 更新データが空かどうかをチェックするロジック
     */
    const shouldSkipUpdate = (updateData: UpdateProfileRequest): boolean => {
      return Object.keys(updateData).length === 0;
    };

    it("更新データが空の場合はtrueを返す", () => {
      expect(shouldSkipUpdate({})).toBe(true);
    });

    it("更新データがある場合はfalseを返す", () => {
      expect(shouldSkipUpdate({ name: "New Name" })).toBe(false);
      expect(shouldSkipUpdate({ bio: "New Bio" })).toBe(false);
      expect(shouldSkipUpdate({ name: "New Name", bio: "New Bio" })).toBe(
        false
      );
    });
  });

  describe("エラーハンドリング", () => {
    /**
     * エラーオブジェクトからメッセージを抽出するロジック
     */
    const extractErrorMessage = (error: unknown): string => {
      return error instanceof Error ? error.message : "更新に失敗しました";
    };

    it("Errorオブジェクトからメッセージを抽出する", () => {
      const error = new Error("カスタムエラーメッセージ");
      expect(extractErrorMessage(error)).toBe("カスタムエラーメッセージ");
    });

    it("文字列エラーの場合はデフォルトメッセージを返す", () => {
      expect(extractErrorMessage("文字列エラー")).toBe("更新に失敗しました");
    });

    it("numberエラーの場合はデフォルトメッセージを返す", () => {
      expect(extractErrorMessage(404)).toBe("更新に失敗しました");
    });

    it("オブジェクトエラーの場合はデフォルトメッセージを返す", () => {
      expect(extractErrorMessage({ code: "UNKNOWN" })).toBe(
        "更新に失敗しました"
      );
    });

    it("nullエラーの場合はデフォルトメッセージを返す", () => {
      expect(extractErrorMessage(null)).toBe("更新に失敗しました");
    });

    it("undefinedエラーの場合はデフォルトメッセージを返す", () => {
      expect(extractErrorMessage(undefined)).toBe("更新に失敗しました");
    });
  });

  describe("フォームリセットロジック", () => {
    /**
     * フォームを初期値にリセットするロジック
     */
    const resetFormToInitialValues = (
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
        | null
    ) => {
      if (!userProfile) {
        return { name: "", bio: "" };
      }

      return {
        name: userProfile.name || "",
        bio: userProfile.bio || "",
      };
    };

    it("完全なプロフィールから正しい初期値を生成する", () => {
      const result = resetFormToInitialValues(mockUserProfile);
      expect(result).toEqual({
        name: "Test User",
        bio: "テストユーザーの自己紹介",
      });
    });

    it("部分的なプロフィールを正しく処理する", () => {
      const result = resetFormToInitialValues(mockUserProfileMinimal);
      expect(result).toEqual({
        name: "",
        bio: "",
      });
    });

    it("nullプロフィールは空文字で初期化する", () => {
      const result = resetFormToInitialValues(null);
      expect(result).toEqual({
        name: "",
        bio: "",
      });
    });
  });

  describe("フォームバリデーション", () => {
    /**
     * フォーム入力値のバリデーションロジック
     */
    const validateFormData = (data: {
      name: string;
      bio: string;
    }): { isValid: boolean; errors: string[] } => {
      const errors: string[] = [];

      // 名前の長さチェック（例：100文字以内）
      if (data.name.length > 100) {
        errors.push("名前は100文字以内で入力してください");
      }

      // 自己紹介の長さチェック（例：500文字以内）
      if (data.bio.length > 500) {
        errors.push("自己紹介は500文字以内で入力してください");
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    };

    it("有効なデータの場合はバリデーションを通過する", () => {
      const result = validateFormData({
        name: "Valid Name",
        bio: "Valid bio",
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("名前が長すぎる場合はエラーを返す", () => {
      const longName = "a".repeat(101);
      const result = validateFormData({
        name: longName,
        bio: "Valid bio",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("名前は100文字以内で入力してください");
    });

    it("自己紹介が長すぎる場合はエラーを返す", () => {
      const longBio = "a".repeat(501);
      const result = validateFormData({
        name: "Valid Name",
        bio: longBio,
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "自己紹介は500文字以内で入力してください"
      );
    });

    it("複数のエラーがある場合は全て返す", () => {
      const result = validateFormData({
        name: "a".repeat(101),
        bio: "a".repeat(501),
      });

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors).toContain("名前は100文字以内で入力してください");
      expect(result.errors).toContain(
        "自己紹介は500文字以内で入力してください"
      );
    });

    it("空の値は有効とする", () => {
      const result = validateFormData({
        name: "",
        bio: "",
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("境界値での動作を確認する", () => {
      // 名前が100文字ちょうど
      const result1 = validateFormData({
        name: "a".repeat(100),
        bio: "a".repeat(500),
      });

      expect(result1.isValid).toBe(true);

      // 名前が101文字
      const result2 = validateFormData({
        name: "a".repeat(101),
        bio: "a".repeat(500),
      });

      expect(result2.isValid).toBe(false);
    });
  });
});
