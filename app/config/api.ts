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

/**
 * シンプルなAPIクライアント
 */
export const apiClient = {
  async get(endpoint: string, options: { token?: string } = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    // eslint-disable-next-line no-console
    console.log("API GET request to:", url);
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    // eslint-disable-next-line no-console
    console.log("API GET response status:", response.status);
    return response;
  },

  async post(
    endpoint: string,
    options: { json?: unknown; token?: string } = {}
  ) {
    const url = `${API_BASE_URL}${endpoint}`;
    // eslint-disable-next-line no-console
    console.log("API POST request to:", url);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: options.json ? JSON.stringify(options.json) : undefined,
    });

    // eslint-disable-next-line no-console
    console.log("API POST response status:", response.status);
    return response;
  },

  async put(
    endpoint: string,
    options: { json?: unknown; token?: string } = {}
  ) {
    const url = `${API_BASE_URL}${endpoint}`;
    // eslint-disable-next-line no-console
    console.log("API PUT request to:", url);
    // eslint-disable-next-line no-console
    console.log("PUT body:", options.json);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: options.json ? JSON.stringify(options.json) : undefined,
    });
    // eslint-disable-next-line no-console
    console.log("API PUT response status:", response.status);
    return response;
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  },
};
