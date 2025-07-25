/**
 * シーシャ店舗APIクライアントのテスト
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ShopsApi } from "./shopsApi";
import { BaseApi } from "./baseApi";
import { Logger } from "../utils/logger";

// BaseApiのモック
vi.mock("./baseApi", () => ({
  BaseApi: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ShopsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getShops", () => {
    it("店舗一覧を取得できること", async () => {
      const mockResponse = {
        success: true,
        data: {
          shops: [
            { id: "1", name: "店舗1" },
            { id: "2", name: "店舗2" },
          ],
          pagination: {
            page: 1,
            limit: 20,
            total: 2,
            totalPages: 1,
          },
        },
      };

      vi.mocked(BaseApi.get).mockResolvedValue(mockResponse);

      const result = await ShopsApi.getShops({ page: 1, limit: 20 });

      expect(BaseApi.get).toHaveBeenCalledWith("/api/shops", {
        page: 1,
        limit: 20,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("エラーレスポンスの場合、エラーをスローすること", async () => {
      const mockResponse = {
        success: false,
        error: "サーバーエラー",
      };

      vi.mocked(BaseApi.get).mockResolvedValue(mockResponse);

      await expect(ShopsApi.getShops()).rejects.toThrow("サーバーエラー");
    });
  });

  describe("getShop", () => {
    it("店舗詳細を取得できること", async () => {
      const mockShop = {
        id: "test-id",
        name: "テスト店舗",
        address: "東京都",
      };

      const mockResponse = {
        success: true,
        data: mockShop,
      };

      vi.mocked(BaseApi.get).mockResolvedValue(mockResponse);

      const result = await ShopsApi.getShop("test-id");

      expect(BaseApi.get).toHaveBeenCalledWith("/api/shops/test-id");
      expect(result).toEqual(mockShop);
    });
  });

  describe("createShop", () => {
    it("店舗を作成できること", async () => {
      const createData = {
        name: "新規店舗",
        address: "東京都新宿区",
        wifi: true,
      };

      const mockResponse = {
        success: true,
        data: { id: "new-id", ...createData },
      };

      vi.mocked(BaseApi.post).mockResolvedValue(mockResponse);

      const result = await ShopsApi.createShop(createData);

      expect(BaseApi.post).toHaveBeenCalledWith("/api/shops", createData);
      expect(result).toEqual(mockResponse.data);
    });

    it("JSON形式のフィールドを文字列に変換すること", async () => {
      const createData = {
        name: "新規店舗",
        address: "東京都",
        photos: ["https://example.com/photo1.jpg"],
        openingHours: { monday: { open: "10:00", close: "22:00" } },
        snsLinks: { twitter: "https://twitter.com/example" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;

      const mockResponse = {
        success: true,
        data: { id: "new-id" },
      };

      vi.mocked(BaseApi.post).mockResolvedValue(mockResponse);

      await ShopsApi.createShop(createData);

      expect(BaseApi.post).toHaveBeenCalledWith("/api/shops", {
        name: "新規店舗",
        address: "東京都",
        photos: JSON.stringify(["https://example.com/photo1.jpg"]),
        openingHours: JSON.stringify({
          monday: { open: "10:00", close: "22:00" },
        }),
        snsLinks: JSON.stringify({ twitter: "https://twitter.com/example" }),
      });
    });
  });

  describe("updateShop", () => {
    it("店舗を更新できること", async () => {
      const updateData = {
        name: "更新後の店舗",
        wifi: false,
      };

      const mockResponse = {
        success: true,
        data: { id: "test-id", ...updateData },
      };

      vi.mocked(BaseApi.put).mockResolvedValue(mockResponse);

      const result = await ShopsApi.updateShop("test-id", updateData);

      expect(BaseApi.put).toHaveBeenCalledWith(
        "/api/shops/test-id",
        updateData
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("deleteShop", () => {
    it("店舗を削除できること", async () => {
      const mockResponse = {
        success: true,
        data: { message: "削除しました" },
      };

      vi.mocked(BaseApi.delete).mockResolvedValue(mockResponse);

      await ShopsApi.deleteShop("test-id");

      expect(BaseApi.delete).toHaveBeenCalledWith("/api/shops/test-id");
    });
  });

  describe("searchNearbyShops", () => {
    it("近くの店舗を検索できること", async () => {
      const mockResponse = {
        success: true,
        data: {
          shops: [{ id: "1", name: "近くの店舗" }],
          pagination: {
            page: 1,
            limit: 20,
            total: 1,
            totalPages: 1,
          },
        },
      };

      vi.mocked(BaseApi.get).mockResolvedValue(mockResponse);

      const result = await ShopsApi.searchNearbyShops(35.658584, 139.701742, 5);

      expect(BaseApi.get).toHaveBeenCalledWith("/api/shops", {
        latitude: 35.658584,
        longitude: 139.701742,
        radius: 5,
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("addShopRelation", () => {
    it("関連要素を追加できること", async () => {
      const mockResponse = {
        success: true,
        data: { message: "追加しました" },
      };

      vi.mocked(BaseApi.post).mockResolvedValue(mockResponse);

      await ShopsApi.addShopRelation("shop-id", { flavorId: "flavor-id" });

      expect(BaseApi.post).toHaveBeenCalledWith(
        "/api/shops/shop-id/relations",
        {
          shopId: "shop-id",
          flavorId: "flavor-id",
        }
      );
    });
  });

  describe("removeShopRelation", () => {
    it("関連要素を削除できること", async () => {
      const mockResponse = {
        success: true,
        data: { message: "削除しました" },
      };

      vi.mocked(BaseApi.delete).mockResolvedValue(mockResponse);

      await ShopsApi.removeShopRelation("shop-id", {
        atmosphereId: "atmosphere-id",
      });

      expect(BaseApi.delete).toHaveBeenCalledWith(
        "/api/shops/shop-id/relations",
        {
          shopId: "shop-id",
          atmosphereId: "atmosphere-id",
        }
      );
    });
  });

  describe("parseJsonField", () => {
    it("有効なJSON文字列をパースできること", () => {
      const jsonString = '["item1", "item2"]';
      const result = ShopsApi.parseJsonField<string[]>(jsonString);
      expect(result).toEqual(["item1", "item2"]);
    });

    it("無効なJSON文字列の場合undefinedを返すこと", () => {
      const invalidJson = "not json";
      const result = ShopsApi.parseJsonField(invalidJson);

      expect(result).toBeUndefined();
      // Logger.errorが呼ばれたことを確認
      expect(Logger.error).toHaveBeenCalledWith(
        "Failed to parse JSON field:",
        expect.any(SyntaxError)
      );
    });

    it("undefinedの場合undefinedを返すこと", () => {
      const result = ShopsApi.parseJsonField(undefined);
      expect(result).toBeUndefined();
    });
  });

  describe("formatShop", () => {
    it("店舗データのJSONフィールドをパースすること", () => {
      const shop = {
        id: "test-id",
        name: "テスト店舗",
        photos: '["photo1.jpg", "photo2.jpg"]',
        openingHours: '{"monday": {"open": "10:00", "close": "22:00"}}',
        snsLinks: '{"twitter": "https://twitter.com/example"}',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;

      const formatted = ShopsApi.formatShop(shop);

      expect(formatted.photos).toEqual(["photo1.jpg", "photo2.jpg"]);
      expect(formatted.openingHours).toEqual({
        monday: { open: "10:00", close: "22:00" },
      });
      expect(formatted.snsLinks).toEqual({
        twitter: "https://twitter.com/example",
      });
    });
  });
});
