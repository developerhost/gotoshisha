import { z } from 'zod';

/**
 * 共通のバリデーションスキーマ
 */
export const commonSchemas = {
  id: z.string().cuid(),
  email: z.string().email('有効なメールアドレスを入力してください'),
  url: z.string().url('有効なURLを入力してください').optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  pagination: z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  }),
};

/**
 * ユーザー関連のバリデーションスキーマ
 */
export const userSchemas = {
  create: z.object({
    email: commonSchemas.email,
    name: z.string().min(1).max(100).optional(),
    avatar: commonSchemas.url,
  }),
  
  update: z.object({
    name: z.string().min(1).max(100).optional(),
    avatar: commonSchemas.url,
  }),
  
  params: z.object({
    id: commonSchemas.id,
  }),
};

/**
 * 投稿関連のバリデーションスキーマ
 */
export const postSchemas = {
  create: z.object({
    title: z.string().min(1).max(200),
    content: z.string().max(5000).optional(),
    imageUrl: commonSchemas.url,
    latitude: commonSchemas.latitude.optional(),
    longitude: commonSchemas.longitude.optional(),
    address: z.string().max(500).optional(),
    isPublic: z.boolean().default(true),
    tagIds: z.array(commonSchemas.id).optional(),
  }),
  
  update: z.object({
    title: z.string().min(1).max(200).optional(),
    content: z.string().max(5000).optional(),
    imageUrl: commonSchemas.url,
    latitude: commonSchemas.latitude.optional(),
    longitude: commonSchemas.longitude.optional(),
    address: z.string().max(500).optional(),
    isPublic: z.boolean().optional(),
    tagIds: z.array(commonSchemas.id).optional(),
  }),
  
  params: z.object({
    id: commonSchemas.id,
  }),
  
  query: z.object({
    authorId: commonSchemas.id.optional(),
    isPublic: z.boolean().optional(),
    tagIds: z.array(commonSchemas.id).optional(),
    search: z.string().max(100).optional(),
    latitude: commonSchemas.latitude.optional(),
    longitude: commonSchemas.longitude.optional(),
    radius: z.number().min(0.1).max(100).optional(), // km
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  }),
};

/**
 * コメント関連のバリデーションスキーマ
 */
export const commentSchemas = {
  create: z.object({
    content: z.string().min(1).max(1000),
    postId: commonSchemas.id,
  }),
  
  update: z.object({
    content: z.string().min(1).max(1000),
  }),
  
  params: z.object({
    id: commonSchemas.id,
  }),
  
  query: z.object({
    postId: commonSchemas.id.optional(),
    userId: commonSchemas.id.optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  }),
};

/**
 * タグ関連のバリデーションスキーマ
 */
export const tagSchemas = {
  create: z.object({
    name: z.string().min(1).max(50),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '有効なHEXカラーコードを入力してください').optional(),
  }),
  
  update: z.object({
    name: z.string().min(1).max(50).optional(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, '有効なHEXカラーコードを入力してください').optional(),
  }),
  
  params: z.object({
    id: commonSchemas.id,
  }),
  
  query: z.object({
    search: z.string().max(50).optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(10),
  }),
};

/**
 * いいね関連のバリデーションスキーマ
 */
export const likeSchemas = {
  create: z.object({
    postId: commonSchemas.id,
  }),
  
  params: z.object({
    postId: commonSchemas.id,
  }),
};

/**
 * バリデーションエラーをフォーマット
 */
export function formatValidationErrors(error: z.ZodError) {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
}

/**
 * リクエストボディをバリデート
 */
export async function validateRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; errors: any[] }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatValidationErrors(error) };
    }
    return { success: false, errors: [{ field: 'body', message: '無効なJSONです' }] };
  }
}

/**
 * クエリパラメータをバリデート
 */
export function validateQueryParams<T>(
  url: URL,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: any[] } {
  try {
    const params: Record<string, any> = {};
    
    for (const [key, value] of url.searchParams.entries()) {
      // 数値に変換を試行
      if (!isNaN(Number(value))) {
        params[key] = Number(value);
      }
      // ブール値に変換を試行
      else if (value === 'true' || value === 'false') {
        params[key] = value === 'true';
      }
      // 配列の場合（カンマ区切り）
      else if (value.includes(',')) {
        params[key] = value.split(',');
      }
      // 文字列として保持
      else {
        params[key] = value;
      }
    }
    
    const data = schema.parse(params);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatValidationErrors(error) };
    }
    return { success: false, errors: [{ field: 'query', message: '無効なクエリパラメータです' }] };
  }
}

/**
 * パスパラメータをバリデート
 */
export function validatePathParams<T>(
  params: Record<string, string>,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: any[] } {
  try {
    const data = schema.parse(params);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatValidationErrors(error) };
    }
    return { success: false, errors: [{ field: 'params', message: '無効なパラメータです' }] };
  }
}
