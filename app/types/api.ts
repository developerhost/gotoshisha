/**
 * API関連の型定義
 */

// 基本的なAPIレスポンス型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: ValidationError[];
}

// バリデーションエラー型
export interface ValidationError {
  field: string;
  message: string;
}

// ページネーション情報
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ページネーション付きレスポンス
export interface PaginatedResponse<T> {
  items: T[];
  pagination: Pagination;
}

// マスターデータの基本型
export interface MasterData {
  id: string;
  name: string;
}

// 店舗関連の型
export interface Shop {
  id: string;
  name: string;
  address: string;
  nearestStation?: string;
  stationWalkTime?: number;
  openingHours?: string;
  holidays?: string;
  budgetMin?: number;
  budgetMax?: number;
  seatingCount?: number;
  seatingTypes?: string;
  reservation?: "REQUIRED" | "RECOMMENDED" | "NOT_REQUIRED";
  privateBooking: boolean;
  wifi: boolean;
  powerOutlet: boolean;
  smokingPolicy?: "SMOKING_ALLOWED" | "SEPARATED" | "NON_SMOKING";
  parkingInfo?: string;
  timeLimit?: string;
  hookahBrand?: string;
  flavorCount?: number;
  photos?: string;
  websiteUrl?: string;
  googleMapUrl?: string;
  snsLinks?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  updatedAt: string;
  // リレーション
  flavors?: Flavor[];
  atmospheres?: Atmosphere[];
  hobbies?: Hobby[];
  paymentMethods?: PaymentMethod[];
  events?: Event[];
  reviews?: Review[];
  reviewCount?: number;
  averageRating?: {
    taste: number | null;
    atmosphere: number | null;
    service: number | null;
    value: number | null;
  } | null;
}

// フレーバー型
export interface Flavor extends MasterData {}

// 雰囲気型
export interface Atmosphere extends MasterData {}

// ホビー型
export interface Hobby extends MasterData {}

// 支払い方法型
export interface PaymentMethod extends MasterData {}

// イベント型
export interface Event extends MasterData {
  description?: string;
  schedule?: string;
}

// レビュー型
export interface Review {
  id: string;
  shopId: string;
  userId?: string;
  ratingTaste?: number;
  ratingAtmosphere?: number;
  ratingService?: number;
  ratingValue?: number;
  comment?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name?: string;
    avatar?: string;
  };
}

// 店舗作成・更新の入力型
export interface ShopCreateInput {
  name: string;
  address: string;
  nearestStation?: string;
  stationWalkTime?: number;
  openingHours?: string;
  holidays?: string;
  budgetMin?: number;
  budgetMax?: number;
  seatingCount?: number;
  seatingTypes?: string;
  reservation?: "REQUIRED" | "RECOMMENDED" | "NOT_REQUIRED";
  privateBooking?: boolean;
  wifi?: boolean;
  powerOutlet?: boolean;
  smokingPolicy?: "SMOKING_ALLOWED" | "SEPARATED" | "NON_SMOKING";
  parkingInfo?: string;
  timeLimit?: string;
  hookahBrand?: string;
  flavorCount?: number;
  photos?: string;
  websiteUrl?: string;
  googleMapUrl?: string;
  snsLinks?: string;
  latitude?: number;
  longitude?: number;
}

export interface ShopUpdateInput extends Partial<ShopCreateInput> {}

// 店舗検索クエリパラメータ
export interface ShopQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  budgetMin?: number;
  budgetMax?: number;
  wifi?: boolean;
  powerOutlet?: boolean;
  privateBooking?: boolean;
  reservation?: "REQUIRED" | "RECOMMENDED" | "NOT_REQUIRED";
  smokingPolicy?: "SMOKING_ALLOWED" | "SEPARATED" | "NON_SMOKING";
  sortBy?: "createdAt" | "updatedAt" | "name" | "budgetMin";
  sortOrder?: "asc" | "desc";
}

// 店舗一覧レスポンス
export interface ShopsResponse {
  shops: Shop[];
  pagination: Pagination;
}

// 関連要素の追加・削除パラメータ
export interface ShopRelationParams {
  shopId: string;
  flavorId?: string;
  atmosphereId?: string;
  hobbyId?: string;
  paymentMethodId?: string;
  eventId?: string;
}
