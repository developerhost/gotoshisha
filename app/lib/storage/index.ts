/**
 * クロスプラットフォーム対応のストレージ抽象化レイヤー
 */
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Logger } from "../../utils/logger";

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
  Logger.debug("createStorage: Platform.OS =", Platform.OS);
  if (Platform.OS === "web") {
    return {
      async setItem(key: string, value: string): Promise<void> {
        Logger.debug(`storage.setItem (web): ${key} =`, value);
        localStorage.setItem(key, value);
      },
      async getItem(key: string): Promise<string | null> {
        const result = localStorage.getItem(key);
        Logger.debug(`storage.getItem (web): ${key} =`, result);
        return result;
      },
      async removeItem(key: string): Promise<void> {
        Logger.debug(`storage.removeItem (web): ${key}`);
        localStorage.removeItem(key);
      },
    };
  } else {
    return {
      async setItem(key: string, value: string): Promise<void> {
        Logger.debug(`storage.setItem (native): ${key} =`, value);
        await SecureStore.setItemAsync(key, value);
      },
      async getItem(key: string): Promise<string | null> {
        try {
          Logger.debug(`storage.getItem (native): Attempting to get ${key}`);

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

          Logger.debug(`storage.getItem (native): ${key} =`, result);
          return result;
        } catch (error) {
          Logger.error(
            `storage.getItem (native): Error getting ${key}:`,
            error
          );
          return null;
        }
      },
      async removeItem(key: string): Promise<void> {
        Logger.debug(`storage.removeItem (native): ${key}`);
        await SecureStore.deleteItemAsync(key);
      },
    };
  }
}

/**
 * 統一されたストレージインスタンス
 * 遅延初期化により、テスト時のプラットフォーム切り替えに対応
 */
let _storage: StorageInterface | null = null;

export const storage: StorageInterface = {
  async setItem(key: string, value: string): Promise<void> {
    if (!_storage) _storage = createStorage();
    return _storage.setItem(key, value);
  },
  async getItem(key: string): Promise<string | null> {
    if (!_storage) _storage = createStorage();
    return _storage.getItem(key);
  },
  async removeItem(key: string): Promise<void> {
    if (!_storage) _storage = createStorage();
    return _storage.removeItem(key);
  },
};

/**
 * テスト用: ストレージインスタンスをリセット
 */
export function resetStorageForTesting(): void {
  _storage = null;
}

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
      Logger.error(`Failed to save object to storage (${key}):`, error);
      throw error;
    }
  }

  /**
   * JSONからオブジェクトを読み込み
   */
  static async getObject<T>(key: string): Promise<T | null> {
    Logger.debug(`StorageHelper.getObject: Getting key ${key}`);
    try {
      const value = await storage.getItem(key);
      Logger.debug(`StorageHelper.getObject: Raw value for ${key}:`, value);
      const result = value ? JSON.parse(value) : null;
      Logger.debug(`StorageHelper.getObject: Parsed result for ${key}:`, result);
      return result;
    } catch (error) {
      Logger.error(`Failed to load object from storage (${key}):`, error);
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
      Logger.error(`Failed to save boolean to storage (${key}):`, error);
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
      Logger.error(`Failed to load boolean from storage (${key}):`, error);
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
      Logger.error(`Failed to check key existence (${key}):`, error);
      return false;
    }
  }
}
