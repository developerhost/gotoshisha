/**
 * ベースAPIクライアント
 */
import {
  API_BASE_URL,
  API_TIMEOUT,
  API_RETRY_COUNT,
  API_RETRY_DELAY,
} from "../config/api";
import type { ApiResponse } from "../types/api";
import { AuthStorage } from "../features/auth/storage";
import { Logger } from "../utils/logger";

// APIエラークラス
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data?: any
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

// リクエストオプション
interface RequestOptions extends RequestInit {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
  skipAuth?: boolean;
}

/**
 * ベースAPIクライアントクラス
 */
export class BaseApi {
  private static baseUrl = API_BASE_URL;
  private static defaultTimeout = API_TIMEOUT;
  private static defaultRetryCount = API_RETRY_COUNT;
  private static defaultRetryDelay = API_RETRY_DELAY;

  /**
   * 認証トークンを取得
   */
  private static async getAuthToken(): Promise<string | null> {
    try {
      const authData = await AuthStorage.load();
      return authData?.accessToken || null;
    } catch (error) {
      Logger.error("Failed to get auth token:", error);
      return null;
    }
  }

  /**
   * HTTPリクエストを実行
   */
  private static async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = this.defaultTimeout,
      retryCount = this.defaultRetryCount,
      retryDelay = this.defaultRetryDelay,
      skipAuth = false,
      ...fetchOptions
    } = options;

    // ヘッダーの設定
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(fetchOptions.headers as Record<string, string>),
    };

    // 認証トークンの追加
    if (!skipAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // タイムアウト付きfetch
    const fetchWithTimeout = async (
      url: string,
      options: RequestInit
    ): Promise<Response> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };

    // リトライ処理
    let lastError: Error | null = null;
    for (let i = 0; i <= retryCount; i++) {
      try {
        const response = await fetchWithTimeout(url, {
          ...fetchOptions,
          headers,
        });

        // レスポンスの処理
        let data;
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        // エラーレスポンスの処理
        if (!response.ok) {
          throw new ApiError(response.status, response.statusText, data);
        }

        // 成功レスポンス
        return data as ApiResponse<T>;
      } catch (error) {
        lastError = error as Error;

        // リトライしない条件
        if (
          error instanceof ApiError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          throw error;
        }

        // 最後の試行でない場合は待機
        if (i < retryCount) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }
    }

    // すべてのリトライが失敗
    throw lastError || new Error("Unknown error");
  }

  /**
   * GETリクエスト
   */
  static async get<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    // クエリパラメータの追加
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.toString(), {
      method: "GET",
      ...options,
    });
  }

  /**
   * POSTリクエスト
   */
  static async post<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * PUTリクエスト
   */
  static async put<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * DELETEリクエスト
   */
  static async delete<T>(
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
  }

  /**
   * ベースURLを設定
   */
  static setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * デフォルトタイムアウトを設定
   */
  static setDefaultTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }
}
