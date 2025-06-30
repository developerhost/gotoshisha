/**
 * シーシャ店舗APIクライアント
 */
import { BaseApi } from "./baseApi";
import { API_ENDPOINTS } from "../config/api";
import type {
  Shop,
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
  ShopRelationParams,
} from "../types/api";

/**
 * シーシャ店舗APIクラス
 */
export class ShopsApi {
  /**
   * 店舗一覧を取得
   */
  static async getShops(params?: ShopQueryParams): Promise<ShopsResponse> {
    const response = await BaseApi.get<ShopsResponse>(
      API_ENDPOINTS.shops,
      params
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || "店舗一覧の取得に失敗しました");
    }

    return response.data;
  }

  /**
   * 店舗詳細を取得
   */
  static async getShop(id: string): Promise<Shop> {
    const response = await BaseApi.get<Shop>(`${API_ENDPOINTS.shops}/${id}`);

    if (!response.success || !response.data) {
      throw new Error(response.error || "店舗詳細の取得に失敗しました");
    }

    return response.data;
  }

  /**
   * 店舗を作成
   */
  static async createShop(data: ShopCreateInput): Promise<Shop> {
    // 写真URL、営業時間、SNSリンクをJSON文字列に変換
    const processedData = {
      ...data,
      photos: data.photos ? JSON.stringify(data.photos) : undefined,
      openingHours: data.openingHours
        ? JSON.stringify(data.openingHours)
        : undefined,
      snsLinks: data.snsLinks ? JSON.stringify(data.snsLinks) : undefined,
    };

    const response = await BaseApi.post<Shop>(
      API_ENDPOINTS.shops,
      processedData
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || "店舗の作成に失敗しました");
    }

    return response.data;
  }

  /**
   * 店舗を更新
   */
  static async updateShop(id: string, data: ShopUpdateInput): Promise<Shop> {
    // 写真URL、営業時間、SNSリンクをJSON文字列に変換
    const processedData = {
      ...data,
      photos: data.photos ? JSON.stringify(data.photos) : undefined,
      openingHours: data.openingHours
        ? JSON.stringify(data.openingHours)
        : undefined,
      snsLinks: data.snsLinks ? JSON.stringify(data.snsLinks) : undefined,
    };

    const response = await BaseApi.put<Shop>(
      `${API_ENDPOINTS.shops}/${id}`,
      processedData
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || "店舗の更新に失敗しました");
    }

    return response.data;
  }

  /**
   * 店舗を削除
   */
  static async deleteShop(id: string): Promise<void> {
    const response = await BaseApi.delete<{ message: string }>(
      `${API_ENDPOINTS.shops}/${id}`
    );

    if (!response.success) {
      throw new Error(response.error || "店舗の削除に失敗しました");
    }
  }

  /**
   * 店舗に関連要素を追加
   */
  static async addShopRelation(
    id: string,
    params: Omit<ShopRelationParams, "shopId">
  ): Promise<void> {
    const response = await BaseApi.post<{ message: string }>(
      `${API_ENDPOINTS.shops}/${id}/relations`,
      { shopId: id, ...params }
    );

    if (!response.success) {
      throw new Error(response.error || "関連要素の追加に失敗しました");
    }
  }

  /**
   * 店舗から関連要素を削除
   */
  static async removeShopRelation(
    id: string,
    params: Omit<ShopRelationParams, "shopId">
  ): Promise<void> {
    const response = await BaseApi.delete<{ message: string }>(
      `${API_ENDPOINTS.shops}/${id}/relations`,
      { shopId: id, ...params }
    );

    if (!response.success) {
      throw new Error(response.error || "関連要素の削除に失敗しました");
    }
  }

  /**
   * 近くの店舗を検索
   */
  static async searchNearbyShops(
    latitude: number,
    longitude: number,
    radius: number = 5, // デフォルト5km
    params?: Omit<ShopQueryParams, "latitude" | "longitude" | "radius">
  ): Promise<ShopsResponse> {
    return this.getShops({
      ...params,
      latitude,
      longitude,
      radius,
    });
  }

  /**
   * JSON文字列をパース（ヘルパー関数）
   */
  static parseJsonField<T>(field?: string): T | undefined {
    if (!field) return undefined;
    try {
      return JSON.parse(field) as T;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to parse JSON field:", error);
      return undefined;
    }
  }

  /**
   * 店舗データを整形（ヘルパー関数）
   */
  static formatShop(shop: Shop): Shop {
    return {
      ...shop,
      photos: this.parseJsonField<string[]>(shop.photos as string),
      openingHours: this.parseJsonField(shop.openingHours),
      snsLinks: this.parseJsonField(shop.snsLinks),
    } as Shop;
  }
}

// エクスポート用のヘルパー関数
export const {
  getShops,
  getShop,
  createShop,
  updateShop,
  deleteShop,
  addShopRelation,
  removeShopRelation,
  searchNearbyShops,
  parseJsonField,
  formatShop,
} = ShopsApi;
