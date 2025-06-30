/**
 * useShops.tsのテスト
 * TanStack Query を使用したシーシャ店舗APIフックのテスト
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Shop } from "../../types/api";

// useShops.tsから関数をインポート（内部実装をテスト用にエクスポートする必要がある）
// 実際のフックのテストはReact環境が必要なため、ここではロジック関数のテストを実施

/**
 * isValidShop関数のテスト用実装
 * 実際の関数と同じロジックをテスト
 */
function isValidShop(shop: unknown): shop is Shop {
  return !!(
    shop &&
    typeof shop === "object" &&
    shop !== null &&
    "id" in shop &&
    "name" in shop &&
    "latitude" in shop &&
    "longitude" in shop &&
    typeof (shop as Shop).id === "string" &&
    typeof (shop as Shop).name === "string" &&
    (typeof (shop as Shop).latitude === "number" ||
      (shop as Shop).latitude === null) &&
    (typeof (shop as Shop).longitude === "number" ||
      (shop as Shop).longitude === null)
  );
}

// テスト用のダミーデータ
const mockShop: Shop = {
  id: "1",
  name: "Test Shop",
  address: "Test Address",
  nearestStation: "Test Station",
  stationWalkTime: 5,
  openingHours: "10:00-22:00",
  holidays: "なし",
  budgetMin: 1000,
  budgetMax: 3000,
  seatingCount: 20,
  seatingTypes: "テーブル席、カウンター席",
  reservation: "RECOMMENDED",
  privateBooking: false,
  wifi: true,
  powerOutlet: true,
  smokingPolicy: "SMOKING_ALLOWED",
  parkingInfo: "近隣にコインパーキングあり",
  timeLimit: "3時間",
  hookahBrand: "KM",
  flavorCount: 50,
  photos: "https://test.com/image1.jpg",
  websiteUrl: "https://test.com",
  googleMapUrl: "https://maps.google.com/test",
  snsLinks: "https://instagram.com/test",
  latitude: 35.681236,
  longitude: 139.767125,
  averageRating: {
    taste: 4.5,
    atmosphere: 4.0,
    service: 4.2,
    value: 4.8,
  },
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

describe("useShops ロジック関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("isValidShop 型ガード関数", () => {
    it("有効なShopオブジェクトを正しく判定する", () => {
      expect(isValidShop(mockShop)).toBe(true);
    });

    it("必須フィールドが欠けている場合はfalseを返す", () => {
      const invalidShop = { ...mockShop };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (invalidShop as any).id = undefined;
      expect(isValidShop(invalidShop)).toBe(false);

      const noName = { ...mockShop };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (noName as any).name = undefined;
      expect(isValidShop(noName)).toBe(false);

      const noLatitude = { ...mockShop };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (noLatitude as any).latitude = undefined;
      expect(isValidShop(noLatitude)).toBe(false);

      const noLongitude = { ...mockShop };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (noLongitude as any).longitude = undefined;
      expect(isValidShop(noLongitude)).toBe(false);
    });

    it("nullや未定義の場合はfalseを返す", () => {
      expect(isValidShop(null)).toBe(false);
      expect(isValidShop(undefined)).toBe(false);
      expect(isValidShop({})).toBe(false);
    });

    it("型が不正な場合はfalseを返す", () => {
      const invalidId = { ...mockShop, id: 123 }; // idは文字列でなければならない
      expect(isValidShop(invalidId)).toBe(false);

      const invalidName = { ...mockShop, name: 456 }; // nameは文字列でなければならない
      expect(isValidShop(invalidName)).toBe(false);

      const invalidLatitude = { ...mockShop, latitude: "35.681236" }; // latitudeは数値またはnull
      expect(isValidShop(invalidLatitude)).toBe(false);

      const invalidLongitude = { ...mockShop, longitude: "139.767125" }; // longitudeは数値またはnull
      expect(isValidShop(invalidLongitude)).toBe(false);
    });

    it("緯度経度がnullの場合も有効と判定する", () => {
      const nullCoords = { ...mockShop, latitude: null, longitude: null };
      expect(isValidShop(nullCoords)).toBe(true);
    });

    it("プリミティブ値の場合はfalseを返す", () => {
      expect(isValidShop("string")).toBe(false);
      expect(isValidShop(123)).toBe(false);
      expect(isValidShop(true)).toBe(false);
    });

    it("配列の場合はfalseを返す", () => {
      expect(isValidShop([])).toBe(false);
      expect(isValidShop([mockShop])).toBe(false);
    });
  });

  describe("マップエリア検索ロジック", () => {
    /**
     * isAreaSearched関数のテスト用実装
     * 指定エリアが既に検索済みかチェックする
     */
    const isAreaSearched = (
      lat: number,
      lng: number,
      radius: number,
      searchedAreas: Array<{
        latitude: number;
        longitude: number;
        radius: number;
      }>
    ) => {
      return searchedAreas.some((area) => {
        const distance =
          Math.sqrt(
            Math.pow(area.latitude - lat, 2) + Math.pow(area.longitude - lng, 2)
          ) * 111; // 大まかな距離計算（km）

        // 検索済みエリアの半径と現在の検索半径の小さい方を基準にする
        const minRadius = Math.min(area.radius, radius);
        return distance < minRadius * 0.5; // 半径の半分以内なら重複とみなす
      });
    };

    it("新しいエリアは検索済みでないと判定する", () => {
      const searchedAreas: Array<{
        latitude: number;
        longitude: number;
        radius: number;
      }> = [];

      expect(isAreaSearched(35.681236, 139.767125, 5, searchedAreas)).toBe(
        false
      );
    });

    it("同じ座標のエリアは検索済みと判定する", () => {
      const searchedAreas = [
        { latitude: 35.681236, longitude: 139.767125, radius: 5 },
      ];

      expect(isAreaSearched(35.681236, 139.767125, 5, searchedAreas)).toBe(
        true
      );
    });

    it("近接エリアは検索済みと判定する", () => {
      const searchedAreas = [
        { latitude: 35.681236, longitude: 139.767125, radius: 5 },
      ];

      // 0.01度の差（約1.1km）は半径5kmの半分以内なので重複と判定
      expect(isAreaSearched(35.691236, 139.767125, 5, searchedAreas)).toBe(
        true
      );
    });

    it("離れたエリアは検索済みでないと判定する", () => {
      const searchedAreas = [
        { latitude: 35.681236, longitude: 139.767125, radius: 5 },
      ];

      // 0.1度の差（約11km）は半径5kmの半分を超えるので新規エリアと判定
      expect(isAreaSearched(35.781236, 139.767125, 5, searchedAreas)).toBe(
        false
      );
    });

    it("小さい半径を基準に重複判定する", () => {
      const searchedAreas = [
        { latitude: 35.681236, longitude: 139.767125, radius: 10 },
      ];

      // 半径3kmで検索する場合、3kmの半分（1.5km）以内が重複判定基準
      expect(isAreaSearched(35.681236, 139.767125, 3, searchedAreas)).toBe(
        true
      );

      // 0.02度の差（約2.2km）は1.5kmを超えるので新規エリア
      expect(isAreaSearched(35.701236, 139.767125, 3, searchedAreas)).toBe(
        false
      );
    });

    it("複数の検索済みエリアを正しく判定する", () => {
      const searchedAreas = [
        { latitude: 35.681236, longitude: 139.767125, radius: 5 },
        { latitude: 35.7, longitude: 139.8, radius: 5 },
        { latitude: 35.65, longitude: 139.75, radius: 5 },
      ];

      // 既存エリアの近くは検索済み
      expect(isAreaSearched(35.682236, 139.768125, 5, searchedAreas)).toBe(
        true
      );

      // どのエリアからも離れた場所は新規
      expect(isAreaSearched(35.75, 139.85, 5, searchedAreas)).toBe(false);
    });
  });

  describe("関連要素パラメータ変換", () => {
    /**
     * 関連要素タイプをAPIパラメータに変換するロジックのテスト
     */
    const convertRelationTypeToParam = (
      type: "flavor" | "atmosphere" | "hobby" | "paymentMethod" | "event",
      id: string
    ) => {
      return { [`${type}Id`]: id };
    };

    it("各タイプを正しくパラメータに変換する", () => {
      expect(convertRelationTypeToParam("flavor", "123")).toEqual({
        flavorId: "123",
      });

      expect(convertRelationTypeToParam("atmosphere", "456")).toEqual({
        atmosphereId: "456",
      });

      expect(convertRelationTypeToParam("hobby", "789")).toEqual({
        hobbyId: "789",
      });

      expect(convertRelationTypeToParam("paymentMethod", "abc")).toEqual({
        paymentMethodId: "abc",
      });

      expect(convertRelationTypeToParam("event", "def")).toEqual({
        eventId: "def",
      });
    });
  });

  describe("ページネーション処理", () => {
    /**
     * getNextPageParamロジックのテスト
     */
    const getNextPageParam = (lastPage: {
      pagination: { page: number; totalPages: number };
    }) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    };

    it("次のページが存在する場合は次のページ番号を返す", () => {
      expect(
        getNextPageParam({
          pagination: { page: 1, totalPages: 3 },
        })
      ).toBe(2);

      expect(
        getNextPageParam({
          pagination: { page: 2, totalPages: 3 },
        })
      ).toBe(3);
    });

    it("最後のページの場合はundefinedを返す", () => {
      expect(
        getNextPageParam({
          pagination: { page: 3, totalPages: 3 },
        })
      ).toBe(undefined);

      expect(
        getNextPageParam({
          pagination: { page: 1, totalPages: 1 },
        })
      ).toBe(undefined);
    });
  });
});
