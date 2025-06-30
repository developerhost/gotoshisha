/**
 * TanStack Query を使用したシーシャ店舗APIフック
 */
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { ShopsApi } from "../../api/shopsApi";
import { queryKeys, invalidateQueries } from "../../lib/queryClient";
import type {
  Shop,
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
} from "../../types/api";

/**
 * 店舗一覧取得クエリ
 */
export const useShops = (params?: ShopQueryParams) => {
  return useQuery({
    queryKey: queryKeys.shops.list(params),
    queryFn: () => ShopsApi.getShops(params),
    enabled: true, // 自動実行
  });
};

/**
 * 店舗詳細取得クエリ
 */
export const useShop = (id: string) => {
  return useQuery({
    queryKey: queryKeys.shops.detail(id),
    queryFn: () => ShopsApi.getShop(id),
    enabled: !!id, // idが存在する場合のみ実行
  });
};

/**
 * 近くの店舗検索クエリ
 */
export const useNearbyShops = (
  latitude?: number,
  longitude?: number,
  radius: number = 5,
  params?: Omit<ShopQueryParams, "latitude" | "longitude" | "radius">
) => {
  return useQuery({
    queryKey: queryKeys.shops.nearby(latitude || 0, longitude || 0, radius),
    queryFn: () => {
      if (!latitude || !longitude) {
        throw new Error("緯度経度が必要です");
      }
      return ShopsApi.searchNearbyShops(latitude, longitude, radius, params);
    },
    enabled: !!latitude && !!longitude, // 緯度経度が存在する場合のみ実行
  });
};

/**
 * 店舗作成ミューテーション
 */
export const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ShopCreateInput) => ShopsApi.createShop(data),
    onSuccess: (newShop) => {
      // キャッシュを無効化して最新データを取得
      invalidateQueries.shops.list();

      // 新しい店舗をキャッシュに追加
      queryClient.setQueryData(queryKeys.shops.detail(newShop.id), newShop);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("店舗作成エラー:", error);
    },
  });
};

/**
 * 店舗更新ミューテーション
 */
export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ShopUpdateInput }) =>
      ShopsApi.updateShop(id, data),
    onSuccess: (updatedShop) => {
      // 店舗詳細キャッシュを更新
      queryClient.setQueryData(
        queryKeys.shops.detail(updatedShop.id),
        updatedShop
      );

      // 一覧キャッシュを無効化
      invalidateQueries.shops.list();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("店舗更新エラー:", error);
    },
  });
};

/**
 * 店舗削除ミューテーション
 */
export const useDeleteShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ShopsApi.deleteShop(id),
    onSuccess: (_, deletedId) => {
      // 削除された店舗をキャッシュから削除
      queryClient.removeQueries({
        queryKey: queryKeys.shops.detail(deletedId),
      });

      // 一覧キャッシュを無効化
      invalidateQueries.shops.list();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("店舗削除エラー:", error);
    },
  });
};

/**
 * 店舗関連要素追加ミューテーション
 */
export const useAddShopRelation = () => {
  return useMutation({
    mutationFn: ({
      shopId,
      type,
      id,
    }: {
      shopId: string;
      type: "flavor" | "atmosphere" | "hobby" | "paymentMethod" | "event";
      id: string;
    }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = { [`${type}Id`]: id };
      return ShopsApi.addShopRelation(shopId, params);
    },
    onSuccess: (_, { shopId }) => {
      // 店舗詳細キャッシュを無効化（関連データが変更されたため）
      invalidateQueries.shops.detail(shopId);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("関連要素追加エラー:", error);
    },
  });
};

/**
 * 店舗関連要素削除ミューテーション
 */
export const useRemoveShopRelation = () => {
  return useMutation({
    mutationFn: ({
      shopId,
      type,
      id,
    }: {
      shopId: string;
      type: "flavor" | "atmosphere" | "hobby" | "paymentMethod" | "event";
      id: string;
    }) => {
      const params = { [`${type}Id`]: id };
      return ShopsApi.removeShopRelation(shopId, params);
    },
    onSuccess: (_, { shopId }) => {
      // 店舗詳細キャッシュを無効化（関連データが変更されたため）
      invalidateQueries.shops.detail(shopId);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("関連要素削除エラー:", error);
    },
  });
};

/**
 * 店舗関連要素管理用統合フック
 */
