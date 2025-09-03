/**
 * マップ画面のメインコンポーネント
 * リファクタリング後: 責任分割により保守性向上
 */
import { useEffect, useState } from "react";
import { YStack } from "tamagui";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useMapState } from "../features/map/useMapState";
import { ShopCarousel } from "../features/shop/ShopCarousel";
import { TabBar } from "../components/TabBar";
import { findNearestShop } from "../utils/distance";
import { MapLoadingView } from "../features/map/components/MapLoadingView";
import { MapErrorView } from "../features/map/components/MapErrorView";
import { MapContainer } from "../features/map/components/MapContainer";
import type { Shop } from "../types/api";

export default function MapScreen() {
  const [selectedShopIndex, setSelectedShopIndex] = useState<number>(0);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // マップ状態管理フック
  const {
    latitude,
    longitude,
    locationError,
    canRequestPermission,
    retryLocationRequest,
    openSettings,
    handleRegionChangeComplete,
    shops,
    isReady,
    isLoading,
    error,
    hasLocationPermission,
    isUsingCollectedShops,
    // デバッグ用
    locationLoading,
    nearbyLoading,
    fallbackLoading,
    nearbyShopsCount,
    fallbackShopsCount,
    nearbyFetching,
    nearbySuccess,
    fallbackFetching,
    fallbackSuccess,
    hasRequestedLocation,
  } = useMapState();

  // useEffectは必要な処理のため例外的に使用
  // 理由: 認証状態の変化とルーティングの同期のため
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/routes/login");
    }
  }, [isAuthenticated, router]);

  // 店舗リストが更新されたら最寄りの店舗を選択
  // useEffectは必要な処理のため例外的に使用
  // 理由: 店舗データと位置情報の変化に応じた初期選択のため
  useEffect(() => {
    if (shops.length > 0 && latitude && longitude) {
      const nearestShop = findNearestShop(latitude, longitude, shops);
      if (nearestShop) {
        const index = shops.findIndex((shop) => shop.id === nearestShop.id);
        if (index !== -1 && index !== selectedShopIndex) {
          setSelectedShopIndex(index);
        }
      }
    } else if (shops.length > 0 && selectedShopIndex >= shops.length) {
      // 選択中のインデックスが範囲外の場合は0にリセット
      setSelectedShopIndex(0);
    }
  }, [shops, latitude, longitude]); // selectedShopIndexは依存配列から除外してループを防ぐ

  /**
   * カルーセルからの店舗変更を処理
   */
  const handleShopChange = (index: number) => {
    setSelectedShopIndex(index);
  };

  /**
   * ピンタップ時の処理
   */
  const handleMarkerPress = (shop: Shop) => {
    const index = shops.findIndex((s) => s.id === shop.id);
    if (index !== -1) {
      setSelectedShopIndex(index);
    }
  };

  // ローディング中またはアセットの準備中
  if (isLoading) {
    return (
      <MapLoadingView
        isReady={isReady}
        locationLoading={locationLoading}
        nearbyLoading={nearbyLoading}
        fallbackLoading={fallbackLoading}
        nearbyFetching={nearbyFetching}
        fallbackFetching={fallbackFetching}
        nearbySuccess={nearbySuccess}
        fallbackSuccess={fallbackSuccess}
        hasRequestedLocation={hasRequestedLocation}
        hasLocationPermission={hasLocationPermission}
        latitude={latitude}
        longitude={longitude}
        nearbyShopsCount={nearbyShopsCount}
        fallbackShopsCount={fallbackShopsCount}
      />
    );
  }

  // エラーハンドリング（致命的エラーのみ）
  const errorView = (
    <MapErrorView
      error={error}
      locationError={locationError}
      canRequestPermission={canRequestPermission}
      latitude={latitude}
      longitude={longitude}
      retryLocationRequest={retryLocationRequest}
      openSettings={openSettings}
    />
  );

  if (errorView && error && !latitude && !longitude) {
    return errorView;
  }

  return (
    <YStack flex={1}>
      {/* マップ領域 */}
      <YStack flex={1}>
        <MapContainer
          latitude={latitude}
          longitude={longitude}
          shops={shops}
          selectedShopIndex={selectedShopIndex}
          user={user}
          error={error}
          locationError={locationError}
          canRequestPermission={canRequestPermission}
          hasLocationPermission={hasLocationPermission}
          isUsingCollectedShops={isUsingCollectedShops}
          onRegionChangeComplete={handleRegionChangeComplete}
          onMarkerPress={handleMarkerPress}
          logout={logout}
          retryLocationRequest={retryLocationRequest}
          openSettings={openSettings}
        />

        {/* 店舗カルーセル領域 - マップの上に重ねて表示 */}
        {shops.length > 0 && (
          <YStack
            position="absolute"
            bottom={200}
            left={0}
            right={0}
            height={100}
            backgroundColor="$background"
            paddingTop="$3"
            paddingBottom="$2"
            borderTopWidth={1}
            borderTopColor="$borderColor"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: -2 }}
            shadowOpacity={0.1}
            shadowRadius={8}
            elevation={5}
          >
            <ShopCarousel
              shops={shops}
              selectedShopIndex={selectedShopIndex}
              onShopChange={handleShopChange}
            />
          </YStack>
        )}
      </YStack>

      {/* タブバー */}
      <TabBar user={user} />
    </YStack>
  );
}
