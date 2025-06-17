/**
 * TanStack Query クライアント設定
 */
import { QueryClient } from "@tanstack/react-query";

// デフォルトオプション
const queryClientOptions = {
  defaultOptions: {
    queries: {
      // キャッシュ時間（5分）
      staleTime: 1000 * 60 * 5,
      // ガベージコレクション時間（10分）
      gcTime: 1000 * 60 * 10,
      // リトライ設定
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount: number, error: any) => {
        // 400番台のエラーはリトライしない
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // 最大3回まで
        return failureCount < 3;
      },
      // リトライ間隔（指数バックオフ）
      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
      // ネットワーク接続時の自動再取得
      refetchOnWindowFocus: false,
      // マウント時の自動再取得
      refetchOnMount: true,
      // ネットワーク再接続時の自動再取得
      refetchOnReconnect: true,
    },
    mutations: {
      // ミューテーションのリトライ設定
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount: number, error: any) => {
        // 400番台のエラーはリトライしない
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // 最大2回まで
        return failureCount < 2;
      },
    },
  },
};

// QueryClientのインスタンスを作成
export const queryClient = new QueryClient(queryClientOptions);

// Query Keys（型安全なクエリキー管理）
export const queryKeys = {
  // 店舗関連
  shops: {
    all: ["shops"] as const,
    lists: () => [...queryKeys.shops.all, "list"] as const,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: (params?: Record<string, any>) =>
      [...queryKeys.shops.lists(), { params }] as const,
    details: () => [...queryKeys.shops.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.shops.details(), id] as const,
    nearby: (lat: number, lng: number, radius: number) =>
      [...queryKeys.shops.all, "nearby", { lat, lng, radius }] as const,
  },
  // ユーザー関連
  users: {
    all: ["users"] as const,
    detail: (id: string) => [...queryKeys.users.all, id] as const,
    profile: () => [...queryKeys.users.all, "profile"] as const,
  },
  // 投稿関連
  posts: {
    all: ["posts"] as const,
    lists: () => [...queryKeys.posts.all, "list"] as const,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: (params?: Record<string, any>) =>
      [...queryKeys.posts.lists(), { params }] as const,
    detail: (id: string) => [...queryKeys.posts.all, id] as const,
  },
  // レビュー関連
  reviews: {
    all: ["reviews"] as const,
    byShop: (shopId: string) =>
      [...queryKeys.reviews.all, "shop", shopId] as const,
  },
} as const;

// Query Key ヘルパー関数
export const invalidateQueries = {
  shops: {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.shops.all }),
    list: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.shops.lists() }),
    detail: (id: string) =>
      queryClient.invalidateQueries({ queryKey: queryKeys.shops.detail(id) }),
  },
  users: {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
    profile: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() }),
  },
  posts: {
    all: () => queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
    list: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() }),
  },
};
