import { useEffect, useState } from "react";
import { Image } from "react-native";
import { YStack, Text, Button, Spinner, Sheet, XStack } from "tamagui";
import { Asset } from "expo-asset";
import MapView, { Marker } from "react-native-maps";
import { SHINJUKU_COORDINATE } from "../constants/location";
import { useAuth } from "../contexts/AuthContext.web";
import { useRouter } from "expo-router";
import { useShops } from "../hooks/useShops";
import type { Shop } from "../types/api";

export default function MapScreen() {
  const [isReady, setIsReady] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // 店舗データを取得
  const { data: shopsData, isLoading, error } = useShops({
    limit: 100, // TODO: インタラクティブに取得したい
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

  // ローディング中またはアセットの準備中
  if (!isReady || isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
        <Text marginTop="$3" fontSize="$4">
          {!isReady ? "地図を準備中..." : "店舗データを読み込み中..."}
        </Text>
      </YStack>
    );
  }

  // エラーハンドリング
  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text fontSize="$5" color="$red10" textAlign="center" marginBottom="$3">
          店舗データの取得に失敗しました
        </Text>
        <Text fontSize="$3" color="$gray10" textAlign="center">
          {error.message}
        </Text>
      </YStack>
    );
  }

  const shops = shopsData?.shops || [];

  // 店舗データの安全性チェック
  const validShops = shops.filter((shop) => 
    shop && 
    typeof shop === 'object' && 
    shop.id && 
    shop.name && 
    shop.address &&
    shop.latitude !== null && 
    shop.longitude !== null
  );

  return (
    <YStack flex={1}>
      <MapView
        style={{ flex: 1 }}
        initialCamera={{
          center: SHINJUKU_COORDINATE,
          zoom: 13,
          heading: 0,
          pitch: 0,
        }}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* 店舗のピンを表示 */}
        {validShops.map((shop) => (
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
