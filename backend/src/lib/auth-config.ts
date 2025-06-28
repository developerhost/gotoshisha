import type { Env } from "@/types";

/**
 * 環境別のAuth0設定を取得するヘルパー関数
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
 */
export function getAudienceForEnvironment(env: Env): string {
  if (env.ENVIRONMENT === 'development') {
    return env.AUTH0_AUDIENCE || 'http://localhost:8787';
  } else if (env.ENVIRONMENT === 'staging') {
    return env.AUTH0_AUDIENCE || 'https://gotoshisha-backend-staging.your-domain.com';
  } else if (env.ENVIRONMENT === 'production') {
    return env.AUTH0_AUDIENCE || 'https://gotoshisha-backend-prod.your-domain.com';
  }
  
  // フォールバック
  return env.AUTH0_AUDIENCE || env.EXPO_PUBLIC_API_URL || 'http://localhost:8787';
}
