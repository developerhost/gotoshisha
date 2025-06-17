/**
 * シーシャ店舗APIを呼び出すカスタムフック
 */
import { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";

// APIのベースURL（環境に応じて変更）
const API_BASE_URL = Platform.select({
  ios: "http://localhost:8787",
  android: "http://10.0.2.2:8787",
  default: "http://localhost:8787",
});

/**
 * 店舗データの型定義
 */
export interface Shop {
  id: string;
  name: string;
  address: string;
  nearestStation?: string;
  stationWalkTime?: number;
  openingHours?: Record<string, string>;
  holidays?: string;
  budgetMin?: number;
  budgetMax?: number;
  seatingCount?: number;
  seatingTypes?: string;
  reservation?: string;
  privateBooking: boolean;
  wifi: boolean;
  powerOutlet: boolean;
  smokingPolicy?: string;
  parkingInfo?: string;
  timeLimit?: string;
  hookahBrand?: string;
  flavorCount?: number;
  photos?: string[];
  websiteUrl?: string;
  googleMapUrl?: string;
  snsLinks?: Record<string, string>;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
  flavors: Array<{ id: string; name: string }>;
  atmospheres: Array<{ id: string; name: string }>;
  hobbies: Array<{ id: string; name: string }>;
  paymentMethods: Array<{ id: string; name: string }>;
  events: Array<{
    id: string;
    name: string;
    description?: string;
    schedule?: string;
  }>;
  reviewCount: number;
  averageRating: {
    taste: number;
    atmosphere: number;
    service: number;
    value: number;
    overall: number;
  } | null;
  distance?: number; // 近くの店舗検索時のみ
}

/**
 * 店舗詳細データの型定義（レビュー付き）
 */
export interface ShopDetail extends Shop {
  reviews: Array<{
    id: string;
    ratingTaste?: number;
    ratingAtmosphere?: number;
    ratingService?: number;
    ratingValue?: number;
    comment?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
    user?: {
      id: string;
      name?: string;
      avatar?: string;
    };
  }>;
}

/**
 * 店舗一覧のクエリパラメータ
 */
export interface ShopListParams {
  page?: number;
  limit?: number;
  search?: string;
  atmosphereIds?: string[];
  flavorIds?: string[];
  hobbyIds?: string[];
  budgetMin?: number;
  budgetMax?: number;
  hasWifi?: boolean;
  hasPowerOutlet?: boolean;
  orderBy?: "createdAt" | "name" | "budgetMin";
  order?: "asc" | "desc";
}

/**
 * 近くの店舗検索のパラメータ
 */
export interface NearbyShopsParams {
  latitude: number;
  longitude: number;
  radius?: number;
}

/**
 * APIレスポンスの型定義
 */
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

interface ShopListResponse {
  shops: Shop[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 店舗一覧を取得するフック
 */
export function useShops(params: ShopListParams = {}) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchShops = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append("page", params.page.toString());
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.search) queryParams.append("search", params.search);
      if (params.atmosphereIds?.length) {
        queryParams.append("atmosphereIds", params.atmosphereIds.join(","));
      }
      if (params.flavorIds?.length) {
        queryParams.append("flavorIds", params.flavorIds.join(","));
      }
      if (params.hobbyIds?.length) {
        queryParams.append("hobbyIds", params.hobbyIds.join(","));
      }
      if (params.budgetMin !== undefined) {
        queryParams.append("budgetMin", params.budgetMin.toString());
      }
      if (params.budgetMax !== undefined) {
        queryParams.append("budgetMax", params.budgetMax.toString());
      }
      if (params.hasWifi !== undefined) {
        queryParams.append("hasWifi", params.hasWifi.toString());
      }
      if (params.hasPowerOutlet !== undefined) {
        queryParams.append("hasPowerOutlet", params.hasPowerOutlet.toString());
      }
      if (params.orderBy) queryParams.append("orderBy", params.orderBy);
      if (params.order) queryParams.append("order", params.order);

      const response = await fetch(
        `${API_BASE_URL}/api/shops?${queryParams.toString()}`
      );
      const data: ApiResponse<ShopListResponse> = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "店舗一覧の取得に失敗しました");
      }

      if (data.data) {
        setShops(data.data.shops);
        setPagination(data.data.pagination);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return { shops, loading, error, pagination, refetch: fetchShops };
}

/**
 * 特定の店舗詳細を取得するフック
 */
export function useShopDetail(shopId: string | null) {
  const [shop, setShop] = useState<ShopDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShop = useCallback(async () => {
    if (!shopId) {
      setShop(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/shops/${shopId}`);
      const data: ApiResponse<ShopDetail> = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "店舗詳細の取得に失敗しました");
      }

      setShop(data.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  return { shop, loading, error, refetch: fetchShop };
}

/**
 * 近くの店舗を検索するフック
 */
export function useNearbyShops(params: NearbyShopsParams | null) {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyShops = useCallback(async () => {
    if (!params) {
      setShops([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        latitude: params.latitude.toString(),
        longitude: params.longitude.toString(),
        radius: (params.radius || 5).toString(),
      });

      const response = await fetch(
        `${API_BASE_URL}/api/shops/nearby?${queryParams.toString()}`
      );
      const data: ApiResponse<Shop[]> = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "近くの店舗の検索に失敗しました");
      }

      setShops(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchNearbyShops();
  }, [fetchNearbyShops]);

  return { shops, loading, error, refetch: fetchNearbyShops };
}
