/**
 * プロフィールAPIのテスト
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Hono } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import profile from "./profile";
import type { Env } from "@/types";

// JWTユーティリティのモック
vi.mock("@/lib/auth/jwt", () => ({
  extractBearerToken: vi.fn(),
  verifyUserAuthorization: vi.fn(),
}));

vi.mock("@/lib/auth/jwt-utils", () => ({
  verifyTokenByEnvironment: vi.fn(),
}));

// Prismaのモック
const mockPrismaInstance = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn(() => mockPrismaInstance),
}));

vi.mock("@prisma/adapter-d1", () => ({
  PrismaD1: vi.fn(),
}));

import { extractBearerToken, verifyUserAuthorization } from "@/lib/auth/jwt";
import { verifyTokenByEnvironment } from "@/lib/auth/jwt-utils";

// テスト用のモックデータ
const mockUser = {
  id: "auth0|123456",
  email: "test@example.com",
  name: "Test User",
  bio: "テストユーザーです",
  avatar: "https://example.com/avatar.jpg",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
};

const mockTokenUser = {
  sub: "auth0|123456",
  email: "test@example.com",
  name: "Test User",
  picture: "https://example.com/avatar.jpg",
  email_verified: true,
};

const mockEnv: Env = {
  DB: {} as D1Database,
  ENVIRONMENT: "test",
  EXPO_PUBLIC_AUTH0_DOMAIN: "test.auth0.com",
  EXPO_PUBLIC_AUTH0_CLIENT_ID: "test-client-id",
  EXPO_PUBLIC_API_URL: "https://api.test.com",
  AUTH0_AUDIENCE: "https://api.test.com",
};

// テスト用のHonoアプリケーション
const createTestApp = () => {
  const app = new Hono<{ Bindings: Env }>();

  // ミドルウェアでモック環境変数を設定
  app.use("*", async (c, next) => {
    // 環境変数を設定
    c.env = mockEnv;
    await next();
  });

  app.route("/", profile);
  return app;
};

describe("Profile API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /:userId/retrieve", () => {
    it("既存ユーザーのプロフィールを取得できること", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(mockUser);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as typeof mockUser;
      expect(data).toEqual(mockUser);
      expect(mockPrismaInstance.user.findUnique).toHaveBeenCalledWith({
        where: { id: "auth0|123456" },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          createdAt: true,
        },
      });
    });

    it("ユーザーが存在しない場合に認証付きで新規作成できること", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);
      mockPrismaInstance.user.create.mockResolvedValue(mockUser);

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as typeof mockUser;
      expect(data).toEqual(mockUser);
      expect(mockPrismaInstance.user.create).toHaveBeenCalledWith({
        data: {
          id: "auth0|123456",
          email: "test@example.com",
          name: "Test User",
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          createdAt: true,
        },
      });
    });

    it("ユーザー情報の検証に失敗した場合はトークン情報を使用すること", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);
      mockPrismaInstance.user.create.mockResolvedValue(mockUser);

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          user: {
            email: "different@example.com", // トークンと異なるメール
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      // トークンの情報が使用されることを確認
      expect(mockPrismaInstance.user.create).toHaveBeenCalledWith({
        data: {
          id: "auth0|123456",
          email: "test@example.com", // トークンのメールが使用される
          name: "Test User",
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          createdAt: true,
        },
      });
    });

    it("認証なしでユーザー作成を試みた場合は401エラーを返すこと", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);

      vi.mocked(extractBearerToken).mockReturnValue(null);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(401);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe(
        "認証が必要です。有効なアクセストークンを提供してください。"
      );
    });

    it("メールアドレス重複エラーの場合は409エラーを返すこと", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);
      mockPrismaInstance.user.create.mockRejectedValue(
        new Error("UNIQUE constraint failed: User.email")
      );

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(409);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("このメールアドレスは既に使用されています。");
    });

    it("無効なメールアドレスの場合は400エラーを返すこと", async () => {
      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: "invalid-email", // 無効なメールアドレス
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(400);
    });
  });

  describe("GET /:userId", () => {
    it("既存ユーザーのプロフィールを取得できること", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(mockUser);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "GET",
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as typeof mockUser;
      expect(data).toEqual(mockUser);
    });

    it("ユーザーが存在しない場合に認証付きで新規作成できること", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);
      mockPrismaInstance.user.create.mockResolvedValue(mockUser);

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "GET",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as typeof mockUser;
      expect(data).toEqual(mockUser);
    });

    it("認証なしでユーザー作成を試みた場合は401エラーを返すこと", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);

      vi.mocked(extractBearerToken).mockReturnValue(null);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "GET",
      });

      const res = await app.request(req);
      expect(res.status).toBe(401);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe(
        "認証が必要です。有効なアクセストークンを提供してください。"
      );
    });
  });

  describe("PUT /:userId", () => {
    it("認証済みユーザーが自分のプロフィールを更新できること", async () => {
      const updatedUser = {
        ...mockUser,
        name: "Updated Name",
        bio: "Updated bio",
      };

      mockPrismaInstance.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaInstance.user.update.mockResolvedValue(updatedUser);

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);
      vi.mocked(verifyUserAuthorization).mockReturnValue(true);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          name: "Updated Name",
          bio: "Updated bio",
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      const data = (await res.json()) as typeof updatedUser;
      expect(data).toEqual(updatedUser);
      expect(mockPrismaInstance.user.update).toHaveBeenCalledWith({
        where: { id: "auth0|123456" },
        data: {
          name: "Updated Name",
          bio: "Updated bio",
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          updatedAt: true,
        },
      });
    });

    it("認証なしの場合は401エラーを返すこと", async () => {
      vi.mocked(extractBearerToken).mockReturnValue(null);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Updated Name",
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(401);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe(
        "認証トークンが必要です。他のユーザーのプロフィールは編集できません。"
      );
    });

    it("無効なトークンの場合は401エラーを返すこと", async () => {
      vi.mocked(extractBearerToken).mockReturnValue("invalid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(null);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer invalid-token",
        },
        body: JSON.stringify({
          name: "Updated Name",
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(401);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("無効な認証トークンです。");
    });

    it("他のユーザーのプロフィール更新を試みた場合は403エラーを返すこと", async () => {
      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);
      vi.mocked(verifyUserAuthorization).mockReturnValue(false);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C789012", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          name: "Updated Name",
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(403);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("他のユーザーのプロフィールは編集できません。");
    });

    it("存在しないユーザーの場合は404エラーを返すこと", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(null);

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);
      vi.mocked(verifyUserAuthorization).mockReturnValue(true);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          name: "Updated Name",
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(404);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("ユーザーが見つかりません");
    });

    it("名前が100文字を超える場合は400エラーを返すこと", async () => {
      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);
      vi.mocked(verifyUserAuthorization).mockReturnValue(true);

      const app = createTestApp();

      const longName = "a".repeat(101); // 101文字

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          name: longName,
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(400);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("名前は100文字以内で入力してください");
    });

    it("自己紹介が500文字を超える場合は400エラーを返すこと", async () => {
      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);
      vi.mocked(verifyUserAuthorization).mockReturnValue(true);

      const app = createTestApp();

      const longBio = "a".repeat(501); // 501文字

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          bio: longBio,
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(400);

      const data = (await res.json()) as {
        error: { issues: { message: string }[] };
      };
      expect(data).toHaveProperty("error");
      expect(data.error).toHaveProperty("issues");
      expect(data.error.issues[0].message).toContain(
        "String must contain at most 500 character(s)"
      );
    });

    it("空白のトリミングが正しく行われること", async () => {
      const updatedUser = {
        ...mockUser,
        name: "Trimmed Name",
        bio: "Trimmed bio",
      };

      mockPrismaInstance.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaInstance.user.update.mockResolvedValue(updatedUser);

      vi.mocked(extractBearerToken).mockReturnValue("valid-token");
      vi.mocked(verifyTokenByEnvironment).mockResolvedValue(mockTokenUser);
      vi.mocked(verifyUserAuthorization).mockReturnValue(true);

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({
          name: "  Trimmed Name  ",
          bio: "  Trimmed bio  ",
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      // トリミングされた値で更新されることを確認
      expect(mockPrismaInstance.user.update).toHaveBeenCalledWith({
        where: { id: "auth0|123456" },
        data: {
          name: "Trimmed Name",
          bio: "Trimmed bio",
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          avatar: true,
          updatedAt: true,
        },
      });
    });
  });

  describe("URLデコード", () => {
    it("エンコードされたユーザーIDを正しくデコードすること", async () => {
      mockPrismaInstance.user.findUnique.mockResolvedValue(mockUser);

      const app = createTestApp();

      // URLエンコードされたユーザーID
      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      // デコードされたIDでクエリが実行されることを確認
      expect(mockPrismaInstance.user.findUnique).toHaveBeenCalledWith({
        where: { id: "auth0|123456" },
        select: expect.any(Object),
      });
    });
  });

  describe("エラーハンドリング", () => {
    it("予期しないエラーの場合は500エラーを返すこと", async () => {
      mockPrismaInstance.user.findUnique.mockRejectedValue(
        new Error("Database error")
      );

      const app = createTestApp();

      const req = new Request("http://localhost/auth0%7C123456/retrieve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email: "test@example.com",
            name: "Test User",
          },
        }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(500);

      const data = (await res.json()) as { error: string };
      expect(data.error).toBe("サーバーエラーが発生しました");
    });
  });
});
