import { storage, StorageHelper } from "../../lib/storage";
import { UserInfo } from "./types";
import { Logger } from "../../utils/logger";

export interface AuthTokens {
  accessToken: string;
  idToken?: string; // IDトークンを追加
  user: UserInfo;
}

export const AUTH_STORAGE_KEYS = {
  TOKEN: "auth0_token",
  ID_TOKEN: "auth0_id_token",
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
    if (!tokens.accessToken || !tokens.user) {
      throw new Error("Invalid tokens: accessToken and user are required");
    }

    await storage.setItem(AUTH_STORAGE_KEYS.TOKEN, tokens.accessToken);
    if (tokens.idToken) {
      await storage.setItem(AUTH_STORAGE_KEYS.ID_TOKEN, tokens.idToken);
    }
    await StorageHelper.setObject(AUTH_STORAGE_KEYS.USER, tokens.user);
  }

  /**
   * 認証トークンを読み込み
   */
  static async load(): Promise<AuthTokens | null> {
    const startTime = Date.now();

    try {
      const token = await storage.getItem(AUTH_STORAGE_KEYS.TOKEN);

      const idToken = await storage.getItem(AUTH_STORAGE_KEYS.ID_TOKEN);

      const user = await StorageHelper.getObject<UserInfo>(
        AUTH_STORAGE_KEYS.USER
      );

      if (!token || !user) {
        Logger.warn(
          `[${
            Date.now() - startTime
          }ms] AuthStorage.load: トークンまたはユーザー情報が見つかりません`
        );
        // トークンまたはユーザー情報がない場合はnullを返す
        return null;
      }

      return {
        accessToken: token,
        idToken: idToken || undefined,
        user,
      };
    } catch (error) {
      Logger.error(
        `[${Date.now() - startTime}ms] 認証トークンの読み込みに失敗:`,
        error
      );
      return null;
    }
  }

  /**
   * 認証トークンをクリア
   */
  static async clear(): Promise<void> {
    try {
      await storage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
      await storage.removeItem(AUTH_STORAGE_KEYS.ID_TOKEN);
      await storage.removeItem(AUTH_STORAGE_KEYS.USER);
    } catch (error) {
      Logger.error("認証データのクリアに失敗:", error);
      // Continue execution as clearing storage shouldn't block logout
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
