/**
 * Auth0設定管理モジュール
 *
 * 環境変数からAuth0の設定情報を取得し、環境別に適切な設定を提供します。
 * - Auth0ドメイン、クライアントID、オーディエンスの取得
 * - JWT検証用設定の提供
 * - 環境別オーディエンス値の決定
 */

import type { Env } from "@/types";

/**
 * 環境別のAuth0設定を取得するヘルパー関数
 * @param env Cloudflare Workers環境変数
 * @returns Auth0設定オブジェクト
 */
export function getAuth0Config(env: Env) {
  return {
    domain: env.EXPO_PUBLIC_AUTH0_DOMAIN,
    clientId: env.EXPO_PUBLIC_AUTH0_CLIENT_ID,
    audience: env.AUTH0_AUDIENCE,
    apiUrl: env.EXPO_PUBLIC_API_URL,
  };
}

/**
 * 本番環境でのJWT検証用の設定を取得
 * @param env Cloudflare Workers環境変数
 * @returns JWT検証に必要な設定（ドメイン、オーディエンス、イシュアー）
 */
export function getJWTVerificationConfig(env: Env) {
  const config = getAuth0Config(env);

  return {
    domain: config.domain,
    audience: config.audience,
    issuer: `https://${config.domain}/`,
  };
}

/**
 * 環境に応じた適切なAudience値を取得
 * 開発環境ではlocalhost、本番環境では実際のドメインを使用
 * @param env Cloudflare Workers環境変数
 * @returns 環境に応じたオーディエンス文字列
 */
export function getAudienceForEnvironment(env: Env): string {
  if (env.ENVIRONMENT === "development") {
    return env.AUTH0_AUDIENCE || "http://localhost:8787";
  } else if (env.ENVIRONMENT === "staging") {
    return (
      env.AUTH0_AUDIENCE || "https://gotoshisha-backend-staging.your-domain.com"
    );
  } else if (env.ENVIRONMENT === "production") {
    return (
      env.AUTH0_AUDIENCE || "https://gotoshisha-backend-prod.your-domain.com"
    );
  }

  // フォールバック
  return (
    env.AUTH0_AUDIENCE || env.EXPO_PUBLIC_API_URL || "http://localhost:8787"
  );
}
