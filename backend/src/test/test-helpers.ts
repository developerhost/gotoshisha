/**
 * テスト用のヘルパー関数
 */
import { vi } from "vitest";
import { Hono } from "hono";
import type { PrismaClient } from "@prisma/client";
import type { Env } from "@/types";

/**
 * モックPrismaクライアントを作成
 */
export function createMockPrismaClient(
  overrides: Partial<PrismaClient> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  return {
    shop: {
      count: vi.fn().mockResolvedValue(0),
      findMany: vi.fn().mockResolvedValue([]),
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    user: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn(),
      update: vi.fn(),
    },
    $disconnect: vi.fn(),
    ...overrides,
  };
}

/**
 * テスト用のHonoアプリを作成
 */
export function createTestApp(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prismaClient: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Hono<{ Bindings: Env; Variables: { prisma: any } }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = new Hono<{ Bindings: Env; Variables: { prisma: any } }>();

  // Prismaクライアントをコンテキストに設定
  app.use("*", async (c, next) => {
    c.set("prisma", prismaClient);
    await next();
  });

  app.route("/api/shops", router);
  return app;
}

/**
 * サンプル店舗データ
 */
export const mockShopData = {
  id: "shop1",
  name: "Test Shisha Lounge",
  address: "東京都渋谷区テスト1-1-1",
  nearestStation: "渋谷駅",
  stationWalkTime: 5,
  openingHours: JSON.stringify({
    mon: "18:00-02:00",
    tue: "18:00-02:00",
    wed: "18:00-02:00",
    thu: "18:00-02:00",
    fri: "18:00-03:00",
    sat: "18:00-03:00",
    sun: "18:00-01:00",
  }),
  holidays: "年中無休",
  budgetMin: 2000,
  budgetMax: 4000,
  seatingCount: 40,
  seatingTypes: "ソファ席・カウンター席",
  reservation: "RECOMMENDED",
  privateBooking: true,
  wifi: true,
  powerOutlet: true,
  smokingPolicy: "SMOKING_ALLOWED",
  parkingInfo: "近隣コインパーキング利用",
  timeLimit: "2時間制",
  hookahBrand: "Khalil Mamoon",
  flavorCount: 80,
  photos: JSON.stringify([
    "https://example.com/shop1_1.jpg",
    "https://example.com/shop1_2.jpg",
  ]),
  websiteUrl: "https://test-shisha.com",
  googleMapUrl: "https://maps.google.com/test",
  snsLinks: JSON.stringify({
    instagram: "@test_shisha",
    twitter: "@test_shisha",
  }),
  latitude: 35.6580339,
  longitude: 139.7016358,
  createdAt: new Date(),
  updatedAt: new Date(),
  shopFlavors: [
    {
      flavor: { id: "flavor1", name: "アップル" },
    },
  ],
  shopAtmospheres: [
    {
      atmosphere: { id: "atmosphere1", name: "まったり" },
    },
  ],
  shopHobbies: [
    {
      hobby: { id: "hobby1", name: "ジェンガ" },
    },
  ],
  shopPaymentMethods: [
    {
      paymentMethod: { id: "payment1", name: "現金" },
    },
  ],
  shopEvents: [
    {
      event: {
        id: "event1",
        name: "DJナイト",
        description: "DJイベント",
        schedule: "金曜日",
      },
    },
  ],
  reviews: [
    {
      id: "review1",
      ratingTaste: 4.5,
      ratingAtmosphere: 4.0,
      ratingService: 4.5,
      ratingValue: 4.0,
    },
  ],
};
