import { describe, it, expect, beforeEach, vi } from "vitest";
import { Auth0Api } from "./auth0Api";
import { auth0Config } from "../../config/auth0";

// auth0設定のモック
vi.mock("../../config/auth0", () => ({
  auth0Config: {
    domain: "test.auth0.com",
    clientId: "test-client-id",
  },
}));

// fetchのモック
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.fetch = vi.fn() as any;

describe("Auth0Api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserInfo", () => {
    const mockAccessToken = "test-access-token";
    const mockUserInfo = {
      sub: "auth0|123456",
      name: "Test User",
      email: "test@example.com",
      email_verified: true,
      picture: "https://example.com/picture.jpg",
    };

    it("ユーザー情報を正常に取得できる", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserInfo,
      } as Response);

      const result = await Auth0Api.getUserInfo(mockAccessToken);

      expect(fetch).toHaveBeenCalledWith(
        `https://${auth0Config.domain}/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        }
      );
      expect(result).toEqual(mockUserInfo);
    });

    it("レスポンスがエラーの場合は例外をスロー", async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorized",
      } as Response);

      await expect(Auth0Api.getUserInfo(mockAccessToken)).rejects.toThrow(
        "ユーザー情報の取得に失敗: Unauthorized"
      );
    });

    it("fetchが失敗した場合は例外をスロー", async () => {
      const networkError = new Error("Network error");
      vi.mocked(fetch).mockRejectedValueOnce(networkError);

      await expect(Auth0Api.getUserInfo(mockAccessToken)).rejects.toThrow(
        networkError
      );
    });
  });

  describe("buildAuthorizationUrl", () => {
    it("正しい認可URLを構築できる", () => {
      const state = "test-state";
      const codeChallenge = "test-challenge";
      const redirectUri = "https://example.com/callback";

      const url = Auth0Api.buildAuthorizationUrl(
        state,
        codeChallenge,
        redirectUri
      );

      const expectedUrl = new URL(`https://${auth0Config.domain}/authorize`);
      expectedUrl.searchParams.set("client_id", auth0Config.clientId);
      expectedUrl.searchParams.set("response_type", "code");
      expectedUrl.searchParams.set("redirect_uri", redirectUri);
      expectedUrl.searchParams.set(
        "scope",
        "openid profile email offline_access"
      );
      expectedUrl.searchParams.set("state", state);
      expectedUrl.searchParams.set("code_challenge", codeChallenge);
      expectedUrl.searchParams.set("code_challenge_method", "S256");
      expectedUrl.searchParams.set(
        "audience",
        `https://${auth0Config.domain}/api/v2/`
      );

      expect(url).toBe(expectedUrl.toString());
    });
  });

  describe("validateConfig", () => {
    it("設定が有効な場合はtrueを返す", () => {
      expect(Auth0Api.validateConfig()).toBe(true);
    });

    it("domainが無い場合はfalseを返す", () => {
      const originalDomain = auth0Config.domain;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (auth0Config as any).domain = "";

      expect(Auth0Api.validateConfig()).toBe(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (auth0Config as any).domain = originalDomain;
    });

    it("clientIdが無い場合はfalseを返す", () => {
      const originalClientId = auth0Config.clientId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (auth0Config as any).clientId = "";

      expect(Auth0Api.validateConfig()).toBe(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (auth0Config as any).clientId = originalClientId;
    });
  });
});
