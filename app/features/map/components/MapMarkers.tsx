/**
 * 地図上の店舗ピンを表示するコンポーネント
 */
import { Marker } from "react-native-maps";
import type { Shop } from "../../../types/api";
import type { MapMarkersProps } from "../types";

export function MapMarkers({
  shops,
  selectedShopIndex,
  onMarkerPress,
}: MapMarkersProps) {
  return (
    <>
      {shops.map((shop: Shop, index: number) => (
        <Marker
          key={shop.id}
          coordinate={{
            latitude: shop.latitude!,
            longitude: shop.longitude!,
          }}
          icon={require("../../../assets/images/pin.png")}
          anchor={{ x: 0.5, y: 1 }}
          onPress={() => onMarkerPress(shop)}
          opacity={index === selectedShopIndex ? 1.0 : 0.7}
          zIndex={index === selectedShopIndex ? 1000 : 0}
        />
      ))}
    </>
  );
}
