/**
 * マップエラー状態の表示コンポーネント
 */
import { YStack, Text, Button } from "tamagui";
import type { MapErrorViewProps } from "../types";

export function MapErrorView({
  error,
  locationError,
  canRequestPermission,
  latitude,
  longitude,
  retryLocationRequest,
  openSettings: _openSettings,
}: MapErrorViewProps) {
  // 位置情報もフォールバック位置も取得できない場合のみエラー表示
  if (!error || (latitude !== null && longitude !== null)) {
    return null;
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
      <Text fontSize="$5" color="$red10" textAlign="center" marginBottom="$3">
        {locationError
          ? "位置情報の取得に失敗しました"
          : "店舗データの取得に失敗しました"}
      </Text>
      <Text fontSize="$3" color="$gray10" textAlign="center" marginBottom="$4">
        {typeof error === "string" ? error : error.message}
        {locationError && !canRequestPermission && (
          <Text fontSize="$3" color="$gray10">
            {"\n"}設定で権限を許可してアプリに戻ると、自動的に再試行されます。
          </Text>
        )}
      </Text>
      {locationError && (
        <Button
          backgroundColor="$blue10"
          color="white"
          onPress={retryLocationRequest}
        >
          位置情報を再取得
        </Button>
      )}
    </YStack>
  );
}
