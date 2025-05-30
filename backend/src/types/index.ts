/**
 * Cloudflare Workers環境の型定義
 */
export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
}

/**
 * APIレスポンスの基本型
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: ValidationError[];
}

/**
 * ページネーション用の型
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * 位置情報の型
 */
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

/**
 * ユーザー関連の型
 */
export interface CreateUserRequest {
  email: string;
  name?: string;
  avatar?: string;
}

export interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

/**
 * 投稿関連の型
 */
export interface CreatePostRequest {
  title: string;
  content?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  isPublic?: boolean;
  tagIds?: string[];
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  isPublic?: boolean;
  tagIds?: string[];
}

export interface PostFilters {
  authorId?: string;
  isPublic?: boolean;
  tagIds?: string[];
  search?: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // km
}

/**
 * コメント関連の型
 */
export interface CreateCommentRequest {
  content: string;
  postId: string;
}

export interface UpdateCommentRequest {
  content: string;
}

/**
 * タグ関連の型
 */
export interface CreateTagRequest {
  name: string;
  color?: string;
}

export interface UpdateTagRequest {
  name?: string;
  color?: string;
}

/**
 * エラー関連の型
 */
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
}
