/**
 * 地図本体とオーバーレイを統合管理するコンテナコンポーネント
 */
import { Platform } from "react-native";
import { YStack, Text } from "tamagui";
import MapView, { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { calculateInitialCamera } from "../mapUtils";
import { MapMarkers } from "./MapMarkers";
import { MapOverlays } from "./MapOverlays";
import type { MapContainerProps } from "../types";

export function MapContainer({
  latitude,
  longitude,
  shops,
  selectedShopIndex,
  user,
  error,
  locationError,
  canRequestPermission,
  hasLocationPermission,
  isUsingCollectedShops,
  onRegionChangeComplete,
  onMarkerPress,
  logout,
  retryLocationRequest,
  openSettings,
}: MapContainerProps) {
  const initialCamera = calculateInitialCamera(latitude, longitude);

  return (
    <YStack flex={1}>
      {Platform.OS === "web" ? (
        // Web版プレースホルダー
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
          provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={onRegionChangeComplete}
        >
          <MapMarkers
            shops={shops}
            selectedShopIndex={selectedShopIndex}
            onMarkerPress={onMarkerPress}
          />
        </MapView>
      )}

      <MapOverlays
        user={user}
        shops={shops}
        error={error}
        locationError={locationError}
        canRequestPermission={canRequestPermission}
        hasLocationPermission={hasLocationPermission}
        isUsingCollectedShops={isUsingCollectedShops}
        logout={logout}
        retryLocationRequest={retryLocationRequest}
        openSettings={openSettings}
      />
    </YStack>
  );
}
