/**
 * 認証関連の型定義
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export interface LogoutHandler {
  (): Promise<void>;
}
