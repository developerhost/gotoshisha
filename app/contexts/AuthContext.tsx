import React, { createContext, useContext, ReactNode } from "react";
import { useAuth0 as useAuth0Native } from "react-native-auth0";
import { UseAuth0Result } from "../utils/auth/useAuth0";
import { UserInfo } from "../utils/auth/types";

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

  // Convert react-native-auth0 user to our UserInfo type
  const convertedUser: UserInfo | null = user
    ? {
        sub: user.sub || "",
        name: user.name,
        given_name: user.givenName,
        family_name: user.familyName,
        middle_name: user.middleName,
        nickname: user.nickname,
        preferred_username: user.preferredUsername,
        profile: user.profile,
        picture: user.picture,
        website: user.website,
        email: user.email,
        email_verified: user.emailVerified,
        gender: user.gender,
        birthdate: user.birthdate,
        zoneinfo: user.zoneinfo,
        locale: user.locale,
        phone_number: user.phoneNumber,
        phone_number_verified: user.phoneNumberVerified,
        // Note: react-native-auth0 returns address as string, not object
        address: user.address ? undefined : undefined,
        updated_at: user.updatedAt,
      }
    : null;

  const authContextValue: AuthContextData = {
    user: convertedUser,
    isLoading,
    isAuthenticated: !!user,
    error,
    login: async () => {
      try {
        await authorize();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("ログインエラー:", err);
        throw err;
      }
    },
    logout: async () => {
      try {
        await clearSession();
      } catch (err) {
        // eslint-disable-next-line no-console
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
