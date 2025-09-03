import { useEffect, useState, useCallback } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import type { Region } from "react-native-maps";
import { useLocation } from "../../hooks/useLocation";
import {
  useNearbyShops,
  useShops,
  useMapShopsCollection,
} from "../shop/useShops";
import type { Shop } from "../../types/api";

/**
 * 店舗データの検証
 */
export const validateShop = (shop: unknown): shop is Shop => {
  return !!(
    shop &&
    typeof shop === "object" &&
    shop !== null &&
    "id" in shop &&
    "name" in shop &&
    "address" in shop &&
    "latitude" in shop &&
    "longitude" in shop &&
    (shop as Shop).id &&
    (shop as Shop).name &&
    (shop as Shop).address &&
    (shop as Shop).latitude !== null &&
    (shop as Shop).longitude !== null
  );
};

/**
 * 店舗データ配列のフィルタリング
 */
const filterValidShopsLocal = (shops: unknown[]): Shop[] => {
  return shops.filter((shop): shop is Shop => validateShop(shop));
};

/**
 * ズームレベルに基づいて適切な検索半径を計算
 */
const calculateSearchRadiusLocal = (region: Region) => {
  // latitudeDeltaから半径を推定（1度 ≈ 111km）
  const viewportKm = region.latitudeDelta * 111;

  // ビューポートの半分程度を検索範囲とし、最小5km、最大5000kmに制限
  // 5000kmあれば大陸レベルの検索が可能
  const radius = Math.max(5, Math.min(5000, viewportKm * 0.6));

  return Math.round(radius);
};

/**
 * ローディング状態の統合
 */
const combineLoadingStateLocal = (
  isReady: boolean,
  locationLoading: boolean,
  nearbyLoading: boolean,
  fallbackLoading: boolean
): boolean => {
  return !isReady || locationLoading || nearbyLoading || fallbackLoading;
};

/**
 * 店舗データの選択（収集された店舗データを優先）
 */
const selectShopsLocal = (
  collectedShops: Shop[],
  latitude: number | null,
  longitude: number | null,
  nearbyShops: Shop[] | undefined,
  fallbackShops: Shop[] | undefined
): Shop[] => {
  if (collectedShops.length > 0) {
    return collectedShops;
  }

  if (latitude && longitude && nearbyShops) {
    return nearbyShops;
  }

  return fallbackShops || [];
};

/**
 * 位置情報権限の有無を判定
 */
const hasLocationPermissionLocal = (
  latitude: number | null,
  longitude: number | null
): boolean => {
  return latitude !== null && longitude !== null;
};

/**
 * アセットのプリロードとキャッシュ
 * https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets
 */
