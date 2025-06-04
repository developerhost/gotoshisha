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
  const { user, isLoading, authorize, clearSession, error } = useAuth0();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const login = async () => {
    try {
      await authorize();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Login error:", e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Logout error:", e);
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
        error,
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
