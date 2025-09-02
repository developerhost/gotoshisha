/**
 * マップ機能関連の型定義
 */
import type { Shop } from "../../types/api";
import type { Region } from "react-native-maps";

// User型の定義（認証コンテキストから取得）
export interface User {
  id?: string;
  email?: string;
  name?: string;
  avatar?: string;
}

/**
 * マップローディング状態の詳細情報
 */
export interface MapLoadingState {
  isReady: boolean;
  locationLoading: boolean;
  nearbyLoading: boolean;
  fallbackLoading: boolean;
  nearbyFetching: boolean;
  fallbackFetching: boolean;
  nearbySuccess: boolean;
  fallbackSuccess: boolean;
  hasRequestedLocation: boolean;
}

/**
 * マップエラー状態
 */
export interface MapErrorState {
  error: Error | string | null;
  locationError: Error | string | null;
  canRequestPermission: boolean;
}

/**
 * 店舗選択状態
 */
export interface ShopSelectionState {
  selectedShopIndex: number;
  shops: Shop[];
}

/**
 * MapLoadingViewコンポーネントのProps
 */
export interface MapLoadingViewProps extends MapLoadingState {
  latitude?: number | null;
  longitude?: number | null;
  nearbyShopsCount: number;
  fallbackShopsCount: number;
  hasLocationPermission: boolean;
}

/**
 * MapErrorViewコンポーネントのProps
 */
export interface MapErrorViewProps extends MapErrorState {
  latitude?: number | null;
  longitude?: number | null;
  retryLocationRequest: () => void;
  openSettings: () => void;
}

/**
 * MapOverlaysコンポーネントのProps
 */
export interface MapOverlaysProps {
  user: User | null;
  shops: Shop[];
  error: Error | string | null;
  locationError: Error | string | null;
  canRequestPermission: boolean;
  hasLocationPermission: boolean;
  isUsingCollectedShops: boolean;
  logout: () => void;
  retryLocationRequest: () => void;
  openSettings: () => void;
}

/**
 * MapMarkersコンポーネントのProps
 */
export interface MapMarkersProps {
  shops: Shop[];
  selectedShopIndex: number;
  onMarkerPress: (shop: Shop) => void;
}

/**
 * MapContainerコンポーネントのProps
 */
export interface MapContainerProps {
  latitude?: number | null;
  longitude?: number | null;
  shops: Shop[];
  selectedShopIndex: number;
  user: User | null;
  error: Error | string | null;
  locationError: Error | string | null;
  canRequestPermission: boolean;
  hasLocationPermission: boolean;
  isUsingCollectedShops: boolean;
  onRegionChangeComplete: (region: Region) => void;
  onMarkerPress: (shop: Shop) => void;
  logout: () => void;
  retryLocationRequest: () => void;
  openSettings: () => void;
}