export const useShopRelations = () => {
  const addRelationMutation = useAddShopRelation();
  const removeRelationMutation = useRemoveShopRelation();

  return {
    addRelation: addRelationMutation.mutate,
    removeRelation: removeRelationMutation.mutate,
    loading: addRelationMutation.isPending || removeRelationMutation.isPending,
    error: addRelationMutation.error || removeRelationMutation.error,
    addAsync: addRelationMutation.mutateAsync,
    removeAsync: removeRelationMutation.mutateAsync,
  };
};

/**
 * 店舗データのプリフェッチ
 */
export const usePrefetchShop = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.shops.detail(id),
      queryFn: () => ShopsApi.getShop(id),
      staleTime: 1000 * 60 * 5, // 5分間キャッシュ
    });
  };
};

/**
 * 無限スクロール用の店舗一覧フック
 */
export const useInfiniteShops = (
  baseParams?: Omit<ShopQueryParams, "page">
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.shops.list(baseParams),
    queryFn: ({ pageParam = 1 }) =>
      ShopsApi.getShops({ ...baseParams, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ShopsResponse) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

/**
 * マップ移動による店舗収集フック
 */
export const useMapShopsCollection = () => {
  const [collectedShops, setCollectedShops] = useState<Map<string, Shop>>(
    new Map()
  );
  const [searchedAreas, setSearchedAreas] = useState<
    Array<{
      latitude: number;
      longitude: number;
      radius: number;
    }>
  >([]);

  // 指定エリアが既に検索済みかチェック
  const isAreaSearched = useCallback(
    (lat: number, lng: number, radius: number) => {
      return searchedAreas.some((area) => {
        const distance =
          Math.sqrt(
            Math.pow(area.latitude - lat, 2) + Math.pow(area.longitude - lng, 2)
          ) * 111; // 大まかな距離計算（km）

        // 検索済みエリアの半径と現在の検索半径の小さい方を基準にする
        const minRadius = Math.min(area.radius, radius);
        return distance < minRadius * 0.5; // 半径の半分以内なら重複とみなす
      });
    },
    [searchedAreas]
  );

  // 新しいエリアの店舗を取得・追加
  const collectShopsFromArea = useCallback(
    async (latitude: number, longitude: number, radius: number = 5) => {
      // eslint-disable-next-line no-console
      console.log(
        `Collecting shops from area: lat=${latitude}, lng=${longitude}, radius=${radius}km`
      );

      // 既に検索済みのエリアなら何もしない
      if (isAreaSearched(latitude, longitude, radius)) {
        // eslint-disable-next-line no-console
        console.log("Area already searched, skipping...");
        return Array.from(collectedShops.values());
      }

      try {
        // eslint-disable-next-line no-console
        console.log("Fetching shops from API...");
        const response = await ShopsApi.searchNearbyShops(
          latitude,
          longitude,
          radius,
          {
            limit: 100,
          }
        );

        // eslint-disable-next-line no-console
        console.log(`API response: ${response.shops.length} shops found`);
        response.shops.forEach((shop: Shop) => {
          // eslint-disable-next-line no-console
          console.log(`- ${shop.name}: (${shop.latitude}, ${shop.longitude})`);
        });

        // 新しい店舗データを既存のマップに追加
        setCollectedShops((prev) => {
          const newMap = new Map(prev);
          response.shops.forEach((shop: Shop) => {
            newMap.set(shop.id, shop);
          });
          // eslint-disable-next-line no-console
          console.log(`Total collected shops: ${newMap.size}`);
          return newMap;
        });

        // 検索済みエリアに追加
        setSearchedAreas((prev) => [...prev, { latitude, longitude, radius }]);

        return Array.from(collectedShops.values());
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("店舗データの収集に失敗:", error);
        return Array.from(collectedShops.values());
      }
    },
    [collectedShops, isAreaSearched]
  );

  // 収集した店舗データをクリア
  const clearCollectedShops = useCallback(() => {
    setCollectedShops(new Map());
    setSearchedAreas([]);
  }, []);

  // 初期データの設定
  const setInitialShops = useCallback((shops: Shop[]) => {
    const shopMap = new Map();
    shops.forEach((shop) => {
      shopMap.set(shop.id, shop);
    });
    setCollectedShops(shopMap);
  }, []);

  return {
    collectedShops: Array.from(collectedShops.values()),
    collectShopsFromArea,
    clearCollectedShops,
    setInitialShops,
    searchedAreas,
  };
};

// 型の再エクスポート
export type {
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
} from "../../types/api";
