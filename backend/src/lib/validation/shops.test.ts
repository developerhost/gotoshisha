/**
 * シーシャ店舗バリデーションスキーマのテスト
 */
import { describe, expect, it } from "vitest";
import {
  OpeningHoursSchema,
  ReservationStatus,
  ShopCreateSchema,
  ShopIdSchema,
  ShopQuerySchema,
  ShopRelationCreateSchema,
  SmokingPolicy,
  SnsLinksSchema,
} from "./shops";

describe("Shop Validation Schemas", () => {
  describe("ReservationStatus", () => {
    it("有効な予約ステータスを受け入れること", () => {
      expect(ReservationStatus.parse("REQUIRED")).toBe("REQUIRED");
      expect(ReservationStatus.parse("RECOMMENDED")).toBe("RECOMMENDED");
      expect(ReservationStatus.parse("NOT_REQUIRED")).toBe("NOT_REQUIRED");
    });

    it("無効な予約ステータスを拒否すること", () => {
      expect(() => ReservationStatus.parse("INVALID")).toThrow();
    });
  });

  describe("SmokingPolicy", () => {
    it("有効な喫煙ポリシーを受け入れること", () => {
      expect(SmokingPolicy.parse("SMOKING_ALLOWED")).toBe("SMOKING_ALLOWED");
      expect(SmokingPolicy.parse("SEPARATED")).toBe("SEPARATED");
      expect(SmokingPolicy.parse("NON_SMOKING")).toBe("NON_SMOKING");
    });

    it("無効な喫煙ポリシーを拒否すること", () => {
      expect(() => SmokingPolicy.parse("INVALID")).toThrow();
    });
  });

  describe("OpeningHoursSchema", () => {
    it("有効な営業時間を受け入れること", () => {
      const validHours = {
        monday: { open: "10:00", close: "22:00" },
        tuesday: { open: "10:00", close: "22:00" },
        wednesday: { open: "10:00", close: "22:00" },
        thursday: { open: "10:00", close: "22:00" },
        friday: { open: "10:00", close: "23:00" },
        saturday: { open: "11:00", close: "23:00" },
        sunday: { open: "11:00", close: "22:00" },
      };

      expect(OpeningHoursSchema.parse(validHours)).toEqual(validHours);
    });

    it("部分的な営業時間を受け入れること", () => {
      const partialHours = {
        monday: { open: "10:00", close: "22:00" },
        saturday: { open: "11:00", close: "23:00" },
      };

      expect(OpeningHoursSchema.parse(partialHours)).toEqual(partialHours);
    });

    it("空のオブジェクトを受け入れること", () => {
      expect(OpeningHoursSchema.parse({})).toEqual({});
    });
  });

  describe("SnsLinksSchema", () => {
    it("有効なSNSリンクを受け入れること", () => {
      const validLinks = {
        twitter: "https://twitter.com/example",
        instagram: "https://instagram.com/example",
        facebook: "https://facebook.com/example",
      };

      expect(SnsLinksSchema.parse(validLinks)).toEqual(validLinks);
    });

    it("無効なURLを拒否すること", () => {
      const invalidLinks = {
        twitter: "not-a-url",
      };

      expect(() => SnsLinksSchema.parse(invalidLinks)).toThrow();
    });
  });

  describe("ShopCreateSchema", () => {
    it("有効な店舗作成データを受け入れること", () => {
      const validData = {
        name: "テストシーシャ店",
        address: "東京都渋谷区1-2-3",
        nearestStation: "渋谷駅",
        stationWalkTime: 5,
        budgetMin: 2000,
        budgetMax: 4000,
        wifi: true,
        powerOutlet: false,
        privateBooking: false,
        reservation: "RECOMMENDED",
        smokingPolicy: "SMOKING_ALLOWED",
        latitude: 35.658584,
        longitude: 139.701742,
      };

      const result = ShopCreateSchema.parse(validData);
      expect(result.name).toBe("テストシーシャ店");
      expect(result.reservation).toBe("RECOMMENDED");
    });

    it("JSON文字列の営業時間を変換すること", () => {
      const validData = {
        name: "テスト店",
        address: "東京都",
        openingHours: JSON.stringify({
          monday: { open: "10:00", close: "22:00" },
        }),
      };

      const result = ShopCreateSchema.parse(validData);
      expect(result.openingHours).toBe(
        JSON.stringify({
          monday: { open: "10:00", close: "22:00" },
        })
      );
    });

    it("無効な緯度経度を拒否すること", () => {
      const invalidData = {
        name: "テスト店",
        address: "東京都",
        latitude: 91, // 無効な緯度
      };

      expect(() => ShopCreateSchema.parse(invalidData)).toThrow();
    });

    it("負の予算を拒否すること", () => {
      const invalidData = {
        name: "テスト店",
        address: "東京都",
        budgetMin: -1000,
      };

      expect(() => ShopCreateSchema.parse(invalidData)).toThrow();
    });
  });

  describe("ShopQuerySchema", () => {
    it("デフォルト値を設定すること", () => {
      const result = ShopQuerySchema.parse({});
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.sortBy).toBe("createdAt");
      expect(result.sortOrder).toBe("desc");
    });

    it("文字列の数値パラメータを変換すること", () => {
      const query = {
        page: "2",
        limit: "50",
        latitude: "35.658584",
        longitude: "139.701742",
        radius: "5",
        budgetMin: "2000",
        budgetMax: "4000",
      };

      const result = ShopQuerySchema.parse(query);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(50);
      expect(result.latitude).toBe(35.658584);
      expect(result.budgetMin).toBe(2000);
    });

    it("文字列のブール値を変換すること", () => {
      const query = {
        wifi: "true",
        powerOutlet: "false",
        privateBooking: "true",
      };

      const result = ShopQuerySchema.parse(query);
      expect(result.wifi).toBe(true);
      expect(result.powerOutlet).toBe(false);
      expect(result.privateBooking).toBe(true);
    });

    it("無効なソートフィールドを拒否すること", () => {
      const query = {
        sortBy: "invalid",
      };

      expect(() => ShopQuerySchema.parse(query)).toThrow();
    });

    it("limitの最大値を制限すること", () => {
      const query = {
        limit: "200",
      };

      expect(() => ShopQuerySchema.parse(query)).toThrow();
    });
  });

  describe("ShopIdSchema", () => {
    it("有効なCUIDを受け入れること", () => {
      const validId = {
        id: "clhw3g5nv0000qzrmn8qp5fvb",
      };

      expect(ShopIdSchema.parse(validId)).toEqual(validId);
    });

    it("空のIDを拒否すること", () => {
      const invalidId = {
        id: "",
      };

      expect(() => ShopIdSchema.parse(invalidId)).toThrow();
    });
  });

  describe("ShopRelationCreateSchema", () => {
    it("フレーバーIDを受け入れること", () => {
      const data = {
        shopId: "clhw3g5nv0000qzrmn8qp5fvb",
        flavorId: "clhw3g5nv0001qzrmn8qp5fvb",
      };

      expect(ShopRelationCreateSchema.parse(data)).toEqual(data);
    });

    it("複数の関連IDを拒否すること", () => {
      const data = {
        shopId: "clhw3g5nv0000qzrmn8qp5fvb",
        flavorId: "clhw3g5nv0001qzrmn8qp5fvb",
        atmosphereId: "clhw3g5nv0002qzrmn8qp5fvb",
      };

      expect(() => ShopRelationCreateSchema.parse(data)).toThrow();
    });

    it("関連IDが無い場合を拒否すること", () => {
      const data = {
        shopId: "clhw3g5nv0000qzrmn8qp5fvb",
      };

      expect(() => ShopRelationCreateSchema.parse(data)).toThrow();
    });
  });
});
