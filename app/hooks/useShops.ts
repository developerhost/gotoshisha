/**
 * TanStack Query を使用したシーシャ店舗APIフック
 */
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ShopsApi } from "../utils/api/shopsApi";
import { queryKeys, invalidateQueries } from "../lib/queryClient";
import type {
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
} from "../types/api";

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

// 型の再エクスポート
export type {
  ShopsResponse,
  ShopCreateInput,
  ShopUpdateInput,
  ShopQueryParams,
} from "../types/api";