function cacheImages() {
  return [require("../../../assets/icon.png")].map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export function useMapState() {
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 位置情報を取得
  const {
    latitude,
    longitude,
    error: locationError,
    isLoading: locationLoading,
    requestLocation,
    openSettings,
    canRequestPermission,
  } = useLocation();

  // マップ移動による店舗収集フック
  const { collectedShops, collectShopsFromArea, setInitialShops } =
    useMapShopsCollection();

  // 近くの店舗データを取得（常に呼び出し、有効性はenabledで制御）
  const {
    data: nearbyShopsData,
    isLoading: nearbyLoading,
    error: nearbyError,
    isFetching: nearbyFetching,
    isSuccess: nearbySuccess,
  } = useNearbyShops(
    latitude ?? undefined,
    longitude ?? undefined,
    20, // 初期は20km半径で検索
    { limit: 100 }
  );

  // フォールバック用：位置情報がない場合の店舗データ（常に呼び出し）
  const {
    data: fallbackShopsData,
    isLoading: fallbackLoading,
    error: fallbackError,
    isFetching: fallbackFetching,
    isSuccess: fallbackSuccess,
  } = useShops({
    limit: 100,
  });

  // アセットの準備
  useEffect(() => {
    (async () => {
      await Promise.all([...cacheImages()]);
      setIsReady(true);
    })();
  }, []);

  // 位置情報を自動取得
  useEffect(() => {
    if (
      isReady &&
      !latitude &&
      !longitude &&
      !locationLoading &&
      !hasRequestedLocation
    ) {
      setHasRequestedLocation(true);
      requestLocation();
    }
  }, [
    isReady,
    latitude,
    longitude,
    locationLoading,
    hasRequestedLocation,
    requestLocation,
  ]);

  // 位置情報が正常に取得されたらhasRequestedLocationをリセット
  useEffect(() => {
    if (latitude && longitude && !locationLoading) {
      setHasRequestedLocation(false);
    }
  }, [latitude, longitude, locationLoading]);

  // 権限が許可されてエラー状態から回復した場合の自動再取得
  useEffect(() => {
    if (
      isReady &&
      !locationLoading &&
      !hasRequestedLocation &&
      !latitude &&
      !longitude &&
      !locationError
    ) {
      // エラーが解消されて位置情報がまだない場合は自動再取得
      setHasRequestedLocation(true);
      requestLocation();
    }
  }, [
    isReady,
    locationLoading,
    hasRequestedLocation,
    latitude,
    longitude,
    locationError,
    requestLocation,
  ]);

  // 初期店舗データを収集データに設定
  useEffect(() => {
    const initialShops =
      latitude && longitude ? nearbyShopsData?.shops : fallbackShopsData?.shops;
    if (initialShops && initialShops.length > 0) {
      setInitialShops(initialShops);
    }
  }, [
    nearbyShopsData,
    fallbackShopsData,
    latitude,
    longitude,
    setInitialShops,
  ]);

  // ズームレベルに基づいて適切な検索半径を計算
  const calculateRadius = useCallback((region: Region) => {
    return calculateSearchRadiusLocal(region);
  }, []);

  // マップ領域変更時のコールバック
  const handleRegionChangeComplete = useCallback(
    async (region: Region) => {
      const radius = calculateRadius(region);
      setCurrentRegion(region);
      // ズームレベルに応じた範囲で店舗データを収集
      await collectShopsFromArea(region.latitude, region.longitude, radius);
    },
    [calculateRadius, collectShopsFromArea]
  );

  // 位置情報再取得用の関数
  const retryLocationRequest = useCallback(() => {
    setHasRequestedLocation(false);
    requestLocation();
  }, [requestLocation]);

  // ローディング状態の統合
  const isLoading = combineLoadingStateLocal(
    isReady,
    locationLoading,
    nearbyLoading,
    fallbackLoading
  );
  const error = locationError || nearbyError || fallbackError;

  // 店舗データの選択（収集された店舗データを優先）
  const shops = selectShopsLocal(
    collectedShops,
    latitude,
    longitude,
    nearbyShopsData?.shops,
    fallbackShopsData?.shops
  );

  // 店舗データの安全性チェック
  const validShops = filterValidShopsLocal(shops);

  return {
    // 位置情報関連
    latitude,
    longitude,
    locationError,
    canRequestPermission,
    retryLocationRequest,
    openSettings,

    // マップ関連
    currentRegion,
    handleRegionChangeComplete,

    // 店舗データ関連
    shops: validShops,
    collectedShops,

    // 状態
    isReady,
    isLoading,
    error,

    // デバッグ用の詳細状態
    locationLoading,
    nearbyLoading,
    fallbackLoading,
    nearbyShopsCount: nearbyShopsData?.shops?.length || 0,
    fallbackShopsCount: fallbackShopsData?.shops?.length || 0,
    nearbyFetching,
    nearbySuccess,
    fallbackFetching,
    fallbackSuccess,
    hasRequestedLocation,

    // メタ情報
    hasLocationPermission: hasLocationPermissionLocal(latitude, longitude),
    isUsingCollectedShops: collectedShops.length > 0,
  };
}
