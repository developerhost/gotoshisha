/**
 * マップローディング状態の表示コンポーネント
 */
import { YStack, Text, Spinner } from "tamagui";
import type { MapLoadingViewProps } from "../types";

export function MapLoadingView({
  isReady,
  locationLoading,
  nearbyLoading,
  fallbackLoading,
  nearbyFetching,
  fallbackFetching,
  nearbySuccess,
  fallbackSuccess,
  hasRequestedLocation,
  hasLocationPermission,
  latitude,
  longitude,
  nearbyShopsCount,
  fallbackShopsCount,
}: MapLoadingViewProps) {
  const getLoadingMessage = () => {
    if (!isReady) {
      return "地図を準備中...";
    }
    if (locationLoading) {
      return `位置情報を取得中... (requested: ${hasRequestedLocation})`;
    }
    if (nearbyLoading || nearbyFetching) {
      return `近くの店舗を検索中... (${latitude?.toFixed(
        4
      )}, ${longitude?.toFixed(4)})`;
    }
    if (fallbackLoading || fallbackFetching) {
      return "店舗データを読み込み中...";
    }
    if (hasLocationPermission && !nearbySuccess) {
      return "位置情報データ待機中...";
    }
    if (!hasLocationPermission && !fallbackSuccess) {
      return "店舗データ待機中...";
    }
    return `データを処理中... (nearby: ${nearbyShopsCount}, fallback: ${fallbackShopsCount})`;
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      <Spinner size="large" color="$blue10" />
      <Text marginTop="$3" fontSize="$4">
        {getLoadingMessage()}
      </Text>
    </YStack>
  );
}
