import { auth0Config } from "../../config/auth0";

interface Address {
  formatted?: string;
  street_address?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country?: string;
}

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
 * Auth0 API ユーティリティ関数
 */
export class Auth0Api {
  private static baseUrl = `https://${auth0Config.domain}`;

  /**
   * Auth0からユーザー情報を取得
   * @param accessToken - 認証から取得したアクセストークン
   * @returns ユーザー情報
   */
  static async getUserInfo(accessToken: string): Promise<UserInfo> {
    const response = await fetch(`${Auth0Api.baseUrl}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`ユーザー情報の取得に失敗: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Auth0の認可URLを構築
   * @param state - セキュリティ用のstateパラメータ
   * @param codeChallenge - PKCEコードチャレンジ
   * @param redirectUri - 認証後のリダイレクトURI
   * @returns 認可URL
   */
  static buildAuthorizationUrl(
    state: string,
    codeChallenge: string,
    redirectUri: string
  ): string {
    const params = new URLSearchParams({
      client_id: auth0Config.clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: "openid profile email offline_access",
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      audience: `${Auth0Api.baseUrl}/api/v2/`,
    });

    return `${Auth0Api.baseUrl}/authorize?${params.toString()}`;
  }

  /**
   * 認可コードをアクセストークンと交換
   * @param code - 認可コード
   * @param redirectUri - リダイレクトURI
   * @param codeVerifier - PKCEコード検証器
   * @returns トークンレスポンス
   */
  static async exchangeCodeForToken(
    code: string,
    redirectUri: string,
    codeVerifier: string
  ): Promise<{ access_token: string; token_type: string; expires_in: number }> {
    const response = await fetch(`${Auth0Api.baseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: auth0Config.clientId,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `トークン交換に失敗: ${
          errorData.error_description || response.statusText
        }`
      );
    }

    return response.json();
  }

  /**
   * Auth0設定を検証
   * @returns 設定が有効な場合はtrue
   */
  static validateConfig(): boolean {
    return !!(auth0Config.domain && auth0Config.clientId);
  }
}
