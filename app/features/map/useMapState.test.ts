import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Region } from "react-native-maps";
import type { Shop } from "../../types/api";
import { validateShop } from "./useMapState";
import {
  filterValidShops,
  calculateSearchRadius,
  combineLoadingState,
  selectShops,
  hasLocationPermission,
} from "./mapUtils";

/**
 * useMapStateのロジック関数のテスト
 * React Hooksのテストではなく、内部ロジック関数の単体テストを実施
 */

// React Nativeのモック
vi.mock("react-native", () => ({
  Image: {
    prefetch: vi.fn(() => Promise.resolve()),
  },
  Platform: {
    OS: "ios",
    select: vi.fn((obj) => obj.ios || obj.default),
  },
}));

// Expo Assetのモック
vi.mock("expo-asset", () => ({
  Asset: {
    fromModule: vi.fn(() => ({
      downloadAsync: vi.fn(() => Promise.resolve()),
    })),
  },
}));

// Expo Locationのモック
vi.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: vi.fn(),
  getCurrentPositionAsync: vi.fn(),
  PermissionStatus: {
    GRANTED: "granted",
    DENIED: "denied",
  },
}));

// useLocationのモック
vi.mock("../../hooks/useLocation", () => ({
  useLocation: vi.fn(() => ({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
    requestLocation: vi.fn(),
    openSettings: vi.fn(),
    canRequestPermission: true,
  })),
}));

// useShopsのモック
vi.mock("../shop/useShops", () => ({
  useNearbyShops: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
    isFetching: false,
    isSuccess: false,
  })),
  useShops: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
    isFetching: false,
    isSuccess: false,
  })),
  useMapShopsCollection: vi.fn(() => ({
    collectedShops: [],
    collectShopsFromArea: vi.fn(),
    setInitialShops: vi.fn(),
  })),
}));

