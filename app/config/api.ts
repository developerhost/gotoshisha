/**
 * API設定
 */

// 環境変数から取得、デフォルト値は開発環境
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8787";

// APIエンドポイント
export const API_ENDPOINTS = {
  health: "/health",
  api: "/api",
  shops: "/api/shops",
  profile: "/api/profile",
  users: "/api/users",
  posts: "/api/posts",
  comments: "/api/comments",
  tags: "/api/tags",
  likes: "/api/likes",
  reviews: "/api/reviews",
} as const;

// APIリクエストのタイムアウト時間（ミリ秒）
export const API_TIMEOUT = 30000;

// APIリクエストのリトライ回数
export const API_RETRY_COUNT = 3;

// APIリクエストのリトライ間隔（ミリ秒）
export const API_RETRY_DELAY = 1000;
