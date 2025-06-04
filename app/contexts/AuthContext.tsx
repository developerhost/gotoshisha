import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "react-native-auth0";

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, authorize, clearSession, error } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<Error | null>(null);

  useEffect(() => {
    // 初期化処理
    const checkAuth = async () => {
      try {
        // Auth0は自動的にセッションを復元しないため、
        // 初回は未認証として扱う
        setIsAuthenticated(false);
        setIsLoading(false);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Auth check error:", e);
        setAuthError(e as Error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await authorize();
      setIsLoading(false);
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
      await clearSession();
      setIsAuthenticated(false);
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
        isAuthenticated,
        login,
        logout,
        error: authError || error,
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
