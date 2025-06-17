/**
 * TanStack Query を使用したシーシャ店舗APIフック
 */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShopsApi } from "../../utils/api/shopsApi";
import { queryKeys, invalidateQueries } from "../../lib/queryClient";
import type {
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
} from "../../types/api";

/**
 * 店舗一覧取得クエリ
 */
export const useShopsQuery = (params?: ShopQueryParams) => {
  return useQuery({
    queryKey: queryKeys.shops.list(params),
    queryFn: () => ShopsApi.getShops(params),
    enabled: true, // 自動実行
  });
};

/**
 * 店舗詳細取得クエリ
 */
export const useShopQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.shops.detail(id),
    queryFn: () => ShopsApi.getShop(id),
    enabled: !!id, // idが存在する場合のみ実行
  });
};

/**
 * 近くの店舗検索クエリ
 */
export const useNearbyShopsQuery = (
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
export const useCreateShopMutation = () => {
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
export const useUpdateShopMutation = () => {
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
export const useDeleteShopMutation = () => {
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
export const useAddShopRelationMutation = () => {
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
export const useRemoveShopRelationMutation = () => {
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
export const useInfiniteShopsQuery = (
  baseParams?: Omit<ShopQueryParams, "page">
) => {
  const { useInfiniteQuery } = require("@tanstack/react-query");

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
