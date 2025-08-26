import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { YStack, Text, Button, Spinner, XStack } from "tamagui";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { SHINJUKU_COORDINATE } from "../constants/location";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useMapState } from "../features/map/useMapState";
import { ShopCarousel } from "../features/shop/ShopCarousel";
import { TabBar } from "../components/TabBar";
import { findNearestShop } from "../utils/distance";
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
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
        <Text marginTop="$3" fontSize="$4">
          {!isReady
            ? "地図を準備中..."
            : locationLoading
            ? `位置情報を取得中... (requested: ${hasRequestedLocation})`
            : nearbyLoading || nearbyFetching
            ? `近くの店舗を検索中... (${latitude?.toFixed(
                4
              )}, ${longitude?.toFixed(4)})`
            : fallbackLoading || fallbackFetching
            ? "店舗データを読み込み中..."
            : hasLocationPermission && !nearbySuccess
            ? "位置情報データ待機中..."
            : !hasLocationPermission && !fallbackSuccess
            ? "店舗データ待機中..."
            : `データを処理中... (nearby: ${nearbyShopsCount}, fallback: ${fallbackShopsCount})`}
        </Text>
      </YStack>
    );
  }

  // エラーハンドリング（致命的エラーのみ）
  if (error && !latitude && !longitude) {
    // 位置情報もフォールバック位置も取得できない場合のみエラー表示
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text fontSize="$5" color="$red10" textAlign="center" marginBottom="$3">
          {locationError
            ? "位置情報の取得に失敗しました"
            : "店舗データの取得に失敗しました"}
        </Text>
        <Text
          fontSize="$3"
          color="$gray10"
          textAlign="center"
          marginBottom="$4"
        >
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

  // マップの初期カメラ位置（現在位置または新宿）
  const initialCamera = {
    center:
      latitude && longitude ? { latitude, longitude } : SHINJUKU_COORDINATE,
    zoom: 13,
    heading: 0,
    pitch: 0,
  };

  return (
    <YStack flex={1}>
      {/* マップ領域 */}
      <YStack flex={1}>
        {Platform.OS === "web" ? (
          // Web版ではMapViewの代わりにプレースホルダーを表示
          <YStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            backgroundColor="$gray3"
          >
            <Text fontSize="$6" fontWeight="600" marginBottom="$4">
              🗺️ マップ機能
            </Text>
            <Text
              fontSize="$4"
              color="$gray10"
              textAlign="center"
              marginBottom="$4"
            >
              Web版ではマップ機能はサポートされていません。
            </Text>
            <Text fontSize="$3" color="$gray9" textAlign="center">
              モバイルアプリでご利用ください。
            </Text>
          </YStack>
        ) : (
          <MapView
            style={{ flex: 1 }}
            initialCamera={initialCamera}
            provider={
              Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
            }
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            {/* 店舗のピンを表示 */}
            {shops.map((shop: Shop, index: number) => (
              <Marker
                key={shop.id}
                coordinate={{
                  latitude: shop.latitude!,
                  longitude: shop.longitude!,
                }}
                icon={require("../assets/images/pin.png")}
                anchor={{ x: 0.5, y: 1 }}
                onPress={() => handleMarkerPress(shop)}
                opacity={index === selectedShopIndex ? 1.0 : 0.7}
                zIndex={index === selectedShopIndex ? 1000 : 0}
              />
            ))}
          </MapView>
        )}

        {user && (
          <YStack
            position="absolute"
            top={60}
            right={20}
            backgroundColor="$backgroundTransparent"
            padding="$3"
            borderRadius="$3"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <Text fontSize="$3" marginBottom="$2">
              ようこそ、{user.name || user.email}!
            </Text>
            <Button
              size="$3"
              backgroundColor="$red10"
              onPress={logout}
              pressStyle={{ opacity: 0.8 }}
            >
              <Text color="white" fontSize="$3" fontWeight="500">
                ログアウト
              </Text>
            </Button>
          </YStack>
        )}

        {/* 位置情報状態メッセージ */}
        {error && (
          <YStack
            position="absolute"
            top={60}
            left={20}
            backgroundColor="$orange3"
            padding="$3"
            borderRadius="$3"
            borderWidth={1}
            borderColor="$orange8"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
            maxWidth="70%"
          >
            <Text fontSize="$2" color="$orange11" textAlign="left">
              {typeof error === "string" ? error : error.message}
              {locationError && !canRequestPermission && (
                <Text fontSize="$2" color="$gray10">
                  {"\n"}
                  設定で権限を許可してアプリに戻ると、自動的に再試行されます。
                </Text>
              )}
            </Text>
            {locationError && (
              <XStack gap="$2" marginTop="$2">
                {canRequestPermission ? (
                  <Button
                    size="$2"
                    backgroundColor="$orange8"
                    onPress={retryLocationRequest}
                  >
                    <Text color="white" fontSize="$2">
                      再試行
                    </Text>
                  </Button>
                ) : (
                  <Button
                    size="$2"
                    backgroundColor="$blue8"
                    onPress={openSettings}
                  >
                    <Text color="white" fontSize="$2">
                      設定で許可
                    </Text>
                  </Button>
                )}
              </XStack>
            )}
          </YStack>
        )}

        {/* 店舗数表示 */}
        <YStack
          position="absolute"
          top={60}
          left={20}
          backgroundColor="$backgroundTransparent"
          padding="$3"
          borderRadius="$3"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
        >
          <Text fontSize="$3" color="$gray12">
            📍 {shops.length}件の店舗を表示中
            {hasLocationPermission ? (
              <Text fontSize="$2" color="$gray10">
                {isUsingCollectedShops
                  ? "\n(マップ移動で収集した店舗を表示)"
                  : "\n(現在地から20km圏内)"}
              </Text>
            ) : (
              <Text fontSize="$2" color="$gray10">
                {"\n"}(全店舗表示中・位置情報なし)
              </Text>
            )}
          </Text>
        </YStack>

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
