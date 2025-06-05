import React, { createContext, useContext, ReactNode } from "react";
import { useAuth0 as useAuth0Native } from "react-native-auth0";
import { UseAuth0Result } from "../utils/auth/useAuth0";

interface AuthContextData extends UseAuth0Result {}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

/**
 * ネイティブプラットフォーム用の認証プロバイダーコンポーネント
 * expo-auth-sessionの代わりにreact-native-auth0を使用
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, authorize, clearSession, error, isLoading } = useAuth0Native();

  const authContextValue: AuthContextData = {
    user: user
      ? {
          sub: user.sub || "",
          ...user,
        }
      : null,
    isLoading,
    isAuthenticated: !!user,
    error,
    login: async () => {
      try {
        await authorize();
      } catch (err) {
        console.error("ログインエラー:", err);
        throw err;
      }
    },
    logout: async () => {
      try {
        await clearSession();
      } catch (err) {
        console.error("ログアウトエラー:", err);
        throw err;
      }
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 認証コンテキストにアクセスするためのフック
 * @throws AuthProviderの外で使用された場合エラー
 */
export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthはAuthProvider内で使用してください");
  }
  return context;
};
