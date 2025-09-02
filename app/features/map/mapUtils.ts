/**
 * マップ関連のユーティリティ関数
 * カメラ位置計算、検索半径計算、店舗フィルタリング等の純粋関数
 */
import type { Region } from "react-native-maps";
import type { Shop } from "../../types/api";
import { SHINJUKU_COORDINATE } from "../../constants/location";

/**
 * カメラの初期位置を計算する
 */
export function calculateInitialCamera(
  latitude?: number | null,
  longitude?: number | null
) {
  return {
    center:
      latitude && longitude ? { latitude, longitude } : SHINJUKU_COORDINATE,
    zoom: 13,
    heading: 0,
    pitch: 0,
  };
}

/**
 * ズームレベルに基づいて適切な検索半径を計算する
 */
export function calculateSearchRadius(region: Region): number {
  // 緯度デルタから概算の距離を計算（1度≈111km）
  const latDelta = region.latitudeDelta;
  const estimatedRadiusKm = (latDelta * 111) / 2;

  // 最小1km、最大50kmの範囲で制限
  return Math.max(1, Math.min(50, Math.round(estimatedRadiusKm)));
}

/**
 * 店舗データの安全性をチェックして有効な店舗のみを返す
 */
export function filterValidShops(shops: Shop[]): Shop[] {
  return shops.filter(
    (shop) =>
      shop &&
      shop.id &&
      typeof shop.latitude === "number" &&
      typeof shop.longitude === "number" &&
      !isNaN(shop.latitude) &&
      !isNaN(shop.longitude) &&
      shop.latitude >= -90 &&
      shop.latitude <= 90 &&
      shop.longitude >= -180 &&
      shop.longitude <= 180
  );
}

/**
 * 複数の店舗データソースから適切な店舗リストを選択する
 */
export function selectShops(
  collectedShops: Shop[],
  latitude: number | null,
  longitude: number | null,
  nearbyShops?: Shop[],
  fallbackShops?: Shop[]
): Shop[] {
  // 収集された店舗データが最優先
  if (collectedShops.length > 0) {
    return collectedShops;
  }

  // 位置情報がある場合は近くの店舗、ない場合はフォールバック店舗
  if (latitude && longitude && nearbyShops) {
    return nearbyShops;
  }

  return fallbackShops || [];
}

/**
 * 位置情報の権限があるかどうかを判定
 */
export function hasLocationPermission(
  latitude: number | null,
  longitude: number | null
): boolean {
  return latitude !== null && longitude !== null;
}

/**
 * ローディング状態を統合して判定
 */
export function combineLoadingState(
  isReady: boolean,
  locationLoading: boolean,
  nearbyLoading: boolean,
  fallbackLoading: boolean
): boolean {
  // アセットの準備ができていない場合
  if (!isReady) {
    return true;
  }

  // 位置情報取得中
  if (locationLoading) {
    return true;
  }

  // 両方のAPI呼び出しがローディング中の場合
  if (nearbyLoading && fallbackLoading) {
    return true;
  }

  return false;
}
