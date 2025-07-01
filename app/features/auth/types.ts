/**
 * Auth0関連の型定義
 */

/**
 * 住所情報の型定義
 */
export interface Address {
  formatted?: string;
  street_address?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country?: string;
}

/**
 * Auth0から取得されるユーザー情報の型定義
 */
export interface UserInfo {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: Address;
  updated_at?: string;
}

/**
 * トークン交換レスポンスの型定義
 */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
  scope?: string;
}

/**
 * Auth0エラーレスポンスの型定義
 */
export interface Auth0ErrorResponse {
  error: string;
  error_description?: string;
  error_uri?: string;
}