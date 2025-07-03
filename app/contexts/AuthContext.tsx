import React, { createContext, useContext, ReactNode } from "react";
import { Platform } from "react-native";
import { useAuth0, UseAuth0Result } from "../features/auth/useAuth0";

interface AuthContextData extends UseAuth0Result {}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

/**
 * Web版認証プロバイダー
 */
const WebAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // eslint-disable-next-line no-console
  console.log("WebAuthProvider: Initializing");
  const auth0 = useAuth0();
  // eslint-disable-next-line no-console
  console.log("WebAuthProvider: Auth0 data:", auth0);
  return <AuthContext.Provider value={auth0}>{children}</AuthContext.Provider>;
};

/**
 * ネイティブ版認証プロバイダー
 */
const NativeAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line no-console
  console.log("NativeAuthProvider: Initializing with custom useAuth0");

  // カスタムuseAuth0フックを使用（Web版と同じ）
  const auth0 = useAuth0();
  // eslint-disable-next-line no-console
  console.log("NativeAuthProvider: Custom useAuth0 result:", auth0);

  return <AuthContext.Provider value={auth0}>{children}</AuthContext.Provider>;
};

/**
 * クロスプラットフォーム対応の認証プロバイダーコンポーネント
 * 全プラットフォーム: カスタムuseAuth0フック（expo-auth-session）を使用
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line no-console
  console.log("AuthProvider: Platform.OS =", Platform.OS);

  // プラットフォーム分岐
  if (Platform.OS === "web") {
    return <WebAuthProvider>{children}</WebAuthProvider>;
  }

  return <NativeAuthProvider>{children}</NativeAuthProvider>;
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
