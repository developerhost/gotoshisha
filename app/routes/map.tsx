import { useEffect, useState, useCallback } from "react";
import { Image } from "react-native";
import { YStack, Text, Button, Spinner, Sheet, XStack } from "tamagui";
import { Asset } from "expo-asset";
import MapView, { Marker, Region } from "react-native-maps";
import { SHINJUKU_COORDINATE } from "../constants/location";
import { useAuth } from "../contexts/AuthContext.web";
import { useRouter } from "expo-router";
import { useNearbyShops, useShops, useMapShopsCollection } from "../hooks/useShops";
import { useLocation } from "../hooks/useLocation";
import type { Shop } from "../types/api";

export default function MapScreen() {
  const [isReady, setIsReady] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // 位置情報を取得
  const { latitude, longitude, error: locationError, isLoading: locationLoading, requestLocation, openSettings, canRequestPermission } = useLocation();

  // マップ移動による店舗収集フック
  const { 
    collectedShops, 
    collectShopsFromArea, 
    setInitialShops 
  } = useMapShopsCollection();

  // 近くの店舗データを取得（常に呼び出し、有効性はenabledで制御）
  const { data: nearbyShopsData, isLoading: nearbyLoading, error: nearbyError } = useNearbyShops(
    latitude ?? undefined,
    longitude ?? undefined,
    20, // 初期は20km半径で検索
    { limit: 100 }
  );

  // フォールバック用：位置情報がない場合の店舗データ（常に呼び出し）
  const { data: fallbackShopsData, isLoading: fallbackLoading, error: fallbackError } = useShops({
    limit: 100,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/routes/login");
    }
  }, [isAuthenticated, router]);

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

  // 初期店舗データを収集データに設定
  useEffect(() => {
    const initialShops = (latitude && longitude) ? nearbyShopsData?.shops : fallbackShopsData?.shops;
    if (initialShops && initialShops.length > 0) {
      setInitialShops(initialShops);
    }
  }, [nearbyShopsData, fallbackShopsData, latitude, longitude, setInitialShops]);

  // ローディング状態の統合
  const isLoading = !isReady || locationLoading || nearbyLoading || fallbackLoading;
  const error = locationError || nearbyError || fallbackError;

  // 店舗データの選択（収集された店舗データを優先）
  const shops = collectedShops.length > 0 ? collectedShops : 
    ((latitude && longitude) ? nearbyShopsData?.shops : fallbackShopsData?.shops) || [];

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
    console.log('Map region changed:', {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      calculatedRadius: radius
    });
    setCurrentRegion(region);
    // ズームレベルに応じた範囲で店舗データを収集
    await collectShopsFromArea(region.latitude, region.longitude, radius);
  }, [calculateSearchRadius, collectShopsFromArea]);

  // ローディング中またはアセットの準備中
  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
        <Text marginTop="$3" fontSize="$4">
          {!isReady ? "地図を準備中..." : 
           locationLoading ? "位置情報を取得中..." : 
           "店舗データを読み込み中..."}
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
          {locationError ? "位置情報の取得に失敗しました" : "店舗データの取得に失敗しました"}
        </Text>
        <Text fontSize="$3" color="$gray10" textAlign="center" marginBottom="$4">
          {typeof error === 'string' ? error : error.message}
        </Text>
        {locationError && (
          <Button
            backgroundColor="$blue10"
            color="white"
            onPress={() => {
              setHasRequestedLocation(false);
              requestLocation();
            }}
          >
            位置情報を再取得
          </Button>
        )}
      </YStack>
    );
  }

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

  // マップの初期カメラ位置（現在位置または新宿）
  const initialCamera = {
    center: latitude && longitude 
      ? { latitude, longitude }
      : SHINJUKU_COORDINATE,
    zoom: 13,
    heading: 0,
    pitch: 0,
  };

  return (
    <YStack flex={1}>
      <MapView
        style={{ flex: 1 }}
        initialCamera={initialCamera}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {/* 店舗のピンを表示 */}
        {validShops.map((shop: Shop) => (
          <Marker
            key={shop.id}
            coordinate={{
              latitude: shop.latitude!,
              longitude: shop.longitude!,
            }}
            icon={require("../assets/images/pin.png")}
            anchor={{ x: 0.5, y: 1 }}
            onPress={() => {
              setSelectedShop(shop);
            }}
          />
        ))}
      </MapView>

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
            {typeof error === 'string' ? error : error.message}
          </Text>
          {locationError && (
            <XStack gap="$2" marginTop="$2">
              {canRequestPermission ? (
                <Button
                  size="$2"
                  backgroundColor="$orange8"
                  onPress={() => {
                    setHasRequestedLocation(false);
                    requestLocation();
                  }}
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
                    設定を開く
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
        bottom={30}
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
          📍 {validShops.length}件の店舗を表示中
          {latitude && longitude ? (
            <Text fontSize="$2" color="$gray10">
              {collectedShops.length > 0 
                ? "\n(マップ移動で収集した店舗を表示)" 
                : "\n(現在地から10km圏内)"}
            </Text>
          ) : (
            <Text fontSize="$2" color="$gray10">
              {"\n"}(全店舗表示中・位置情報なし)
            </Text>
          )}
        </Text>
      </YStack>

      {/* 店舗詳細ボトムシート */}
      <Sheet
        modal
        open={!!selectedShop}
        onOpenChange={(open: boolean) => {
          if (!open) setSelectedShop(null);
        }}
        snapPoints={[40, 60]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame padding="$4" backgroundColor="$background">
          <Sheet.Handle />
          {selectedShop && (
            <YStack gap="$4">
              <YStack gap="$2">
                <Text fontSize="$6" fontWeight="bold">
                  {selectedShop.name}
                </Text>
                <Text fontSize="$4" color="$gray10">
                  {selectedShop.address}
                </Text>
              </YStack>

              {selectedShop.nearestStation && (
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$4" color="$blue10">
                    📍 {selectedShop.nearestStation}
                  </Text>
                  {selectedShop.stationWalkTime && (
                    <Text fontSize="$4" color="$gray10">
                      徒歩{selectedShop.stationWalkTime}分
                    </Text>
                  )}
                </XStack>
              )}

              {selectedShop.budgetMin && selectedShop.budgetMax && (
                <XStack alignItems="center" gap="$2">
                  <Text fontSize="$4" color="$green10">
                    💰 ¥{selectedShop.budgetMin.toLocaleString()} - ¥{selectedShop.budgetMax.toLocaleString()}
                  </Text>
                </XStack>
              )}

              <XStack gap="$3">
                {selectedShop.wifi && (
                  <Text fontSize="$3" color="$blue10" backgroundColor="$blue3" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                    📶 WiFi
                  </Text>
                )}
                {selectedShop.powerOutlet && (
                  <Text fontSize="$3" color="$orange10" backgroundColor="$orange3" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                    🔌 電源
                  </Text>
                )}
                {selectedShop.privateBooking && (
                  <Text fontSize="$3" color="$purple10" backgroundColor="$purple3" paddingHorizontal="$2" paddingVertical="$1" borderRadius="$2">
                    🏠 貸切可
                  </Text>
                )}
              </XStack>

              {selectedShop.reservation && (
                <Text fontSize="$3" color="$gray10">
                  予約: {
                    selectedShop.reservation === 'REQUIRED' ? '必須' :
                    selectedShop.reservation === 'RECOMMENDED' ? '推奨' : '不要'
                  }
                </Text>
              )}

              {selectedShop.reviewCount !== undefined && selectedShop.reviewCount > 0 && (
                <Text fontSize="$4" color="$orange10">
                  ⭐ レビュー{selectedShop.reviewCount}件
                </Text>
              )}

              <Button
                backgroundColor="$blue10"
                color="white"
                onPress={() => {
                  // TODO: 将来的に店舗詳細画面に遷移
                  // router.push(`/shop/${selectedShop.id}`);
                  alert(`${selectedShop.name}の詳細画面に遷移予定`);
                }}
              >
                詳細を見る
              </Button>
            </YStack>
          )}
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}

/**
 *
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
