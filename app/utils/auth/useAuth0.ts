import { useState, useEffect, useCallback } from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
  ResponseType,
  AuthSessionResult,
} from "expo-auth-session";
import * as AuthSession from "expo-auth-session";
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
  getAccessToken: () => Promise<string | null>;
}

/**
 * Auth0認証用のカスタムフック
 */
export function useAuth0(): UseAuth0Result {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [codeVerifier, setCodeVerifier] = useState<string | undefined>();

  // リダイレクトURIの設定
  const redirectUri = makeRedirectUri({
    scheme: auth0Config.scheme,
    path: "redirect",
  });

  // Auth0エンドポイントの自動検出
  const discovery = useAutoDiscovery(`https://${auth0Config.domain}`);

  // 認証リクエストの設定
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0Config.clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
      responseType: ResponseType.Code,
      extraParams: {
        audience: `https://${auth0Config.domain}/api/v2/`,
      },
      usePKCE: true, // PKCEを明示的に有効化
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
          // Ensure we have a valid discovery
          if (!discovery) {
            throw new Error("Auth0ディスカバリーが完了していません");
          }

          // Ensure we have a valid request for PKCE
          if (!request) {
            throw new Error("認証リクエストが見つかりません");
          }

          // Use saved codeVerifier
          const verifier = codeVerifier || request?.codeVerifier;

          if (!verifier) {
            throw new Error("PKCE code_verifierが利用できません");
          }

          // Exchange authorization code for tokens using expo-auth-session
          const tokenResponse = await AuthSession.exchangeCodeAsync(
            {
              clientId: auth0Config.clientId,
              redirectUri,
              code: authResponse.params.code,
              extraParams: {
                code_verifier: verifier,
              },
            },
            discovery
          );

          if (!tokenResponse.accessToken) {
            throw new Error(
              "トークン交換レスポンスにアクセストークンが含まれていません"
            );
          }

          await handleAuthSuccess(tokenResponse.accessToken);
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
  }, [
    response,
    handleAuthSuccess,
    redirectUri,
    request,
    discovery,
    codeVerifier,
  ]);

  /**
   * 認証状態の初期化
   */
  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  /**
   * requestが更新されたときにcodeVerifierを保存
   */
  useEffect(() => {
    if (request?.codeVerifier) {
      setCodeVerifier(request.codeVerifier);
    }
  }, [request]);

  /**
   * ログイン関数
   */
  const login = useCallback(async () => {
    try {
      // リクエストが準備できているか確認
      if (!request) {
        throw new Error("認証リクエストが準備できていません");
      }

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
  }, [promptAsync, request]);

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

  /**
   * アクセストークンを取得
   */
  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const tokens = await AuthStorage.load();
      return tokens?.accessToken || null;
    } catch (err) {
      console.error("アクセストークン取得エラー:", err);
      return null;
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
    getAccessToken,
  };
}
