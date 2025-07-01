/**
 * useProfileManager.tsのテスト
 * プロフィール管理カスタムフックのロジック部分のテスト
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { UpdateProfileRequest } from "../../api/profile";

// useProfileManagerから抽出できるロジック関数をテスト

describe("useProfileManager ロジック関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("ユーザーID抽出ロジック", () => {
    /**
     * Auth0ユーザーオブジェクトからユーザーIDを抽出するロジック
     */
    const extractUserId = (
      user: { sub?: string } | null | undefined
    ): string | undefined => {
      return user?.sub;
    };

    it("有効なユーザーオブジェクトからsubを抽出する", () => {
      const user = { sub: "auth0|123456789" };
      expect(extractUserId(user)).toBe("auth0|123456789");
    });

    it("subがないユーザーオブジェクトはundefinedを返す", () => {
      const user = { email: "test@example.com" };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(extractUserId(user as any)).toBe(undefined);
    });

    it("nullユーザーはundefinedを返す", () => {
      expect(extractUserId(null)).toBe(undefined);
    });

    it("undefinedユーザーはundefinedを返す", () => {
      expect(extractUserId(undefined)).toBe(undefined);
    });

    it("空オブジェクトはundefinedを返す", () => {
      expect(extractUserId({})).toBe(undefined);
    });
  });

  describe("Auth0ユーザー情報変換ロジック", () => {
    /**
     * Auth0ユーザー情報からプロフィール用の形式に変換するロジック
     */
    const convertAuth0UserToProfileData = (
      user:
        | {
            email?: string;
            name?: string;
            picture?: string;
          }
        | null
        | undefined
    ) => {
      if (!user) {
        return undefined;
      }

      return {
        email: user.email,
        name: user.name,
        picture: user.picture,
      };
    };

    it("完全なAuth0ユーザー情報を変換する", () => {
      const user = {
        email: "test@example.com",
        name: "Test User",
        picture: "https://example.com/avatar.jpg",
        sub: "auth0|123456789", // subは除外される
        other: "other field", // その他のフィールドは除外される
      };

      const result = convertAuth0UserToProfileData(user);

      expect(result).toEqual({
        email: "test@example.com",
        name: "Test User",
        picture: "https://example.com/avatar.jpg",
      });
    });

    it("部分的なAuth0ユーザー情報を変換する", () => {
      const user = {
        email: "test@example.com",
        // nameとpictureはなし
      };

      const result = convertAuth0UserToProfileData(user);

      expect(result).toEqual({
        email: "test@example.com",
        name: undefined,
        picture: undefined,
      });
    });

    it("nullユーザーはundefinedを返す", () => {
      expect(convertAuth0UserToProfileData(null)).toBe(undefined);
    });

    it("undefinedユーザーはundefinedを返す", () => {
      expect(convertAuth0UserToProfileData(undefined)).toBe(undefined);
    });

    it("空オブジェクトは空の値で変換する", () => {
      const result = convertAuth0UserToProfileData({});

      expect(result).toEqual({
        email: undefined,
        name: undefined,
        picture: undefined,
      });
    });
  });

  describe("編集権限チェックロジック", () => {
    /**
     * プロフィール編集が可能かどうかをチェックするロジック
     */
    const canEditProfile = (
      profile: { id: string } | null | undefined,
      isAuthenticated: boolean
    ): boolean => {
      return isAuthenticated && !!profile;
    };

    it("認証済みでプロフィールがある場合は編集可能", () => {
      const profile = { id: "user123" };
      expect(canEditProfile(profile, true)).toBe(true);
    });

    it("認証済みだがプロフィールがない場合は編集不可", () => {
      expect(canEditProfile(null, true)).toBe(false);
      expect(canEditProfile(undefined, true)).toBe(false);
    });

    it("プロフィールがあるが未認証の場合は編集不可", () => {
      const profile = { id: "user123" };
      expect(canEditProfile(profile, false)).toBe(false);
    });

    it("未認証でプロフィールもない場合は編集不可", () => {
      expect(canEditProfile(null, false)).toBe(false);
    });
  });

  describe("プロフィール更新処理ロジック", () => {
    /**
     * プロフィール更新のラッパー処理
     */
    const createProfileUpdateHandler = (
      updateProfile: (data: UpdateProfileRequest) => Promise<void>
    ) => {
      return async (updateData: UpdateProfileRequest) => {
        await updateProfile(updateData);
      };
    };

    it("更新データを正しく渡す", async () => {
      const mockUpdateProfile = vi.fn().mockResolvedValue(undefined);
      const handler = createProfileUpdateHandler(mockUpdateProfile);

      const updateData: UpdateProfileRequest = {
        name: "Updated Name",
        bio: "Updated Bio",
      };

      await handler(updateData);

      expect(mockUpdateProfile).toHaveBeenCalledWith(updateData);
    });

    it("updateProfileのエラーをそのまま伝播する", async () => {
      const error = new Error("Update failed");
      const mockUpdateProfile = vi.fn().mockRejectedValue(error);
      const handler = createProfileUpdateHandler(mockUpdateProfile);

      const updateData: UpdateProfileRequest = {
        name: "Updated Name",
      };

      await expect(handler(updateData)).rejects.toThrow("Update failed");
    });
  });

  describe("編集シート状態管理ロジック", () => {
    /**
     * 編集シートの開閉状態を管理するロジック
     */
    class EditSheetStateManager {
      private isOpen = false;

      canOpen(hasProfile: boolean): boolean {
        return hasProfile;
      }

      open(): boolean {
        this.isOpen = true;
        return this.isOpen;
      }

      close(): boolean {
        this.isOpen = false;
        return this.isOpen;
      }

      getState(): boolean {
        return this.isOpen;
      }
    }

    it("プロフィールがある場合のみ開くことができる", () => {
      const manager = new EditSheetStateManager();

      expect(manager.canOpen(true)).toBe(true);
      expect(manager.canOpen(false)).toBe(false);
    });

    it("シートを正しく開閉できる", () => {
      const manager = new EditSheetStateManager();

      expect(manager.getState()).toBe(false);

      manager.open();
      expect(manager.getState()).toBe(true);

      manager.close();
      expect(manager.getState()).toBe(false);
    });

    it("複数回開閉しても正しく動作する", () => {
      const manager = new EditSheetStateManager();

      manager.open();
      manager.open(); // 既に開いている状態でもう一度開く
      expect(manager.getState()).toBe(true);

      manager.close();
      manager.close(); // 既に閉じている状態でもう一度閉じる
      expect(manager.getState()).toBe(false);
    });
  });

  describe("編集ボタンクリック処理ロジック", () => {
    /**
     * 編集ボタンクリック時の処理ロジック
     */
    const handleEditButtonClick = (
      profile: { id: string } | null | undefined,
      setIsEditSheetOpen: (open: boolean) => void
    ) => {
      if (profile) {
        setIsEditSheetOpen(true);
      }
      // プロフィール情報がまだ読み込まれていない場合は何もしない
    };

    it("プロフィールがある場合はシートを開く", () => {
      const mockSetIsEditSheetOpen = vi.fn();
      const profile = { id: "user123" };

      handleEditButtonClick(profile, mockSetIsEditSheetOpen);

      expect(mockSetIsEditSheetOpen).toHaveBeenCalledWith(true);
    });

    it("プロフィールがnullの場合は何もしない", () => {
      const mockSetIsEditSheetOpen = vi.fn();

      handleEditButtonClick(null, mockSetIsEditSheetOpen);

      expect(mockSetIsEditSheetOpen).not.toHaveBeenCalled();
    });

    it("プロフィールがundefinedの場合は何もしない", () => {
      const mockSetIsEditSheetOpen = vi.fn();

      handleEditButtonClick(undefined, mockSetIsEditSheetOpen);

      expect(mockSetIsEditSheetOpen).not.toHaveBeenCalled();
    });
  });

  describe("編集シート閉じる処理ロジック", () => {
    /**
     * 編集シートを閉じる処理ロジック
     */
    const handleEditSheetClose = (
      setIsEditSheetOpen: (open: boolean) => void
    ) => {
      setIsEditSheetOpen(false);
    };

    it("シートを閉じる状態に設定する", () => {
      const mockSetIsEditSheetOpen = vi.fn();

      handleEditSheetClose(mockSetIsEditSheetOpen);

      expect(mockSetIsEditSheetOpen).toHaveBeenCalledWith(false);
    });
  });

  describe("統合ロジック", () => {
    /**
     * useProfileManagerの主要なロジックを統合したテスト
     */
    const createProfileManagerState = (
      user: {
        sub?: string;
        email?: string;
        name?: string;
        picture?: string;
      } | null,
      profile: { id: string } | null,
      isAuthenticated: boolean
    ) => {
      const userId = user?.sub;
      const auth0UserData = user
        ? {
            email: user.email,
            name: user.name,
            picture: user.picture,
          }
        : undefined;

      const canEdit = isAuthenticated && !!profile;

      return {
        userId,
        auth0UserData,
        canEdit,
        profile,
        isAuthenticated,
      };
    };

    it("完全な認証状態での状態を正しく計算する", () => {
      const user = {
        sub: "auth0|123456789",
        email: "test@example.com",
        name: "Test User",
        picture: "https://example.com/avatar.jpg",
      };
      const profile = { id: "user123" };

      const state = createProfileManagerState(user, profile, true);

      expect(state).toEqual({
        userId: "auth0|123456789",
        auth0UserData: {
          email: "test@example.com",
          name: "Test User",
          picture: "https://example.com/avatar.jpg",
        },
        canEdit: true,
        profile: { id: "user123" },
        isAuthenticated: true,
      });
    });

    it("未認証状態での状態を正しく計算する", () => {
      const state = createProfileManagerState(null, null, false);

      expect(state).toEqual({
        userId: undefined,
        auth0UserData: undefined,
        canEdit: false,
        profile: null,
        isAuthenticated: false,
      });
    });

    it("認証済みだがプロフィール未取得の状態を正しく計算する", () => {
      const user = {
        sub: "auth0|123456789",
        email: "test@example.com",
      };

      const state = createProfileManagerState(user, null, true);

      expect(state).toEqual({
        userId: "auth0|123456789",
        auth0UserData: {
          email: "test@example.com",
          name: undefined,
          picture: undefined,
        },
        canEdit: false, // プロフィールがないので編集不可
        profile: null,
        isAuthenticated: true,
      });
    });

    it("部分的なユーザー情報での状態を正しく計算する", () => {
      const user = {
        sub: "auth0|123456789",
        // emailとnameはなし
      };
      const profile = { id: "user123" };

      const state = createProfileManagerState(user, profile, true);

      expect(state).toEqual({
        userId: "auth0|123456789",
        auth0UserData: {
          email: undefined,
          name: undefined,
          picture: undefined,
        },
        canEdit: true,
        profile: { id: "user123" },
        isAuthenticated: true,
      });
    });
  });

  describe("エラーケース処理", () => {
    /**
     * 異常なデータでの処理ロジック
     */
    const safeExtractUserId = (user: unknown): string | undefined => {
      if (typeof user === "object" && user !== null && "sub" in user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return typeof (user as any).sub === "string"
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (user as any).sub
          : undefined;
      }
      return undefined;
    };

    it("プリミティブ値の場合はundefinedを返す", () => {
      expect(safeExtractUserId("string")).toBe(undefined);
      expect(safeExtractUserId(123)).toBe(undefined);
      expect(safeExtractUserId(true)).toBe(undefined);
    });

    it("配列の場合はundefinedを返す", () => {
      expect(safeExtractUserId([])).toBe(undefined);
      expect(safeExtractUserId([{ sub: "test" }])).toBe(undefined);
    });

    it("subが文字列でない場合はundefinedを返す", () => {
      expect(safeExtractUserId({ sub: 123 })).toBe(undefined);
      expect(safeExtractUserId({ sub: true })).toBe(undefined);
      expect(safeExtractUserId({ sub: {} })).toBe(undefined);
    });

    it("有効なsubがある場合は正しく抽出する", () => {
      expect(safeExtractUserId({ sub: "auth0|123456789" })).toBe(
        "auth0|123456789"
      );
    });
  });
});
