import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  ValidationError,
} from "@/types";

/**
 * 成功レスポンスを作成
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * エラーレスポンスを作成
 */
export function createErrorResponse(
  error: string,
  details?: ValidationError[]
): ApiResponse {
  return {
    success: false,
    error,
    ...(details && { details }),
  };
}

/**
 * ページネーション情報を計算
 */
export function calculatePagination(
  page: number,
  limit: number,
  total: number
) {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
  };
}

/**
 * ページネーションパラメータを正規化
 */
export function normalizePaginationParams(params: PaginationParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * ページネーション付きレスポンスを作成
 */
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  return {
    data,
    pagination: calculatePagination(page, limit, total),
  };
}

/**
 * 文字列をスラッグ化
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // 特殊文字を削除
    .replace(/[\s_-]+/g, "-") // スペース、アンダースコア、ハイフンをハイフンに変換
    .replace(/^-+|-+$/g, ""); // 先頭と末尾のハイフンを削除
}

/**
 * 安全にJSONをパース
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * 配列をチャンクに分割
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 重複を除去
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * オブジェクトから未定義の値を除去
 */
export function removeUndefined<T extends Record<string, any>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key as keyof T] = value;
    }
  }
  return result;
}
