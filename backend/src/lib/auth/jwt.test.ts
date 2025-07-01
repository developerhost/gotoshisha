/**
 * jwt.tsのテスト
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import { createRemoteJWKSet, jwtVerify } from "jose";
import type { D1Database } from "@cloudflare/workers-types";
import type { Env } from "@/types";
import {
  decodeAuth0Token,
  extractBearerToken,
  verifyAuth0Token,
  verifyUserAuthorization,
} from "./jwt";
import { getAudienceForEnvironment } from "./auth-config";

// モック設定
vi.mock("jsonwebtoken");
vi.mock("jose");
vi.mock("./auth-config");

describe("jwt", () => {
  const mockToken = "mock.jwt.token";
  const mockUser = {
    sub: "auth0|123456",
    email: "test@example.com",
    name: "Test User",
    picture: "https://example.com/avatar.jpg",
    email_verified: true,
  };

  const mockEnv: Env = {
    DB: {} as D1Database,
    ENVIRONMENT: "production",
    EXPO_PUBLIC_AUTH0_DOMAIN: "test.auth0.com",
    EXPO_PUBLIC_AUTH0_CLIENT_ID: "test-client-id",
    EXPO_PUBLIC_API_URL: "https://api.example.com",
    AUTH0_AUDIENCE: "https://api.example.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // console.errorのモック
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("verifyAuth0Token", () => {
    const mockJWKS = { mockJWKS: true };
    const mockVerifyResult = { payload: mockUser };

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(createRemoteJWKSet).mockReturnValue(mockJWKS as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(jwtVerify).mockResolvedValue(mockVerifyResult as any);
      vi.mocked(getAudienceForEnvironment).mockReturnValue(
        "https://api.example.com"
      );
    });

    it("正常にトークンを検証してユーザー情報を返す", async () => {
      const result = await verifyAuth0Token(mockToken, mockEnv);

      expect(createRemoteJWKSet).toHaveBeenCalledWith(
        new URL("https://test.auth0.com/.well-known/jwks.json")
      );
      expect(jwtVerify).toHaveBeenCalledWith(mockToken, mockJWKS, {
        issuer: "https://test.auth0.com/",
        audience: "https://api.example.com",
      });
      expect(result).toEqual(mockUser);
    });

    it("環境変数がない場合はエラーをスローする", async () => {
      const result = await verifyAuth0Token(mockToken);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "JWT 検証エラー:",
        expect.any(Error)
      );
    });

    it("カスタムドメインとオーディエンスを使用できる", async () => {
      const customDomain = "custom.auth0.com";
      const customAudience = "https://custom-api.com";

      await verifyAuth0Token(mockToken, mockEnv, customDomain, customAudience);

      expect(createRemoteJWKSet).toHaveBeenCalledWith(
        new URL(`https://${customDomain}/.well-known/jwks.json`)
      );
      expect(jwtVerify).toHaveBeenCalledWith(mockToken, mockJWKS, {
        issuer: `https://${customDomain}/`,
        audience: customAudience,
      });
    });

    it("ペイロードの一部が欠けている場合でも処理する", async () => {
      const partialPayload = { sub: "auth0|123456" };
      vi.mocked(jwtVerify).mockResolvedValue({
        payload: partialPayload,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const result = await verifyAuth0Token(mockToken, mockEnv);

      expect(result).toEqual({
        sub: "auth0|123456",
        email: undefined,
        name: undefined,
        picture: undefined,
        email_verified: undefined,
      });
    });

    it("subが欠けている場合は空文字列を設定する", async () => {
      const payloadWithoutSub = { email: "test@example.com" };
      vi.mocked(jwtVerify).mockResolvedValue({
        payload: payloadWithoutSub,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      const result = await verifyAuth0Token(mockToken, mockEnv);

      expect(result?.sub).toBe("");
    });

    it("検証エラーの場合はnullを返す", async () => {
      vi.mocked(jwtVerify).mockRejectedValue(new Error("Invalid token"));

      const result = await verifyAuth0Token(mockToken, mockEnv);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "JWT 検証エラー:",
        expect.any(Error)
      );
    });

    it("JWKSのURL作成エラーの場合はnullを返す", async () => {
      vi.mocked(createRemoteJWKSet).mockImplementation(() => {
        throw new Error("Invalid URL");
      });

      const result = await verifyAuth0Token(mockToken, mockEnv);

      expect(result).toBeNull();
    });
  });

  describe("decodeAuth0Token", () => {
    it("正常にトークンをデコードしてユーザー情報を返す", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(jwt.decode).mockReturnValue(mockUser as any);

      const result = decodeAuth0Token(mockToken);

      expect(jwt.decode).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockUser);
    });

    it("デコード結果がnullの場合はnullを返す", () => {
      vi.mocked(jwt.decode).mockReturnValue(null);

      const result = decodeAuth0Token(mockToken);

      expect(result).toBeNull();
    });

    it("デコード結果がオブジェクトでない場合はnullを返す", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(jwt.decode).mockReturnValue("not an object" as any);

      const result = decodeAuth0Token(mockToken);

      expect(result).toBeNull();
    });

    it("ペイロードの一部が欠けている場合でも処理する", () => {
      const partialPayload = { sub: "auth0|123456" };
      vi.mocked(jwt.decode).mockReturnValue(partialPayload);

      const result = decodeAuth0Token(mockToken);

      expect(result).toEqual({
        sub: "auth0|123456",
        email: undefined,
        name: undefined,
        picture: undefined,
        email_verified: undefined,
      });
    });

    it("subが欠けている場合は空文字列を設定する", () => {
      const payloadWithoutSub = { email: "test@example.com" };
      vi.mocked(jwt.decode).mockReturnValue(payloadWithoutSub);

      const result = decodeAuth0Token(mockToken);

      expect(result?.sub).toBe("");
    });

    it("デコードエラーの場合はnullを返す", () => {
      vi.mocked(jwt.decode).mockImplementation(() => {
        throw new Error("Decode error");
      });

      const result = decodeAuth0Token(mockToken);

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        "JWT デコードエラー:",
        expect.any(Error)
      );
    });
  });

  describe("extractBearerToken", () => {
    it("正しいBearerトークンを抽出する", () => {
      const authHeader = `Bearer ${mockToken}`;
      const result = extractBearerToken(authHeader);

      expect(result).toBe(mockToken);
    });

    it("Bearerプレフィックスがない場合はnullを返す", () => {
      const authHeader = `Basic ${mockToken}`;
      const result = extractBearerToken(authHeader);

      expect(result).toBeNull();
    });

    it("ヘッダーが未定義の場合はnullを返す", () => {
      const result = extractBearerToken(undefined);

      expect(result).toBeNull();
    });

    it("空文字列の場合はnullを返す", () => {
      const result = extractBearerToken("");

      expect(result).toBeNull();
    });

    it("Bearerのみの場合は空文字列を返す", () => {
      const result = extractBearerToken("Bearer ");

      expect(result).toBe("");
    });

    it("Bearer後に複数のスペースがある場合も正しく処理する", () => {
      const authHeader = `Bearer  ${mockToken}`;
      const result = extractBearerToken(authHeader);

      expect(result).toBe(` ${mockToken}`);
    });

    it("大文字小文字を厳密に区別する", () => {
      const authHeader = `bearer ${mockToken}`;
      const result = extractBearerToken(authHeader);

      expect(result).toBeNull();
    });
  });

  describe("verifyUserAuthorization", () => {
    it("同じユーザーIDの場合はtrueを返す", () => {
      const userId = "auth0|123456";
      const result = verifyUserAuthorization(userId, userId);

      expect(result).toBe(true);
    });

    it("異なるユーザーIDの場合はfalseを返す", () => {
      const requestedUserId = "auth0|123456";
      const authenticatedUserId = "auth0|789012";
      const result = verifyUserAuthorization(
        requestedUserId,
        authenticatedUserId
      );

      expect(result).toBe(false);
    });

    it("空文字列同士の比較はtrueを返す", () => {
      const result = verifyUserAuthorization("", "");

      expect(result).toBe(true);
    });

    it("大文字小文字を厳密に区別する", () => {
      const result = verifyUserAuthorization("auth0|ABC", "auth0|abc");

      expect(result).toBe(false);
    });

    it("前後の空白も厳密に区別する", () => {
      const result = verifyUserAuthorization("auth0|123 ", "auth0|123");

      expect(result).toBe(false);
    });
  });

  describe("process.env fallbacks", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it("process.envから値を読み取る", async () => {
      process.env.EXPO_PUBLIC_AUTH0_DOMAIN = "env.auth0.com";
      process.env.AUTH0_AUDIENCE = "https://env-api.com";

      const testMockJWKS = { mockJWKS: true };
      const testMockVerifyResult = { payload: mockUser };

      // モックをクリアして再セットアップ
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(createRemoteJWKSet).mockReturnValue(testMockJWKS as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(jwtVerify).mockResolvedValue(testMockVerifyResult as any);

      await verifyAuth0Token(mockToken);

      expect(createRemoteJWKSet).toHaveBeenCalledWith(
        new URL("https://env.auth0.com/.well-known/jwks.json")
      );
      expect(jwtVerify).toHaveBeenCalledWith(mockToken, testMockJWKS, {
        issuer: "https://env.auth0.com/",
        audience: "https://env-api.com",
      });
    });

    it("process.env.EXPO_PUBLIC_API_URLをフォールバックとして使用する", async () => {
      process.env.EXPO_PUBLIC_AUTH0_DOMAIN = "env.auth0.com";
      process.env.EXPO_PUBLIC_API_URL = "https://fallback-api.com";
      delete process.env.AUTH0_AUDIENCE;

      const testMockJWKS = { mockJWKS: true };
      const testMockVerifyResult = { payload: mockUser };

      // モックをクリアして再セットアップ
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(createRemoteJWKSet).mockReturnValue(testMockJWKS as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(jwtVerify).mockResolvedValue(testMockVerifyResult as any);

      await verifyAuth0Token(mockToken);

      expect(jwtVerify).toHaveBeenCalledWith(mockToken, testMockJWKS, {
        issuer: "https://env.auth0.com/",
        audience: "https://fallback-api.com",
      });
    });
  });
});
