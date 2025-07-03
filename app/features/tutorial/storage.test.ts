/**
 * チュートリアルストレージ機能のテスト
 */
// import { Platform } from "react-native"; // 現在未使用
import * as SecureStore from "expo-secure-store";
import {
  isTutorialCompleted,
  setTutorialCompleted,
  resetTutorialStatus,
} from "./storage";

// Platform とモジュールをモック化
vi.mock("react-native", () => ({
  Platform: {
    OS: "ios", // ネイティブテスト用
  },
}));

vi.mock("expo-secure-store", () => ({
  getItemAsync: vi.fn(),
  setItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
}));

// localStorage モック（Web用）
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("チュートリアルストレージ機能", () => {
  const mockGetItemAsync = vi.mocked(SecureStore.getItemAsync);
  const mockSetItemAsync = vi.mocked(SecureStore.setItemAsync);
  // const mockDeleteItemAsync = vi.mocked(SecureStore.deleteItemAsync); // 現在未使用

  beforeEach(() => {
    vi.clearAllMocks();
    // コンソールエラーをモック化してテスト出力をクリーンに保つ
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("isTutorialCompleted", () => {
    it("チュートリアルが完了済みの場合はtrueを返す", async () => {
      mockGetItemAsync.mockResolvedValue("true");

      const result = await isTutorialCompleted();

      expect(result).toBe(true);
      expect(mockGetItemAsync).toHaveBeenCalledWith("tutorial_completed");
    });

    it("チュートリアルが未完了の場合はfalseを返す", async () => {
      mockGetItemAsync.mockResolvedValue(null);

      const result = await isTutorialCompleted();

      expect(result).toBe(false);
      expect(mockGetItemAsync).toHaveBeenCalledWith("tutorial_completed");
    });

    it('値が"true"以外の文字列の場合はfalseを返す', async () => {
      mockGetItemAsync.mockResolvedValue("false");

      const result = await isTutorialCompleted();

      expect(result).toBe(false);
    });

    it("SecureStoreでエラーが発生した場合はfalseを返す", async () => {
      const mockError = new Error("SecureStore error");
      mockGetItemAsync.mockRejectedValue(mockError);

      const result = await isTutorialCompleted();

      expect(result).toBe(false);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        "Failed to load boolean from storage (tutorial_completed):",
        mockError
      );
    });
  });

  describe("setTutorialCompleted", () => {
    it("チュートリアル完了状態を正常に保存する", async () => {
      mockSetItemAsync.mockResolvedValue();

      await setTutorialCompleted();

      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "tutorial_completed",
        "true"
      );
    });

    it("SecureStoreでエラーが発生した場合はエラーログを出力する", async () => {
      const mockError = new Error("SecureStore save error");
      mockSetItemAsync.mockRejectedValue(mockError);

      await expect(setTutorialCompleted()).rejects.toThrow(
        "SecureStore save error"
      );

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        "Failed to save boolean to storage (tutorial_completed):",
        mockError
      );
    });
  });

  describe("resetTutorialStatus", () => {
    it("チュートリアル状態を正常にリセットする", async () => {
      await resetTutorialStatus();

      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "tutorial_completed",
        "false"
      );
    });

    it("SecureStoreでエラーが発生した場合はエラーログを出力する", async () => {
      const mockError = new Error("SecureStore save error");
      mockSetItemAsync.mockRejectedValue(mockError);

      await resetTutorialStatus();

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        "Failed to reset tutorial status:",
        mockError
      );
    });
  });

  describe("統合テストシナリオ", () => {
    it("初回起動からチュートリアル完了までの流れ", async () => {
      // 初回起動時 - チュートリアル未完了
      mockGetItemAsync.mockResolvedValue(null);
      const initialStatus = await isTutorialCompleted();
      expect(initialStatus).toBe(false);

      // チュートリアル完了
      mockSetItemAsync.mockResolvedValue();
      await setTutorialCompleted();
      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "tutorial_completed",
        "true"
      );

      // 次回起動時 - チュートリアル完了済み
      mockGetItemAsync.mockResolvedValue("true");
      const completedStatus = await isTutorialCompleted();
      expect(completedStatus).toBe(true);
    });

    it("デバッグ用リセット機能のテスト", async () => {
      // チュートリアル完了状態
      mockGetItemAsync.mockResolvedValue("true");
      const beforeReset = await isTutorialCompleted();
      expect(beforeReset).toBe(true);

      // リセット実行
      await resetTutorialStatus();
      expect(mockSetItemAsync).toHaveBeenCalledWith(
        "tutorial_completed",
        "false"
      );

      // リセット後 - 未完了状態
      mockGetItemAsync.mockResolvedValue(null);
      const afterReset = await isTutorialCompleted();
      expect(afterReset).toBe(false);
    });
  });
});
