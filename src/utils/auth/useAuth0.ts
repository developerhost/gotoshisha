import { useState, useEffect, useCallback } from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
  ResponseType,
  AuthSessionResult,
} from "expo-auth-session";
import { auth0Config } from "../../config/auth0";
import { AuthStorage } from "./storage";
import { Auth0Api } from "./auth0Api";
import { UserInfo } from "./types";

export interface UseAuth0Result {
  user: UserInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: Error | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Auth0認証用のカスタムフック
 */
export function useAuth0(): UseAuth0Result {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // リダイレクトURIの設定
  const redirectUri = makeRedirectUri({
    scheme: auth0Config.scheme,
    path: "redirect",
  });

  // Auth0エンドポイントの自動検出
  const discovery = useAutoDiscovery(`https://${auth0Config.domain}`);

  // 認証リクエストの設定
  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0Config.clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
      responseType: ResponseType.Code,
      extraParams: {
        audience: `https://${auth0Config.domain}/api/v2/`,
      },
    },
    discovery
  );

  /**
   * 保存された認証データを読み込み
   */
  const loadStoredAuth = useCallback(async () => {
    try {
      const tokens = await AuthStorage.load();
      if (tokens) {
        if (!tokens.accessToken || !tokens.user) {
          // eslint-disable-next-line no-console
          console.warn("Invalid stored tokens, clearing storage");
          await AuthStorage.clear();
          return;
        }
        setUser(tokens.user);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("保存された認証情報の読み込みに失敗:", err);
      // Clear potentially corrupted storage
      await AuthStorage.clear();
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 認証成功時の処理
   */
  const handleAuthSuccess = useCallback(async (accessToken: string) => {
    try {
      const userInfo = await Auth0Api.getUserInfo(accessToken);
      await AuthStorage.save({ accessToken, user: userInfo });
      setUser(userInfo);
      setError(null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("認証成功処理に失敗:", err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 認証レスポンスの処理
   */
  useEffect(() => {
    if (!response) return;

    const handleResponse = async (authResponse: AuthSessionResult) => {
      if (authResponse.type === "success") {
        // For Authorization Code flow, we need to exchange the code for tokens
        if (!authResponse.params.code) {
          setError(new Error("認証レスポンスに認可コードが含まれていません"));
          setIsLoading(false);
          return;
        }

        try {
          // Exchange authorization code for tokens
          const tokenResponse = await Auth0Api.exchangeCodeForToken(
            authResponse.params.code,
            redirectUri,
            authResponse.params.code_verifier || ""
          );

          if (!tokenResponse.access_token) {
            throw new Error(
              "トークン交換レスポンスにアクセストークンが含まれていません"
            );
          }

          await handleAuthSuccess(tokenResponse.access_token);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("トークン交換に失敗:", err);
          setError(err as Error);
          setIsLoading(false);
        }
      } else if (authResponse.type === "error") {
        setError(
          new Error(authResponse.error?.message || "認証に失敗しました")
        );
        setIsLoading(false);
      } else if (authResponse.type === "cancel") {
        setIsLoading(false);
      }
    };

    handleResponse(response);
  }, [response, handleAuthSuccess, redirectUri]);

  /**
   * 認証状態の初期化
   */
  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  /**
   * ログイン関数
   */
  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await promptAsync();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("ログインエラー:", err);
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  }, [promptAsync]);

  /**
   * ログアウト関数
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await AuthStorage.clear();
      setUser(null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("ログアウトエラー:", err);
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
  };
}