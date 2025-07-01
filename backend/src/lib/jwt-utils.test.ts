/**
 * jwt-utils.tsのテスト
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { D1Database } from "@cloudflare/workers-types";
import type { Env } from "@/types";
import { verifyTokenByEnvironment } from "./jwt-utils";
import { decodeAuth0Token, verifyAuth0Token } from "./jwt";

// jwt.tsのモック
vi.mock("./jwt", () => ({
  decodeAuth0Token: vi.fn(),
  verifyAuth0Token: vi.fn(),
}));

describe("jwt-utils", () => {
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
    ENVIRONMENT: "development",
    EXPO_PUBLIC_AUTH0_DOMAIN: "test.auth0.com",
    EXPO_PUBLIC_AUTH0_CLIENT_ID: "test-client-id",
    EXPO_PUBLIC_API_URL: "http://localhost:8787",
    AUTH0_AUDIENCE: "http://localhost:8787",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("verifyTokenByEnvironment", () => {
    describe("開発環境", () => {
      it("開発環境ではdecodeAuth0Tokenを使用する", async () => {
        const devEnv = { ...mockEnv, ENVIRONMENT: "development" };
        vi.mocked(decodeAuth0Token).mockReturnValue(mockUser);

        const result = await verifyTokenByEnvironment(mockToken, devEnv);

        expect(decodeAuth0Token).toHaveBeenCalledWith(mockToken);
        expect(verifyAuth0Token).not.toHaveBeenCalled();
        expect(result).toEqual(mockUser);
      });

      it("decodeAuth0Tokenがnullを返す場合はnullを返す", async () => {
        const devEnv = { ...mockEnv, ENVIRONMENT: "development" };
        vi.mocked(decodeAuth0Token).mockReturnValue(null);

        const result = await verifyTokenByEnvironment(mockToken, devEnv);

        expect(decodeAuth0Token).toHaveBeenCalledWith(mockToken);
        expect(result).toBeNull();
      });
    });

    describe("本番環境", () => {
      it("本番環境ではverifyAuth0Tokenを使用する", async () => {
        const prodEnv = { ...mockEnv, ENVIRONMENT: "production" };
        vi.mocked(verifyAuth0Token).mockResolvedValue(mockUser);

        const result = await verifyTokenByEnvironment(mockToken, prodEnv);

        expect(verifyAuth0Token).toHaveBeenCalledWith(
          mockToken,
          prodEnv,
          "test.auth0.com"
        );
        expect(decodeAuth0Token).not.toHaveBeenCalled();
        expect(result).toEqual(mockUser);
      });

      it("verifyAuth0Tokenがnullを返す場合はnullを返す", async () => {
        const prodEnv = { ...mockEnv, ENVIRONMENT: "production" };
        vi.mocked(verifyAuth0Token).mockResolvedValue(null);

        const result = await verifyTokenByEnvironment(mockToken, prodEnv);

        expect(verifyAuth0Token).toHaveBeenCalledWith(
          mockToken,
          prodEnv,
          "test.auth0.com"
        );
        expect(result).toBeNull();
      });

      it("verifyAuth0Tokenがエラーをスローした場合はエラーが伝播する", async () => {
        const prodEnv = { ...mockEnv, ENVIRONMENT: "production" };
        const error = new Error("JWT verification failed");
        vi.mocked(verifyAuth0Token).mockRejectedValue(error);

        await expect(
          verifyTokenByEnvironment(mockToken, prodEnv)
        ).rejects.toThrow("JWT verification failed");
      });
    });

    describe("ステージング環境", () => {
      it("ステージング環境でもverifyAuth0Tokenを使用する", async () => {
        const stagingEnv = { ...mockEnv, ENVIRONMENT: "staging" };
        vi.mocked(verifyAuth0Token).mockResolvedValue(mockUser);

        const result = await verifyTokenByEnvironment(mockToken, stagingEnv);

        expect(verifyAuth0Token).toHaveBeenCalledWith(
          mockToken,
          stagingEnv,
          "test.auth0.com"
        );
        expect(decodeAuth0Token).not.toHaveBeenCalled();
        expect(result).toEqual(mockUser);
      });
    });

    describe("環境変数の処理", () => {
      it("EXPO_PUBLIC_AUTH0_DOMAINが未定義でもverifyAuth0Tokenに渡される", async () => {
        const envWithoutDomain = {
          ...mockEnv,
          ENVIRONMENT: "production",
          EXPO_PUBLIC_AUTH0_DOMAIN: undefined as unknown as string,
        };
        vi.mocked(verifyAuth0Token).mockResolvedValue(mockUser);

        await verifyTokenByEnvironment(mockToken, envWithoutDomain);

        expect(verifyAuth0Token).toHaveBeenCalledWith(
          mockToken,
          envWithoutDomain,
          undefined
        );
      });

      it("空文字の環境変数でも本番環境として扱われる", async () => {
        const emptyEnv = { ...mockEnv, ENVIRONMENT: "" };
        vi.mocked(verifyAuth0Token).mockResolvedValue(mockUser);

        await verifyTokenByEnvironment(mockToken, emptyEnv);

        expect(verifyAuth0Token).toHaveBeenCalled();
        expect(decodeAuth0Token).not.toHaveBeenCalled();
      });
    });

    describe("ユーザー情報の型", () => {
      it("部分的なユーザー情報でも正しく処理される", async () => {
        const partialUser = {
          sub: "auth0|123456",
          email: "test@example.com",
          // name, picture, email_verifiedは省略
        };
        const devEnv = { ...mockEnv, ENVIRONMENT: "development" };
        vi.mocked(decodeAuth0Token).mockReturnValue(partialUser);

        const result = await verifyTokenByEnvironment(mockToken, devEnv);

        expect(result).toEqual(partialUser);
        expect(result?.name).toBeUndefined();
        expect(result?.picture).toBeUndefined();
      });
    });
  });
});
