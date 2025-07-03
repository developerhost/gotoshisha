/**
 * クロスプラットフォーム対応のストレージ抽象化レイヤー
 */
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

/**
 * ストレージインターフェース
 */
export interface StorageInterface {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
}

/**
 * プラットフォーム固有のストレージ実装を取得
 */
function createStorage(): StorageInterface {
  // eslint-disable-next-line no-console
  console.log("createStorage: Platform.OS =", Platform.OS);
  if (Platform.OS === "web") {
    return {
      async setItem(key: string, value: string): Promise<void> {
        // eslint-disable-next-line no-console
        console.log(`storage.setItem (web): ${key} =`, value);
        localStorage.setItem(key, value);
      },
      async getItem(key: string): Promise<string | null> {
        const result = localStorage.getItem(key);
        // eslint-disable-next-line no-console
        console.log(`storage.getItem (web): ${key} =`, result);
        return result;
      },
      async removeItem(key: string): Promise<void> {
        // eslint-disable-next-line no-console
        console.log(`storage.removeItem (web): ${key}`);
        localStorage.removeItem(key);
      },
    };
  } else {
    return {
      async setItem(key: string, value: string): Promise<void> {
        // eslint-disable-next-line no-console
        console.log(`storage.setItem (native): ${key} =`, value);
        await SecureStore.setItemAsync(key, value);
      },
      async getItem(key: string): Promise<string | null> {
        try {
          // eslint-disable-next-line no-console
          console.log(`storage.getItem (native): Attempting to get ${key}`);

          // タイムアウト付きでSecureStore.getItemAsyncを実行
          const timeoutPromise = new Promise<string | null>((_, reject) => {
            setTimeout(
              () => reject(new Error(`SecureStore timeout for key: ${key}`)),
              5000
            );
          });

          const result = await Promise.race([
            SecureStore.getItemAsync(key),
            timeoutPromise,
          ]);

          // eslint-disable-next-line no-console
          console.log(`storage.getItem (native): ${key} =`, result);
          return result;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            `storage.getItem (native): Error getting ${key}:`,
            error
          );
          return null;
        }
      },
      async removeItem(key: string): Promise<void> {
        // eslint-disable-next-line no-console
        console.log(`storage.removeItem (native): ${key}`);
        await SecureStore.deleteItemAsync(key);
      },
    };
  }
}

/**
 * 統一されたストレージインスタンス
 */
export const storage = createStorage();

/**
 * ストレージヘルパー関数
 */
export class StorageHelper {
  /**
   * オブジェクトをJSONとして保存
   */
  static async setObject<T>(key: string, value: T): Promise<void> {
    try {
      await storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to save object to storage (${key}):`, error);
      throw error;
    }
  }

  /**
   * JSONからオブジェクトを読み込み
   */
  static async getObject<T>(key: string): Promise<T | null> {
    // eslint-disable-next-line no-console
    console.log(`StorageHelper.getObject: Getting key ${key}`);
    try {
      const value = await storage.getItem(key);
      // eslint-disable-next-line no-console
      console.log(`StorageHelper.getObject: Raw value for ${key}:`, value);
      const result = value ? JSON.parse(value) : null;
      // eslint-disable-next-line no-console
      console.log(`StorageHelper.getObject: Parsed result for ${key}:`, result);
      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load object from storage (${key}):`, error);
      return null;
    }
  }

  /**
   * ブール値を保存
   */
  static async setBoolean(key: string, value: boolean): Promise<void> {
    try {
      await storage.setItem(key, value ? "true" : "false");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to save boolean to storage (${key}):`, error);
      throw error;
    }
  }

  /**
   * ブール値を読み込み
   */
  static async getBoolean(key: string): Promise<boolean> {
    try {
      const value = await storage.getItem(key);
      return value === "true";
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load boolean from storage (${key}):`, error);
      return false;
    }
  }

  /**
   * キーが存在するかチェック
   */
  static async hasKey(key: string): Promise<boolean> {
    try {
      const value = await storage.getItem(key);
      return value !== null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to check key existence (${key}):`, error);
      return false;
    }
  }
}
