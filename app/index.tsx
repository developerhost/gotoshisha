/**
 * ホーム画面コンポーネント
 * 認証状態を管理し、適切な画面を表示する
 */
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./contexts/AuthContext.web";
import { useEffect, useCallback } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { AppHeader } from "./components/AppHeader";
import { MainContent } from "./components/MainContent";
import type { LogoutHandler } from "./types/auth";

export default function HomeScreen() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/routes/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout: LogoutHandler = useCallback(async () => {
    try {
      await logout();
      router.replace("/routes/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout error:", error);
    }
  }, [logout, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader onLogout={handleLogout} />
      <MainContent />
    </SafeAreaView>
  );
}
