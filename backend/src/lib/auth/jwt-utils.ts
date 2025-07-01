/**
 * JWT関連のユーティリティ関数
 */

import type { Env } from "@/types";
import type { Auth0User } from "./jwt";
import { decodeAuth0Token, verifyAuth0Token } from "./jwt";

/**
 * 環境に応じてJWTトークンを検証
 *
 * @param token - 検証するJWTトークン
 * @param env - 環境変数（ENVIRONMENTとAUTH0_DOMAINを含む）
 * @returns 検証されたユーザー情報、または検証失敗時はnull
 *
 * @remarks
 * - 開発環境: 署名検証をスキップして高速にデコード
 * - 本番環境: Auth0のJWKSを使用して完全な署名検証を実行
 */
export async function verifyTokenByEnvironment(
  token: string,
  env: Env
): Promise<Auth0User | null> {
  return env.ENVIRONMENT === "development"
    ? decodeAuth0Token(token)
    : await verifyAuth0Token(token, env, env.EXPO_PUBLIC_AUTH0_DOMAIN);
}
