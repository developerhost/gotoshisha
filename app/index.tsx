/**
 * メインエントリーポイント
 * 認証状態を確認してホームページにリダイレクト
 */
import { useRouter } from "expo-router";
import { useAuth } from "./contexts/AuthContext.web";
import { useEffect, useCallback, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { AppHeader } from "./components/AppHeader";
import { MainContent } from "./components/MainContent";
import { Tutorial } from "./components/Tutorial";
import { isTutorialCompleted } from "./utils/tutorial/storage";
import type { LogoutHandler } from "./types/auth";
import { SafeAreaView } from "react-native";
const { logout } = useAuth();

export default function IndexScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // 認証済みの場合はホームページに遷移
        router.replace("/routes/home");
      } else {
        // 未認証の場合はログインページに遷移
        router.replace("/routes/login");
      }
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
