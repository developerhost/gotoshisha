import { useEffect, useState, useCallback } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import type { Region } from "react-native-maps";
import { useLocation } from "./useLocation";
import { useNearbyShops, useShops, useMapShopsCollection } from "./useShops";
import type { Shop } from "../types/api";

/**
 * アセットのプリロードとキャッシュ
 * https://docs.expo.dev/archive/classic-updates/preloading-and-caching-assets/#pre-loading-and-caching-assets
 */
function cacheImages() {
  return [require("../assets/images/pin.png")].map((image) => {
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
    canRequestPermission 
  } = useLocation();

  // マップ移動による店舗収集フック
  const { 
    collectedShops, 
    collectShopsFromArea, 
    setInitialShops 
  } = useMapShopsCollection();

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
    if (isReady && !latitude && !longitude && !locationLoading && !hasRequestedLocation) {
      setHasRequestedLocation(true);
      requestLocation();
    }
  }, [isReady, latitude, longitude, locationLoading, hasRequestedLocation, requestLocation]);

  // 位置情報が正常に取得されたらhasRequestedLocationをリセット
  useEffect(() => {
    if (latitude && longitude && !locationLoading) {
      setHasRequestedLocation(false);
    }
  }, [latitude, longitude, locationLoading]);

  // 権限が許可されてエラー状態から回復した場合の自動再取得
  useEffect(() => {
    if (isReady && !locationLoading && !hasRequestedLocation && 
        !latitude && !longitude && !locationError) {
      // エラーが解消されて位置情報がまだない場合は自動再取得
      setHasRequestedLocation(true);
      requestLocation();
    }
  }, [isReady, locationLoading, hasRequestedLocation, latitude, longitude, locationError, requestLocation]);

  // 初期店舗データを収集データに設定
  useEffect(() => {
    const initialShops = (latitude && longitude) ? nearbyShopsData?.shops : fallbackShopsData?.shops;
    if (initialShops && initialShops.length > 0) {
      setInitialShops(initialShops);
    }
  }, [nearbyShopsData, fallbackShopsData, latitude, longitude, setInitialShops]);

  // ズームレベルに基づいて適切な検索半径を計算
  const calculateSearchRadius = useCallback((region: Region) => {
    // latitudeDeltaから半径を推定（1度 ≈ 111km）
    const viewportKm = region.latitudeDelta * 111;
    
    // ビューポートの半分程度を検索範囲とし、最小5km、最大5000kmに制限
    // 5000kmあれば大陸レベルの検索が可能
    const radius = Math.max(5, Math.min(5000, viewportKm * 0.6));
    
    return Math.round(radius);
  }, []);

  // マップ領域変更時のコールバック
  const handleRegionChangeComplete = useCallback(async (region: Region) => {
    const radius = calculateSearchRadius(region);
    setCurrentRegion(region);
    // ズームレベルに応じた範囲で店舗データを収集
    await collectShopsFromArea(region.latitude, region.longitude, radius);
  }, [calculateSearchRadius, collectShopsFromArea]);

  // 位置情報再取得用の関数
  const retryLocationRequest = useCallback(() => {
    setHasRequestedLocation(false);
    requestLocation();
  }, [requestLocation]);

  // ローディング状態の統合
  const isLoading = !isReady || locationLoading || nearbyLoading || fallbackLoading;
  const error = locationError || nearbyError || fallbackError;

  // 店舗データの選択（収集された店舗データを優先）
  const shops = collectedShops.length > 0 ? collectedShops : 
    ((latitude && longitude) ? nearbyShopsData?.shops : fallbackShopsData?.shops) || [];

  // 店舗データの安全性チェック
  const validShops = shops.filter((shop: Shop) => 
    shop && 
    typeof shop === 'object' && 
    shop.id && 
    shop.name && 
    shop.address &&
    shop.latitude !== null && 
    shop.longitude !== null
  );

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
    hasLocationPermission: !!(latitude && longitude),
    isUsingCollectedShops: collectedShops.length > 0,
  };
}
