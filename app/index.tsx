/**
 * メインエントリーポイント
 * 認証状態を確認してホームページにリダイレクト
 */
import { useRouter } from "expo-router";
import { useAuth } from "./contexts/AuthContext.web";
import { useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";

export default function IndexScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

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

  // 認証状態確認中はローディング画面を表示
  return <LoadingScreen />;
}
