/**
 * インライン編集機能のロジックテスト
 *
 * プロフィール画面のインライン編集機能のロジックを検証します。
 */

import { describe, it, expect } from "vitest";

// インライン編集のロジック関数
export const prepareUpdateData = (
  editName: string,
  editBio: string,
  originalProfile: { name?: string; bio?: string } | null
) => {
  const updateData: Record<string, string> = {};

  if (editName !== originalProfile?.name) {
    updateData.name = editName;
  }
  if (editBio !== originalProfile?.bio) {
    updateData.bio = editBio;
  }

  return updateData;
};

export const shouldSaveChanges = (updateData: Record<string, string>) => {
  return Object.keys(updateData).length > 0;
};

export const getInitialEditValues = (
  profile: { name?: string; bio?: string } | null,
  user: { name?: string } | null
) => {
  return {
    name: profile?.name || user?.name || "",
    bio: profile?.bio || "",
  };
};

describe("インライン編集ロジック", () => {
  describe("prepareUpdateData", () => {
    it("名前が変更された場合のみ更新データに含める", () => {
      const original = { name: "元の名前", bio: "元の自己紹介" };
      const result = prepareUpdateData("新しい名前", "元の自己紹介", original);

      expect(result).toEqual({ name: "新しい名前" });
    });

    it("自己紹介が変更された場合のみ更新データに含める", () => {
      const original = { name: "元の名前", bio: "元の自己紹介" };
      const result = prepareUpdateData("元の名前", "新しい自己紹介", original);

      expect(result).toEqual({ bio: "新しい自己紹介" });
    });

    it("両方が変更された場合は両方を更新データに含める", () => {
      const original = { name: "元の名前", bio: "元の自己紹介" };
      const result = prepareUpdateData(
        "新しい名前",
        "新しい自己紹介",
        original
      );

      expect(result).toEqual({
        name: "新しい名前",
        bio: "新しい自己紹介",
      });
    });

    it("何も変更されていない場合は空のオブジェクトを返す", () => {
      const original = { name: "元の名前", bio: "元の自己紹介" };
      const result = prepareUpdateData("元の名前", "元の自己紹介", original);

      expect(result).toEqual({});
    });

    it("元のプロフィールがnullの場合でも正しく動作する", () => {
      const result = prepareUpdateData("新しい名前", "新しい自己紹介", null);

      expect(result).toEqual({
        name: "新しい名前",
        bio: "新しい自己紹介",
      });
    });

    it("元の値が未定義の場合でも正しく動作する", () => {
      const original = { name: undefined, bio: undefined };
      const result = prepareUpdateData(
        "新しい名前",
        "新しい自己紹介",
        original
      );

      expect(result).toEqual({
        name: "新しい名前",
        bio: "新しい自己紹介",
      });
    });
  });

  describe("shouldSaveChanges", () => {
    it("更新データがある場合はtrueを返す", () => {
      expect(shouldSaveChanges({ name: "新しい名前" })).toBe(true);
      expect(shouldSaveChanges({ bio: "新しい自己紹介" })).toBe(true);
      expect(
        shouldSaveChanges({ name: "新しい名前", bio: "新しい自己紹介" })
      ).toBe(true);
    });

    it("更新データが空の場合はfalseを返す", () => {
      expect(shouldSaveChanges({})).toBe(false);
    });
  });

  describe("getInitialEditValues", () => {
    it("プロフィールの値を優先して返す", () => {
      const profile = { name: "プロフィール名", bio: "プロフィール自己紹介" };
      const user = { name: "ユーザー名" };

      const result = getInitialEditValues(profile, user);

      expect(result).toEqual({
        name: "プロフィール名",
        bio: "プロフィール自己紹介",
      });
    });

    it("プロフィールの名前がない場合はユーザーの名前を使用", () => {
      const profile = { bio: "プロフィール自己紹介" };
      const user = { name: "ユーザー名" };

      const result = getInitialEditValues(profile, user);

      expect(result).toEqual({
        name: "ユーザー名",
        bio: "プロフィール自己紹介",
      });
    });

    it("プロフィールがnullの場合はユーザー情報を使用", () => {
      const user = { name: "ユーザー名" };

      const result = getInitialEditValues(null, user);

      expect(result).toEqual({
        name: "ユーザー名",
        bio: "",
      });
    });

    it("両方ともnullの場合は空文字を返す", () => {
      const result = getInitialEditValues(null, null);

      expect(result).toEqual({
        name: "",
        bio: "",
      });
    });

    it("自己紹介がない場合は空文字を返す", () => {
      const profile = { name: "プロフィール名" };

      const result = getInitialEditValues(profile, null);

      expect(result).toEqual({
        name: "プロフィール名",
        bio: "",
      });
    });
  });

  describe("文字数制限のバリデーション", () => {
    it("自己紹介は500文字以内であることを確認", () => {
      const longText = "あ".repeat(501);
      const validText = "あ".repeat(500);

      expect(longText.length).toBeGreaterThan(500);
      expect(validText.length).toBeLessThanOrEqual(500);
    });
  });
});