describe("useMapState ロジック関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("calculateSearchRadius", () => {
    /**
     * 検索半径計算ロジックのテスト
     * latitudeDelta から適切な半径を計算する
     */

    it("小さなlatitudeDeltaで最小値に制限される", () => {
      const region: Region = {
        latitude: 35.681236,
        longitude: 139.767125,
        latitudeDelta: 0.001, // 0.111km
        longitudeDelta: 0.001,
      };

      const radius = calculateSearchRadius(region);

      // 0.001 * 111 * 0.6 = 0.0666km → 最小5kmに制限
      expect(radius).toBe(5);
    });

    it("中程度のlatitudeDeltaで正常計算される", () => {
      const region: Region = {
        latitude: 35.681236,
        longitude: 139.767125,
        latitudeDelta: 0.1, // 11.1km
        longitudeDelta: 0.1,
      };

      const radius = calculateSearchRadius(region);

      // 0.1 * 111 * 0.6 = 6.66km → 7kmに丸め
      expect(radius).toBe(7);
    });

    it("大きなlatitudeDeltaで最大値に制限される", () => {
      const region: Region = {
        latitude: 35.681236,
        longitude: 139.767125,
        latitudeDelta: 100, // 11100km
        longitudeDelta: 100,
      };

      const radius = calculateSearchRadius(region);

      // 100 * 111 * 0.6 = 6660km → 最大5000kmに制限
      expect(radius).toBe(5000);
    });

    it("0のlatitudeDeltaで最小値に制限される", () => {
      const region: Region = {
        latitude: 35.681236,
        longitude: 139.767125,
        latitudeDelta: 0,
        longitudeDelta: 0,
      };

      const radius = calculateSearchRadius(region);

      expect(radius).toBe(5);
    });
  });

  describe("shop data validation", () => {
    /**
     * 店舗データの検証ロジックのテスト
     * 不正なデータをフィルタリングする
     */

    it("正常な店舗データを通す", () => {
      const validShop = {
        id: "1",
        name: "テスト店舗",
        address: "東京都渋谷区",
        latitude: 35.681236,
        longitude: 139.767125,
      };

      expect(validateShop(validShop)).toBe(true);
    });

    it("idがない店舗データを除外する", () => {
      const invalidShop = {
        id: "",
        name: "テスト店舗",
        address: "東京都渋谷区",
        latitude: 35.681236,
        longitude: 139.767125,
      };

      expect(validateShop(invalidShop)).toBe(false);
    });

    it("nameがない店舗データを除外する", () => {
      const invalidShop = {
        id: "1",
        name: "",
        address: "東京都渋谷区",
        latitude: 35.681236,
        longitude: 139.767125,
      };

      expect(validateShop(invalidShop)).toBe(false);
    });

    it("addressがない店舗データを除外する", () => {
      const invalidShop = {
        id: "1",
        name: "テスト店舗",
        address: "",
        latitude: 35.681236,
        longitude: 139.767125,
      };

      expect(validateShop(invalidShop)).toBe(false);
    });

    it("latitudeがnullの店舗データを除外する", () => {
      const invalidShop = {
        id: "1",
        name: "テスト店舗",
        address: "東京都渋谷区",
        latitude: null,
        longitude: 139.767125,
      };

      expect(validateShop(invalidShop)).toBe(false);
    });

    it("longitudeがnullの店舗データを除外する", () => {
      const invalidShop = {
        id: "1",
        name: "テスト店舗",
        address: "東京都渋谷区",
        latitude: 35.681236,
        longitude: null,
      };

      expect(validateShop(invalidShop)).toBe(false);
    });

    it("nullオブジェクトを除外する", () => {
      expect(validateShop(null)).toBe(false);
    });

    it("undefinedを除外する", () => {
      expect(validateShop(undefined)).toBe(false);
    });
  });

  describe("shop data filtering", () => {
    /**
     * 店舗データ配列のフィルタリングテスト
     */

    it("混在データから正常な店舗のみ抽出する", () => {
      const mixedShops = [
        {
          id: "1",
          name: "正常店舗1",
          address: "東京都渋谷区",
          latitude: 35.681236,
          longitude: 139.767125,
        },
        null,
        {
          id: "",
          name: "不正店舗",
          address: "東京都新宿区",
          latitude: 35.689487,
          longitude: 139.691711,
        },
        {
          id: "3",
          name: "正常店舗2",
          address: "東京都港区",
          latitude: 35.658034,
          longitude: 139.751394,
        },
        undefined,
        {
          id: "5",
          name: "不正店舗2",
          address: "東京都品川区",
          latitude: null,
          longitude: 139.728763,
        },
      ];

      const result = filterValidShops(mixedShops as any[]);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("3");
    });

    it("全て不正なデータの場合は空配列を返す", () => {
      const invalidShops = [
        null,
        undefined,
        { id: "", name: "test", address: "test", latitude: 1, longitude: 1 },
        { id: "1", name: "", address: "test", latitude: 1, longitude: 1 },
        { id: "1", name: "test", address: "", latitude: 1, longitude: 1 },
        {
          id: "1",
          name: "test",
          address: "test",
          latitude: null,
          longitude: 1,
        },
      ];

      const result = filterValidShops(invalidShops as any[]);
      expect(result).toHaveLength(0);
    });

    it("空配列の場合は空配列を返す", () => {
      const result = filterValidShops([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("loading state logic", () => {
    /**
     * ローディング状態統合ロジックのテスト
     */

    it("準備完了前はローディング中", () => {
      expect(combineLoadingState(false, false, false, false)).toBe(true);
    });

    it("位置情報ローディング中はローディング中", () => {
      expect(combineLoadingState(true, true, false, false)).toBe(true);
    });

    it("近隣店舗ローディング中はローディング中", () => {
      expect(combineLoadingState(true, false, true, false)).toBe(true);
    });

    it("フォールバック店舗ローディング中はローディング中", () => {
      expect(combineLoadingState(true, false, false, true)).toBe(true);
    });

    it("全てのローディングが完了した場合のみローディング完了", () => {
      expect(combineLoadingState(true, false, false, false)).toBe(false);
    });
  });

  describe("shop data priority logic", () => {
    /**
     * 店舗データ優先順位ロジックのテスト
     */

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createMockShop = (overrides: any = {}): Shop => ({
      id: "1",
      name: "テスト店舗",
      address: "東京都渋谷区",
      latitude: 35.681236,
      longitude: 139.767125,
      privateBooking: false,
      wifi: true,
      powerOutlet: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides,
    });

    it("collectedShopsが最優先で選択される", () => {
      const collectedShops = [createMockShop({ id: "collected" })];
      const nearbyShops = [createMockShop({ id: "nearby" })];
      const fallbackShops = [createMockShop({ id: "fallback" })];

      const result = selectShops(
        collectedShops,
        35.681236,
        139.767125,
        nearbyShops,
        fallbackShops
      );

      expect(result[0].id).toBe("collected");
    });

    it("位置情報ありでnearbyShopsが選択される", () => {
      const nearbyShops = [createMockShop({ id: "nearby" })];
      const fallbackShops = [createMockShop({ id: "fallback" })];

      const result = selectShops(
        [],
        35.681236,
        139.767125,
        nearbyShops,
        fallbackShops
      );

      expect(result[0].id).toBe("nearby");
    });

    it("位置情報なしでfallbackShopsが選択される", () => {
      const nearbyShops = [createMockShop({ id: "nearby" })];
      const fallbackShops = [createMockShop({ id: "fallback" })];

      const result = selectShops([], null, null, nearbyShops, fallbackShops);

      expect(result[0].id).toBe("fallback");
    });

    it("データがない場合は空配列を返す", () => {
      const result = selectShops([], null, null, undefined, undefined);
      expect(result).toHaveLength(0);
    });
  });

  describe("permission status logic", () => {
    /**
     * 位置情報権限状態判定ロジックのテスト
     */

    it("緯度経度両方あれば権限ありと判定", () => {
      expect(hasLocationPermission(35.681236, 139.767125)).toBe(true);
    });

    it("緯度のみでは権限なしと判定", () => {
      expect(hasLocationPermission(35.681236, null)).toBe(false);
    });

    it("経度のみでは権限なしと判定", () => {
      expect(hasLocationPermission(null, 139.767125)).toBe(false);
    });

    it("両方nullでは権限なしと判定", () => {
      expect(hasLocationPermission(null, null)).toBe(false);
    });

    it("0座標でも権限ありと判定", () => {
      expect(hasLocationPermission(0, 0)).toBe(true);
    });
  });
});
