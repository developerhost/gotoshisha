/**
 * シーシャ店舗関連のバリデーションスキーマ
 */
import { z } from "zod";

/**
 * 店舗一覧取得のクエリパラメータ
 */
export const shopListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  atmosphereIds: z
    .string()
    .transform((val) => (val ? val.split(",") : []))
    .optional(),
  flavorIds: z
    .string()
    .transform((val) => (val ? val.split(",") : []))
    .optional(),
  hobbyIds: z
    .string()
    .transform((val) => (val ? val.split(",") : []))
    .optional(),
  budgetMin: z.coerce.number().int().nonnegative().optional(),
  budgetMax: z.coerce.number().int().positive().optional(),
  hasWifi: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  hasPowerOutlet: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  orderBy: z.enum(["createdAt", "name", "budgetMin"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

/**
 * 近くの店舗検索のクエリパラメータ
 */
export const shopNearbyQuerySchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  radius: z.coerce.number().positive().max(50).default(5), // 最大50km
});

/**
 * 店舗作成・更新のボディパラメータ
 */
export const shopBodySchema = z.object({
  name: z.string().min(1).max(100),
  address: z.string().min(1).max(200),
  nearestStation: z.string().max(50).optional(),
  stationWalkTime: z.number().int().positive().max(60).optional(),
  openingHours: z
    .record(z.string())
    .refine(
      (hours) => {
        const validDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        return Object.keys(hours).every((day) => validDays.includes(day));
      },
      { message: "営業時間の曜日が不正です" }
    )
    .optional(),
  holidays: z.string().max(100).optional(),
  budgetMin: z.number().int().nonnegative().optional(),
  budgetMax: z.number().int().positive().optional(),
  seatingCount: z.number().int().positive().max(1000).optional(),
  seatingTypes: z.string().max(100).optional(),
  reservation: z.enum(["REQUIRED", "RECOMMENDED", "NOT_REQUIRED"]).optional(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: z
    .enum(["SMOKING_ALLOWED", "SEPARATED", "NON_SMOKING"])
    .optional(),
  parkingInfo: z.string().max(200).optional(),
  timeLimit: z.string().max(50).optional(),
  hookahBrand: z.string().max(50).optional(),
  flavorCount: z.number().int().positive().max(1000).optional(),
  photos: z.array(z.string().url()).max(10).optional(),
  websiteUrl: z.string().url().optional(),
  googleMapUrl: z.string().url().optional(),
  snsLinks: z
    .object({
      instagram: z.string().optional(),
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      line: z.string().optional(),
    })
    .optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  flavorIds: z.array(z.string()).optional(),
  atmosphereIds: z.array(z.string()).optional(),
  hobbyIds: z.array(z.string()).optional(),
  paymentMethodIds: z.array(z.string()).optional(),
  eventIds: z.array(z.string()).optional(),
});

/**
 * レビュー作成のボディパラメータ
 */
export const reviewBodySchema = z.object({
  shopId: z.string().cuid(),
  ratingTaste: z.number().min(1).max(5).optional(),
  ratingAtmosphere: z.number().min(1).max(5).optional(),
  ratingService: z.number().min(1).max(5).optional(),
  ratingValue: z.number().min(1).max(5).optional(),
  comment: z.string().max(1000).optional(),
  tags: z.array(z.string()).max(10).optional(),
});

// 型のエクスポート
export type ShopListQuery = z.infer<typeof shopListQuerySchema>;
export type ShopNearbyQuery = z.infer<typeof shopNearbyQuerySchema>;
export type ShopBody = z.infer<typeof shopBodySchema>;
export type ReviewBody = z.infer<typeof reviewBodySchema>;
