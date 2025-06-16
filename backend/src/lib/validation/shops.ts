/**
 * シーシャ店舗関連のバリデーションスキーマ
 */
import { z } from "zod";

// 予約可否のEnum
export const ReservationStatus = z.enum([
  "REQUIRED",
  "RECOMMENDED",
  "NOT_REQUIRED",
]);

// 喫煙ポリシーのEnum
export const SmokingPolicy = z.enum([
  "SMOKING_ALLOWED",
  "SEPARATED",
  "NON_SMOKING",
]);

// 営業時間のスキーマ
export const OpeningHoursSchema = z.object({
  monday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
  tuesday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
  wednesday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
  thursday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
  friday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
  saturday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
  sunday: z
    .object({ open: z.string().optional(), close: z.string().optional() })
    .optional(),
});

// SNSリンクのスキーマ
export const SnsLinksSchema = z.object({
  twitter: z.string().url().optional(),
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  line: z.string().url().optional(),
  youtube: z.string().url().optional(),
});

// 店舗作成のカスタムスキーマ
export const ShopCreateSchema = z.object({
  name: z.string().min(1, "店舗名は必須です"),
  address: z.string().min(1, "住所は必須です"),
  nearestStation: z.string().optional(),
  stationWalkTime: z.number().min(1).optional(),
  openingHours: z
    .string()
    .transform((val, ctx) => {
      if (!val) return val;
      try {
        const parsed = JSON.parse(val);
        const result = OpeningHoursSchema.parse(parsed);
        return JSON.stringify(result);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "営業時間の形式が不正です",
        });
        return z.NEVER;
      }
    })
    .optional(),
  holidays: z.string().optional(),
  budgetMin: z.number().min(0).optional(),
  budgetMax: z.number().min(0).optional(),
  seatingCount: z.number().min(1).optional(),
  seatingTypes: z.string().optional(),
  reservation: ReservationStatus.optional(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: SmokingPolicy.optional(),
  parkingInfo: z.string().optional(),
  timeLimit: z.string().optional(),
  hookahBrand: z.string().optional(),
  flavorCount: z.number().min(0).optional(),
  photos: z
    .string()
    .transform((val, ctx) => {
      if (!val) return val;
      try {
        const parsed = JSON.parse(val);
        const result = z.array(z.string().url()).parse(parsed);
        return JSON.stringify(result);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "写真URLリストの形式が不正です",
        });
        return z.NEVER;
      }
    })
    .optional(),
  websiteUrl: z.string().url().optional(),
  googleMapUrl: z.string().url().optional(),
  snsLinks: z
    .string()
    .transform((val, ctx) => {
      if (!val) return val;
      try {
        const parsed = JSON.parse(val);
        const result = SnsLinksSchema.parse(parsed);
        return JSON.stringify(result);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SNSリンクの形式が不正です",
        });
        return z.NEVER;
      }
    })
    .optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

// 店舗更新のカスタムスキーマ
export const ShopUpdateSchema = z.object({
  name: z.string().min(1, "店舗名は必須です").optional(),
  address: z.string().min(1, "住所は必須です").optional(),
  nearestStation: z.string().optional(),
  stationWalkTime: z.number().min(1).optional(),
  openingHours: z
    .string()
    .transform((val, ctx) => {
      if (!val) return val;
      try {
        const parsed = JSON.parse(val);
        const result = OpeningHoursSchema.parse(parsed);
        return JSON.stringify(result);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "営業時間の形式が不正です",
        });
        return z.NEVER;
      }
    })
    .optional(),
  holidays: z.string().optional(),
  budgetMin: z.number().min(0).optional(),
  budgetMax: z.number().min(0).optional(),
  seatingCount: z.number().min(1).optional(),
  seatingTypes: z.string().optional(),
  reservation: ReservationStatus.optional(),
  privateBooking: z.boolean().optional(),
  wifi: z.boolean().optional(),
  powerOutlet: z.boolean().optional(),
  smokingPolicy: SmokingPolicy.optional(),
  parkingInfo: z.string().optional(),
  timeLimit: z.string().optional(),
  hookahBrand: z.string().optional(),
  flavorCount: z.number().min(0).optional(),
  photos: z
    .string()
    .transform((val, ctx) => {
      if (!val) return val;
      try {
        const parsed = JSON.parse(val);
        const result = z.array(z.string().url()).parse(parsed);
        return JSON.stringify(result);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "写真URLリストの形式が不正です",
        });
        return z.NEVER;
      }
    })
    .optional(),
  websiteUrl: z.string().url().optional(),
  googleMapUrl: z.string().url().optional(),
  snsLinks: z
    .string()
    .transform((val, ctx) => {
      if (!val) return val;
      try {
        const parsed = JSON.parse(val);
        const result = SnsLinksSchema.parse(parsed);
        return JSON.stringify(result);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SNSリンクの形式が不正です",
        });
        return z.NEVER;
      }
    })
    .optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

// ページネーションスキーマ
export const PaginationSchema = z.object({
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1))
    .optional()
    .default("1"),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .optional()
    .default("20"),
});

// 店舗一覧取得のクエリスキーマ
export const ShopQuerySchema = z.object({
  ...PaginationSchema.shape,
  // 検索条件
  search: z.string().optional(),
  // 位置情報検索
  latitude: z
    .string()
    .transform(Number)
    .pipe(z.number().min(-90).max(90))
    .optional(),
  longitude: z
    .string()
    .transform(Number)
    .pipe(z.number().min(-180).max(180))
    .optional(),
  radius: z.string().transform(Number).pipe(z.number().min(0)).optional(), // km単位
  // 予算範囲
  budgetMin: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  budgetMax: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  // 設備フィルター
  wifi: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  powerOutlet: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  privateBooking: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  // その他フィルター
  reservation: ReservationStatus.optional(),
  smokingPolicy: SmokingPolicy.optional(),
  // ソート
  sortBy: z
    .enum(["createdAt", "updatedAt", "name", "budgetMin"])
    .optional()
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

// 店舗詳細取得のパラメータスキーマ
export const ShopIdSchema = z.object({
  id: z.string().min(1),
});

// 店舗に関連する要素を追加するスキーマ
export const ShopRelationCreateSchema = z
  .object({
    shopId: z.string().min(1),
    // 以下のいずれか1つ
    flavorId: z.string().min(1).optional(),
    atmosphereId: z.string().min(1).optional(),
    hobbyId: z.string().min(1).optional(),
    paymentMethodId: z.string().min(1).optional(),
    eventId: z.string().min(1).optional(),
  })
  .refine(
    (data) => {
      const relationFields = [
        data.flavorId,
        data.atmosphereId,
        data.hobbyId,
        data.paymentMethodId,
        data.eventId,
      ].filter(Boolean);
      return relationFields.length === 1;
    },
    {
      message: "関連要素のIDを1つだけ指定してください",
    }
  );

// 店舗に関連する要素を削除するスキーマ
export const ShopRelationDeleteSchema = ShopRelationCreateSchema;

// エクスポート
export type ShopCreate = z.infer<typeof ShopCreateSchema>;
export type ShopUpdate = z.infer<typeof ShopUpdateSchema>;
export type ShopQuery = z.infer<typeof ShopQuerySchema>;
export type ShopId = z.infer<typeof ShopIdSchema>;
export type ShopRelationCreate = z.infer<typeof ShopRelationCreateSchema>;
