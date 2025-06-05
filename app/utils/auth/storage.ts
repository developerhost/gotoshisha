import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export interface AuthTokens {
  accessToken: string;
  user: any;
}

export const AUTH_STORAGE_KEYS = {
  TOKEN: "auth0_token",
  USER: "auth0_user",
} as const;

/**
 * クロスプラットフォーム対応の認証トークンストレージユーティリティ
 */
export class AuthStorage {
  /**
   * 認証トークンを保存
   */
  static async save(tokens: AuthTokens): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, tokens.accessToken);
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(tokens.user));
    } else {
      await SecureStore.setItemAsync(
        AUTH_STORAGE_KEYS.TOKEN,
        tokens.accessToken
      );
      await SecureStore.setItemAsync(
        AUTH_STORAGE_KEYS.USER,
        JSON.stringify(tokens.user)
      );
    }
  }

  /**
   * 認証トークンを読み込み
   */
  static async load(): Promise<AuthTokens | null> {
    try {
      if (Platform.OS === "web") {
        const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
        const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER);

        if (!token || !userData) return null;

        return {
          accessToken: token,
          user: JSON.parse(userData),
        };
      } else {
        const token = await SecureStore.getItemAsync(AUTH_STORAGE_KEYS.TOKEN);
        const userData = await SecureStore.getItemAsync(AUTH_STORAGE_KEYS.USER);

        if (!token || !userData) return null;

        return {
          accessToken: token,
          user: JSON.parse(userData),
        };
      }
    } catch (error) {
      console.error("認証トークンの読み込みに失敗:", error);
      return null;
    }
  }

  /**
   * 認証トークンをクリア
   */
  static async clear(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    } else {
      await SecureStore.deleteItemAsync(AUTH_STORAGE_KEYS.TOKEN);
      await SecureStore.deleteItemAsync(AUTH_STORAGE_KEYS.USER);
    }
  }

  /**
   * トークンが存在するかチェック
   */
  static async hasTokens(): Promise<boolean> {
    const tokens = await AuthStorage.load();
    return tokens !== null;
  }
}
