/**
 * テスト用ヘルパー関数とモックデータ
 */
import { vi } from "vitest";
import type { PrismaClient } from "@prisma/client";

// モックPrismaクライアントを作成
export const createMockPrisma = () => {
  return {
    $disconnect: vi.fn(),
    shop: {
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({}),
      update: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
      count: vi.fn().mockResolvedValue(0),
    },
    shopFlavor: {
      create: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
    shopAtmosphere: {
      create: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
    shopHobby: {
      create: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
    shopPaymentMethod: {
      create: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
    shopEvent: {
      create: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    },
  };
};

// モック店舗データ
export const mockShop = {
  id: "test-shop-id",
  name: "テストシーシャ店",
  address: "東京都渋谷区テスト1-2-3",
  nearestStation: "渋谷駅",
  stationWalkTime: 5,
  openingHours: JSON.stringify({
    monday: { open: "12:00", close: "23:00" },
    tuesday: { open: "12:00", close: "23:00" },
    wednesday: { open: "12:00", close: "23:00" },
    thursday: { open: "12:00", close: "23:00" },
    friday: { open: "12:00", close: "24:00" },
    saturday: { open: "12:00", close: "24:00" },
    sunday: { open: "12:00", close: "23:00" },
  }),
  holidays: "年末年始",
  budgetMin: 2000,
  budgetMax: 4000,
  seatingCount: 30,
  seatingTypes: "カウンター、ソファ、個室",
  reservation: "RECOMMENDED",
  privateBooking: true,
  wifi: true,
  powerOutlet: true,
  smokingPolicy: "SMOKING_ALLOWED",
  parkingInfo: "近隣にコインパーキングあり",
  timeLimit: "2時間制（混雑時）",
  hookahBrand: "ODUMAN",
  flavorCount: 50,
  photos: JSON.stringify([
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
  ]),
  websiteUrl: "https://example.com",
  googleMapUrl: "https://maps.google.com/example",
  snsLinks: JSON.stringify({
    twitter: "https://twitter.com/example",
    instagram: "https://instagram.com/example",
  }),
  latitude: 35.658584,
  longitude: 139.701742,
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

// モック店舗作成データ
export const mockShopCreateInput = {
  name: "新規シーシャ店",
  address: "東京都新宿区新規1-2-3",
  nearestStation: "新宿駅",
  stationWalkTime: 10,
  budgetMin: 1500,
  budgetMax: 3500,
  wifi: true,
  powerOutlet: false,
  privateBooking: false,
};

// モック店舗更新データ
export const mockShopUpdateInput = {
  name: "更新されたシーシャ店",
  budgetMin: 2500,
  budgetMax: 4500,
  wifi: false,
};

// リレーション付きモック店舗データ
export const mockShopWithRelations = {
  ...mockShop,
  shopFlavors: [
    {
      shopId: "test-shop-id",
      flavorId: "flavor-1",
      flavor: { id: "flavor-1", name: "ミント" },
    },
    {
      shopId: "test-shop-id",
      flavorId: "flavor-2",
      flavor: { id: "flavor-2", name: "グレープ" },
    },
  ],
  shopAtmospheres: [
    {
      shopId: "test-shop-id",
      atmosphereId: "atmosphere-1",
      atmosphere: { id: "atmosphere-1", name: "リラックス" },
    },
  ],
  shopHobbies: [],
  shopPaymentMethods: [
    {
      shopId: "test-shop-id",
      paymentMethodId: "payment-1",
      paymentMethod: { id: "payment-1", name: "現金" },
    },
    {
      shopId: "test-shop-id",
      paymentMethodId: "payment-2",
      paymentMethod: { id: "payment-2", name: "クレジットカード" },
    },
  ],
  shopEvents: [],
  reviews: [
    {
      id: "review-1",
      shopId: "test-shop-id",
      userId: "user-1",
      ratingTaste: 4.5,
      ratingAtmosphere: 4.0,
      ratingService: 4.5,
      ratingValue: 3.5,
      comment: "素晴らしい雰囲気でした",
      tags: JSON.stringify(["リラックス", "清潔"]),
      createdAt: new Date("2023-01-02"),
      updatedAt: new Date("2023-01-02"),
      user: {
        id: "user-1",
        name: "テストユーザー",
        avatar: "https://example.com/avatar.jpg",
      },
    },
  ],
  _count: {
    reviews: 1,
  },
};

// Honoのモックコンテキストを作成
export const createMockContext = (
  options: {
    prisma?: PrismaClient;
    userId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
  } = {}
) => {
  const mockPrisma = options.prisma || createMockPrisma();

  const mockContext = {
    req: {
      valid: vi.fn((type: string) => {
        switch (type) {
          case "query":
            return options.query || {};
          case "param":
            return options.params || {};
          case "json":
            return options.body || {};
          default:
            return {};
        }
      }),
    },
    get: vi.fn((key: string) => {
      switch (key) {
        case "prisma":
          return mockPrisma;
        case "userId":
          return options.userId;
        default:
          return undefined;
      }
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json: vi.fn((data: any, status?: number) => ({ data, status })),
  };

  return { mockContext, mockPrisma };
};
