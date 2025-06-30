/**
 * ホーム画面コンポーネント
 * 認証状態を管理し、適切な画面を表示する
 */
import { SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./contexts/AuthContext.web";
import { useEffect, useCallback, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { AppHeader } from "./components/AppHeader";
import { MainContent } from "./components/MainContent";
import { Tutorial } from "./components/Tutorial";
import { isTutorialCompleted } from "./utils/tutorial/storage";
import type { LogoutHandler } from "./types/auth";

export default function HomeScreen() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/routes/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const checkTutorialStatus = async () => {
      if (isAuthenticated && !isLoading) {
        const completed = await isTutorialCompleted();
        setShowTutorial(!completed);
      }
    };

    checkTutorialStatus();
  }, [isAuthenticated, isLoading]);

  const handleLogout: LogoutHandler = useCallback(async () => {
    try {
      await logout();
      router.replace("/routes/login");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout error:", error);
    }
  }, [logout, router]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

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
      <Tutorial visible={showTutorial} onComplete={handleTutorialComplete} />
    </SafeAreaView>
  );
}
