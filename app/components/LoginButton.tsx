import { useState } from "react";
import { Alert } from "react-native";
import { Button, Spinner } from "tamagui";
import { useAuth0 } from "react-native-auth0";

interface LoginButtonProps {
  onError?: (error: Error) => void;
}

/**
 * ログインボタンコンポーネント。
 * Auth0を使用して認証を行います。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.onError - エラー発生時のコールバック関数
 * @returns ログインボタンのReactコンポーネント
 */
export const LoginButton = ({ onError }: LoginButtonProps = {}) => {
  const { authorize } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async () => {
    try {
      setIsLoading(true);
      await authorize();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Login failed:", error);

      // Show user-friendly error message
      const errorMessage =
        error instanceof Error
          ? error.message
          : "ログインに失敗しました。もう一度お試しください。";

      Alert.alert("ログインエラー", errorMessage, [
        { text: "OK", style: "default" },
      ]);

      // Propagate error to parent if handler provided
      if (onError) {
        onError(error instanceof Error ? error : new Error(errorMessage));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onPress={onPress}
      disabled={isLoading}
      theme="blue"
      size="$4"
      icon={isLoading ? () => <Spinner size="small" /> : undefined}
    >
      {isLoading ? "ログイン中..." : "ログイン"}
    </Button>
  );
};
