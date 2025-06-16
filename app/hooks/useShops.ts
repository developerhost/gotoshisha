/**
 * シーシャ店舗のカスタムフック
 */
import { useState, useEffect, useCallback } from "react";
import { ShopsApi } from "../utils/api/shopsApi";
import type {
  Shop,
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
} from "../types/api";

// 店舗一覧用フック
export const useShops = (initialParams?: ShopQueryParams) => {
  const [data, setData] = useState<ShopsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchShops = useCallback(
    async (params?: ShopQueryParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await ShopsApi.getShops(params || initialParams);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [initialParams]
  );

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  return {
    shops: data?.shops || [],
    pagination: data?.pagination,
    loading,
    error,
    refetch: fetchShops,
  };
};

// 店舗詳細用フック
export const useShop = (id: string) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchShop = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const response = await ShopsApi.getShop(id);
      setShop(ShopsApi.formatShop(response));
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  return {
    shop,
    loading,
    error,
    refetch: fetchShop,
  };
};

// 店舗作成用フック
export const useCreateShop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createShop = useCallback(async (data: ShopCreateInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ShopsApi.createShop(data);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createShop,
    loading,
    error,
  };
};

// 店舗更新用フック
export const useUpdateShop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateShop = useCallback(async (id: string, data: ShopUpdateInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ShopsApi.updateShop(id, data);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateShop,
    loading,
    error,
  };
};

// 店舗削除用フック
export const useDeleteShop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteShop = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await ShopsApi.deleteShop(id);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteShop,
    loading,
    error,
  };
};

// 近くの店舗検索用フック
export const useNearbyShops = (
  latitude?: number,
  longitude?: number,
  radius: number = 5
) => {
  const [data, setData] = useState<ShopsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchNearbyShops = useCallback(async () => {
    if (!latitude || !longitude) return;

    setLoading(true);
    setError(null);
    try {
      const response = await ShopsApi.searchNearbyShops(
        latitude,
        longitude,
        radius
      );
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, radius]);

  useEffect(() => {
    searchNearbyShops();
  }, [searchNearbyShops]);

  return {
    shops: data?.shops || [],
    pagination: data?.pagination,
    loading,
    error,
    refetch: searchNearbyShops,
  };
};

// 店舗関連要素管理用フック
export const useShopRelations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addRelation = useCallback(
    async (
      shopId: string,
      type: "flavor" | "atmosphere" | "hobby" | "paymentMethod" | "event",
      id: string
    ) => {
      setLoading(true);
      setError(null);
      try {
        const params = { [`${type}Id`]: id };
        await ShopsApi.addShopRelation(shopId, params);
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeRelation = useCallback(
    async (
      shopId: string,
      type: "flavor" | "atmosphere" | "hobby" | "paymentMethod" | "event",
      id: string
    ) => {
      setLoading(true);
      setError(null);
      try {
        const params = { [`${type}Id`]: id };
        await ShopsApi.removeShopRelation(shopId, params);
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    addRelation,
    removeRelation,
    loading,
    error,
  };
};
