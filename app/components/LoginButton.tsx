import { Button } from "react-native";
import { useAuth0 } from "react-native-auth0";

/**
 * ログインボタンコンポーネント。
 * Auth0を使用して認証を行います。
 *
 * @returns ログインボタンのReactコンポーネント
 */
export const LoginButton = () => {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />;
};
