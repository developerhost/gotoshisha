/**
 * ストレージ抽象化レイヤーのテスト
 */
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { storage, StorageHelper, resetStorageForTesting } from "./index";

// Platform とモジュールをモック化
vi.mock("react-native", () => ({
  Platform: {
    OS: "web", // デフォルトはweb
  },
}));

vi.mock("expo-secure-store", () => ({
  getItemAsync: vi.fn(),
  setItemAsync: vi.fn(),
  deleteItemAsync: vi.fn(),
}));

// localStorageをモック化
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(global, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

describe("ストレージ抽象化レイヤー", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("Webプラットフォーム", () => {
    beforeEach(() => {
      vi.mocked(Platform).OS = "web";
      resetStorageForTesting();
    });

    describe("storage", () => {
      it("setItem - localStorageに値を保存できる", async () => {
        await storage.setItem("test-key", "test-value");

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "test-key",
          "test-value"
        );
      });

      it("getItem - localStorageから値を取得できる", async () => {
        mockLocalStorage.getItem.mockReturnValue("test-value");

        const result = await storage.getItem("test-key");

        expect(result).toBe("test-value");
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith("test-key");
      });

      it("removeItem - localStorageから値を削除できる", async () => {
        await storage.removeItem("test-key");

        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("test-key");
      });
    });

    describe("StorageHelper", () => {
      it("setObject - オブジェクトをJSONとして保存できる", async () => {
        const testObj = { name: "test", value: 123 };

        await StorageHelper.setObject("test-obj", testObj);

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "test-obj",
          JSON.stringify(testObj)
        );
      });

      it("getObject - JSONからオブジェクトを取得できる", async () => {
        const testObj = { name: "test", value: 123 };
        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(testObj));

        const result = await StorageHelper.getObject("test-obj");

        expect(result).toEqual(testObj);
      });

      it("setBoolean - ブール値を文字列として保存できる", async () => {
        await StorageHelper.setBoolean("test-bool", true);

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "test-bool",
          "true"
        );
      });

      it("getBoolean - 文字列からブール値を取得できる", async () => {
        mockLocalStorage.getItem.mockReturnValue("true");

        const result = await StorageHelper.getBoolean("test-bool");

        expect(result).toBe(true);
      });
    });
  });

  describe("ネイティブプラットフォーム", () => {
    beforeEach(() => {
      vi.mocked(Platform).OS = "ios";
      resetStorageForTesting();
    });

    describe("storage", () => {
      it("setItem - SecureStoreに値を保存できる", async () => {
        await storage.setItem("test-key", "test-value");

        expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
          "test-key",
          "test-value"
        );
      });

      it("getItem - SecureStoreから値を取得できる", async () => {
        vi.mocked(SecureStore.getItemAsync).mockResolvedValue("test-value");

        const result = await storage.getItem("test-key");

        expect(result).toBe("test-value");
        expect(SecureStore.getItemAsync).toHaveBeenCalledWith("test-key");
      });

      it("removeItem - SecureStoreから値を削除できる", async () => {
        await storage.removeItem("test-key");

        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("test-key");
      });
    });
  });
});

// 静的なモジュールエクスポートテスト
describe("モジュールエクスポート", () => {
  it("モジュールが正しくエクスポートされている", () => {
    expect(storage).toBeDefined();
    expect(StorageHelper).toBeDefined();
    expect(StorageHelper.setObject).toBeTypeOf("function");
    expect(StorageHelper.getObject).toBeTypeOf("function");
    expect(StorageHelper.setBoolean).toBeTypeOf("function");
    expect(StorageHelper.getBoolean).toBeTypeOf("function");
    expect(StorageHelper.hasKey).toBeTypeOf("function");
  });
});
