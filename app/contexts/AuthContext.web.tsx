import React, { createContext, useContext, ReactNode } from "react";
import { useAuth0, UseAuth0Result } from "../utils/auth/useAuth0";

interface AuthContextData extends UseAuth0Result {}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

/**
 * Webプラットフォーム用の認証プロバイダーコンポーネント
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth0 = useAuth0();

  return <AuthContext.Provider value={auth0}>{children}</AuthContext.Provider>;
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
