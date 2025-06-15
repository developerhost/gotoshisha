import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { AuthStorage, AUTH_STORAGE_KEYS, AuthTokens } from "./storage";

// 依存関係のモック
vi.mock("react-native", () => ({
  Platform: {
    OS: "web",
  },
}));

vi.mock("expo-secure-store", () => ({
  setItemAsync: vi.fn(),
  getItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
}));

describe("AuthStorage", () => {
  const mockTokens: AuthTokens = {
    accessToken: "test-access-token",
    user: {
      sub: "test-user-id",
      name: "Test User",
      email: "test@example.com",
    },
  };

  beforeEach(() => {
    // すべてのモックをクリア
    vi.clearAllMocks();

    // localStorageをクリア
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  });

  describe("Webプラットフォーム", () => {
    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Platform as any).OS = "web";
    });

    describe("save", () => {
      it("localStorageにトークンを保存できる", async () => {
        const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

        await AuthStorage.save(mockTokens);

        expect(setItemSpy).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.TOKEN,
          mockTokens.accessToken
        );
        expect(setItemSpy).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(mockTokens.user)
        );
      });
    });

    describe("load", () => {
      it("localStorageからトークンを読み込める", async () => {
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, mockTokens.accessToken);
        localStorage.setItem(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(mockTokens.user)
        );

        const result = await AuthStorage.load();

        expect(result).toEqual(mockTokens);
      });

      it("トークンが見つからない場合はnullを返す", async () => {
        const result = await AuthStorage.load();
        expect(result).toBeNull();
      });

      it("ユーザーデータが不正なJSONの場合はnullを返す", async () => {
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, mockTokens.accessToken);
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, "invalid-json");

        const result = await AuthStorage.load();
        expect(result).toBeNull();
      });
    });

    describe("clear", () => {
      it("localStorageからトークンを削除できる", async () => {
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, mockTokens.accessToken);
        localStorage.setItem(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(mockTokens.user)
        );

        await AuthStorage.clear();

        expect(localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)).toBeNull();
        expect(localStorage.getItem(AUTH_STORAGE_KEYS.USER)).toBeNull();
      });
    });

    describe("hasTokens", () => {
      it("トークンが存在する場合はtrueを返す", async () => {
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, mockTokens.accessToken);
        localStorage.setItem(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(mockTokens.user)
        );

        const result = await AuthStorage.hasTokens();
        expect(result).toBe(true);
      });

      it("トークンが存在しない場合はfalseを返す", async () => {
        const result = await AuthStorage.hasTokens();
        expect(result).toBe(false);
      });
    });
  });

  describe("ネイティブプラットフォーム", () => {
    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Platform as any).OS = "ios";
    });

    describe("save", () => {
      it("SecureStoreにトークンを保存できる", async () => {
        await AuthStorage.save(mockTokens);

        expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.TOKEN,
          mockTokens.accessToken
        );
        expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.USER,
          JSON.stringify(mockTokens.user)
        );
      });
    });

    describe("load", () => {
      it("SecureStoreからトークンを読み込める", async () => {
        vi.mocked(SecureStore.getItemAsync)
          .mockResolvedValueOnce(mockTokens.accessToken)
          .mockResolvedValueOnce(JSON.stringify(mockTokens.user));

        const result = await AuthStorage.load();

        expect(result).toEqual(mockTokens);
        expect(SecureStore.getItemAsync).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.TOKEN
        );
        expect(SecureStore.getItemAsync).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.USER
        );
      });

      it("トークンが見つからない場合はnullを返す", async () => {
        vi.mocked(SecureStore.getItemAsync).mockResolvedValue(null);

        const result = await AuthStorage.load();
        expect(result).toBeNull();
      });
    });

    describe("clear", () => {
      it("SecureStoreからトークンを削除できる", async () => {
        await AuthStorage.clear();

        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.TOKEN
        );
        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(
          AUTH_STORAGE_KEYS.USER
        );
      });
    });
  });
});