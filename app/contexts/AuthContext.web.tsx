import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
  ResponseType,
} from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { auth0Config } from "../config/auth0";

interface AuthContextData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AUTH_KEY = "auth0_token";
const USER_KEY = "auth0_user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<Error | null>(null);

  const redirectUri = makeRedirectUri({
    scheme: "gotoshisha",
    path: "redirect",
  });

  const discovery = useAutoDiscovery(`https://${auth0Config.domain}`);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: auth0Config.clientId,
      scopes: ["openid", "profile", "email", "offline_access"],
      redirectUri,
      responseType: ResponseType.Token,
      extraParams: {
        audience: `https://${auth0Config.domain}/api/v2/`,
      },
    },
    discovery
  );

  // トークンからユーザー情報を取得
  const getUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(`https://${auth0Config.domain}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to get user info:", error);
      throw error;
    }
  };

  // 初期化処理
  useEffect(() => {
    const loadAuth = async () => {
      try {
        if (Platform.OS === "web") {
          const token = localStorage.getItem(AUTH_KEY);
          const userData = localStorage.getItem(USER_KEY);
          if (token && userData) {
            setUser(JSON.parse(userData));
          }
        } else {
          const token = await SecureStore.getItemAsync(AUTH_KEY);
          const userData = await SecureStore.getItemAsync(USER_KEY);
          if (token && userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  // 認証レスポンスの処理
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      handleAuthSuccess(access_token);
    } else if (response?.type === "error") {
      setAuthError(
        new Error(response.error?.message || "Authentication failed")
      );
      setIsLoading(false);
    }
  }, [response]);

  const handleAuthSuccess = async (accessToken: string) => {
    try {
      const userInfo = await getUserInfo(accessToken);

      // トークンとユーザー情報を保存
      if (Platform.OS === "web") {
        localStorage.setItem(AUTH_KEY, accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      } else {
        await SecureStore.setItemAsync(AUTH_KEY, accessToken);
        await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userInfo));
      }

      setUser(userInfo);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to handle auth success:", error);
      setAuthError(error as Error);
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);

      const result = await promptAsync();

      if (result?.type === "cancel") {
        setIsLoading(false);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Login error:", e);
      setAuthError(e as Error);
      setIsLoading(false);
      throw e;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // ローカルストレージをクリア
      if (Platform.OS === "web") {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(USER_KEY);
      } else {
        await SecureStore.deleteItemAsync(AUTH_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
      }

      setUser(null);
      setIsLoading(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Logout error:", e);
      setIsLoading(false);
      throw e;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        error: authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
