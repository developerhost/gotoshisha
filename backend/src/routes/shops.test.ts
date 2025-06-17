/**
 * シーシャ店舗APIのテスト
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Hono } from "hono";
import shops from "./shops";
import {
  createMockPrisma,
  mockShop,
  mockShopCreateInput,
  mockShopUpdateInput,
  mockShopWithRelations,
} from "../test/helpers";

// テスト用のHonoアプリケーション
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTestApp = (mockPrisma: any, userId?: string) => {
  const app = new Hono<{
    Variables: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      prisma: any;
      userId?: string;
    };
  }>();

  // ミドルウェアでモックPrismaとuserIdを設定
  app.use("*", async (c, next) => {
    c.set("prisma", mockPrisma);
    if (userId) {
      c.set("userId", userId);
    }
    await next();
  });

  app.route("/", shops);
  return app;
};

describe("Shops API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /", () => {
    it("店舗一覧を取得できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findMany.mockResolvedValue([mockShopWithRelations]);
      mockPrisma.shop.count.mockResolvedValue(1);

      const app = createTestApp(mockPrisma);

      const req = new Request(
        "http://localhost/?page=1&limit=20&sortBy=createdAt&sortOrder=desc",
        {
          method: "GET",
        }
      );

      const res = await app.request(req);
      expect(res.status).toBe(200);

      expect(mockPrisma.shop.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 0,
        take: 20,
        orderBy: { createdAt: "desc" },
        include: expect.any(Object),
      });

      const data = await res.json();
      expect(data).toEqual({
        shops: expect.arrayContaining([
          expect.objectContaining({
            id: "test-shop-id",
            name: "テストシーシャ店",
            flavors: expect.arrayContaining([
              expect.objectContaining({ name: "ミント" }),
            ]),
            reviewCount: 1,
          }),
        ]),
        pagination: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        },
      });
    });

    it("検索条件で絞り込みができること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findMany.mockResolvedValue([]);
      mockPrisma.shop.count.mockResolvedValue(0);

      const app = createTestApp(mockPrisma);

      const req = new Request(
        "http://localhost/?page=1&limit=20&search=シーシャ&wifi=true&budgetMin=2000&sortBy=name&sortOrder=asc",
        {
          method: "GET",
        }
      );

      const res = await app.request(req);
      expect(res.status).toBe(200);

      expect(mockPrisma.shop.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: "シーシャ" } },
            { address: { contains: "シーシャ" } },
            { nearestStation: { contains: "シーシャ" } },
          ],
          wifi: true,
          budgetMin: { gte: 2000 },
        },
        skip: 0,
        take: 20,
        orderBy: { name: "asc" },
        include: expect.any(Object),
      });
    });
  });

  describe("GET /:id", () => {
    it("店舗詳細を取得できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findUnique.mockResolvedValue(mockShopWithRelations);

      const app = createTestApp(mockPrisma);

      const req = new Request("http://localhost/test-shop-id", {
        method: "GET",
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      expect(mockPrisma.shop.findUnique).toHaveBeenCalledWith({
        where: { id: "test-shop-id" },
        include: expect.objectContaining({
          shopFlavors: expect.any(Object),
          reviews: expect.any(Object),
        }),
      });
    });

    it("存在しない店舗の場合404エラーを返すこと", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findUnique.mockResolvedValue(null);

      const app = createTestApp(mockPrisma);

      const req = new Request("http://localhost/non-existent-id", {
        method: "GET",
      });

      const res = await app.request(req);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("認証済みユーザーが店舗を作成できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.create.mockResolvedValue({
        ...mockShop,
        ...mockShopCreateInput,
        _count: { reviews: 0 },
      });

      const app = createTestApp(mockPrisma, "test-user-id");

      const req = new Request("http://localhost/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockShopCreateInput),
      });

      const res = await app.request(req);
      expect(res.status).toBe(201);

      expect(mockPrisma.shop.create).toHaveBeenCalledWith({
        data: mockShopCreateInput,
        include: {
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      });
    });

    it("未認証の場合401エラーを返すこと", async () => {
      const mockPrisma = createMockPrisma();

      const app = createTestApp(mockPrisma); // userIdなし

      const req = new Request("http://localhost/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockShopCreateInput),
      });

      const res = await app.request(req);
      expect(res.status).toBe(401);
    });
  });

  describe("PUT /:id", () => {
    it("認証済みユーザーが店舗を更新できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findUnique.mockResolvedValue(mockShop);
      mockPrisma.shop.update.mockResolvedValue({
        ...mockShopWithRelations,
        ...mockShopUpdateInput,
      });

      const app = createTestApp(mockPrisma, "test-user-id");

      const req = new Request("http://localhost/test-shop-id", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockShopUpdateInput),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      expect(mockPrisma.shop.update).toHaveBeenCalledWith({
        where: { id: "test-shop-id" },
        data: mockShopUpdateInput,
        include: expect.any(Object),
      });
    });

    it("存在しない店舗の場合404エラーを返すこと", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findUnique.mockResolvedValue(null);

      const app = createTestApp(mockPrisma, "test-user-id");

      const req = new Request("http://localhost/non-existent-id", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockShopUpdateInput),
      });

      const res = await app.request(req);
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /:id", () => {
    it("認証済みユーザーが店舗を削除できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findUnique.mockResolvedValue(mockShop);
      mockPrisma.shop.delete.mockResolvedValue(mockShop);

      const app = createTestApp(mockPrisma, "test-user-id");

      const req = new Request("http://localhost/test-shop-id", {
        method: "DELETE",
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      expect(mockPrisma.shop.delete).toHaveBeenCalledWith({
        where: { id: "test-shop-id" },
      });

      const data = await res.json();
      expect(data).toEqual({
        message: "店舗を削除しました",
      });
    });
  });

  describe("POST /:id/relations", () => {
    it("フレーバーを追加できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shop.findUnique.mockResolvedValue(mockShop);
      mockPrisma.shopFlavor.create.mockResolvedValue({
        shopId: "test-shop-id",
        flavorId: "flavor-3",
      });

      const app = createTestApp(mockPrisma, "test-user-id");

      const req = new Request("http://localhost/test-shop-id/relations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId: "test-shop-id", flavorId: "flavor-3" }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(201);

      expect(mockPrisma.shopFlavor.create).toHaveBeenCalledWith({
        data: {
          shopId: "test-shop-id",
          flavorId: "flavor-3",
        },
      });

      const data = await res.json();
      expect(data).toEqual({
        message: "関連要素を追加しました",
      });
    });
  });

  describe("DELETE /:id/relations", () => {
    it("フレーバーを削除できること", async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.shopFlavor.delete.mockResolvedValue({
        shopId: "test-shop-id",
        flavorId: "flavor-1",
      });

      const app = createTestApp(mockPrisma, "test-user-id");

      const req = new Request("http://localhost/test-shop-id/relations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopId: "test-shop-id", flavorId: "flavor-1" }),
      });

      const res = await app.request(req);
      expect(res.status).toBe(200);

      expect(mockPrisma.shopFlavor.delete).toHaveBeenCalledWith({
        where: {
          shopId_flavorId: {
            shopId: "test-shop-id",
            flavorId: "flavor-1",
          },
        },
      });

      const data = await res.json();
      expect(data).toEqual({
        message: "関連要素を削除しました",
      });
    });
  });
});
