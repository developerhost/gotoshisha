import jwt from "jsonwebtoken";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Env } from "@/types";
import { getAudienceForEnvironment } from "./auth-config";

export interface Auth0User {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
}

/**
 * Auth0 JWTトークンを検証してユーザー情報を取得
 * 本番環境用：適切な署名検証を実行
 */
export async function verifyAuth0Token(
  token: string,
  env?: Env,
  auth0Domain?: string,
  audience?: string
): Promise<Auth0User | null> {
  try {
    const domain =
      auth0Domain ||
      env?.EXPO_PUBLIC_AUTH0_DOMAIN ||
      process.env.EXPO_PUBLIC_AUTH0_DOMAIN;

    if (!domain) {
      throw new Error(
        "Auth0ドメインが設定されていません。EXPO_PUBLIC_AUTH0_DOMAINを設定してください。"
      );
    }
    const apiAudience =
      audience ||
      (env
        ? getAudienceForEnvironment(env)
        : process.env.AUTH0_AUDIENCE ||
          process.env.EXPO_PUBLIC_API_URL ||
          "http://localhost:8787");
    const jwksUri = `https://${domain}/.well-known/jwks.json`;
    const jwks = createRemoteJWKSet(new URL(jwksUri));

    const { payload } = await jwtVerify(token, jwks, {
      issuer: `https://${domain}/`,
      audience: apiAudience,
    });

    return {
      sub: payload.sub || "",
      email: payload.email as string | undefined,
      name: payload.name as string | undefined,
      picture: payload.picture as string | undefined,
      email_verified: payload.email_verified as boolean | undefined,
    };
  } catch (error) {
    console.error("JWT 検証エラー:", error);
    return null;
  }
}

/**
 * Auth0 JWTトークンをデコードしてユーザー情報を取得
 * 注意: これは検証なしのデコードです。開発環境のみで使用してください。
 */
export function decodeAuth0Token(token: string): Auth0User | null {
  try {
    // 検証なしでデコード（開発環境用）
    // 本番環境では verifyAuth0Token を使用してください
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;

    if (!decoded || typeof decoded !== "object") {
      return null;
    }

    return {
      sub: decoded.sub || "",
      email: decoded.email as string | undefined,
      name: decoded.name as string | undefined,
      picture: decoded.picture as string | undefined,
      email_verified: decoded.email_verified as boolean | undefined,
    };
  } catch (error) {
    console.error("JWT デコードエラー:", error);
    return null;
  }
}

/**
 * Authorization ヘッダーからベアラートークンを抽出
 */
export function extractBearerToken(
  authHeader: string | undefined
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7); // "Bearer " を除去
}

/**
 * リクエストされたユーザーIDと認証されたユーザーIDが一致するかチェック
 */
export function verifyUserAuthorization(
  requestedUserId: string,
  authenticatedUserId: string
): boolean {
  return requestedUserId === authenticatedUserId;
}
