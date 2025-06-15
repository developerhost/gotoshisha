/**
 * シーシャ店舗関連のAPIエンドポイント
 * 店舗の一覧取得、詳細取得、検索機能を提供
 */
import { Hono } from "hono";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";
import {
  shopListQuerySchema,
  shopNearbyQuerySchema,
} from "@/lib/validation/shops";
import type { Env } from "@/types";
import type { Prisma, PrismaClient } from "@prisma/client";

type Variables = {
  prisma: PrismaClient;
};

const shopsRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

/**
 * 近くの店舗検索
 * GET /api/shops/nearby
 *
 * クエリパラメータ:
 * - latitude: 緯度（必須）
 * - longitude: 経度（必須）
 * - radius: 検索半径（km）（デフォルト: 5）
 *
 * 注意: このルートは/:idより前に定義する必要がある
 */
shopsRouter.get("/nearby", async (c) => {
  try {
    const prisma = c.get("prisma");
    const query = c.req.query();

    // クエリパラメータのバリデーション
    const validationResult = shopNearbyQuerySchema.safeParse(query);
    if (!validationResult.success) {
      return c.json(
        createErrorResponse(
          "無効なクエリパラメータです",
          validationResult.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          }))
        ),
        400
      );
    }

    const { latitude, longitude, radius } = validationResult.data;

    // Haversine式を使用した距離計算
    // SQLiteでは複雑な数学関数が使えないため、簡易的な実装
    const shops = await prisma.shop.findMany({
      where: {
        latitude: {
          not: null,
        },
        longitude: {
          not: null,
        },
      },
      include: {
        shopFlavors: {
          include: {
            flavor: true,
          },
        },
        shopAtmospheres: {
          include: {
            atmosphere: true,
          },
        },
        reviews: {
          select: {
            id: true,
            ratingTaste: true,
            ratingAtmosphere: true,
            ratingService: true,
            ratingValue: true,
          },
        },
      },
    });

    // JavaScript側で距離を計算してフィルタリング
    const nearbyShops = shops
      .map((shop) => {
        if (!shop.latitude || !shop.longitude) return null;

        // Haversine式による距離計算
        const R = 6371; // 地球の半径（km）
        const dLat = ((shop.latitude - latitude) * Math.PI) / 180;
        const dLon = ((shop.longitude - longitude) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((latitude * Math.PI) / 180) *
            Math.cos((shop.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        if (distance > radius) return null;

        // レビューの平均評価を計算
        const reviews = shop.reviews;
        const avgRating =
          reviews.length > 0
            ? reviews.reduce(
                (sum, r) =>
                  sum +
                  ((r.ratingTaste || 0) +
                    (r.ratingAtmosphere || 0) +
                    (r.ratingService || 0) +
                    (r.ratingValue || 0)) /
                    4,
                0
              ) / reviews.length
            : null;

        // JSON文字列のパース
        const parsedShop = {
          ...shop,
          openingHours: shop.openingHours
            ? JSON.parse(shop.openingHours)
            : null,
          photos: shop.photos ? JSON.parse(shop.photos) : [],
          snsLinks: shop.snsLinks ? JSON.parse(shop.snsLinks) : null,
        };

        return {
          ...parsedShop,
          distance,
          flavors: shop.shopFlavors.map((sf) => sf.flavor),
          atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
          reviewCount: reviews.length,
          averageRating: avgRating,
          // 中間テーブルのデータは削除
          shopFlavors: undefined,
          shopAtmospheres: undefined,
          reviews: undefined,
        };
      })
      .filter((shop): shop is NonNullable<typeof shop> => shop !== null)
      .sort((a, b) => a.distance - b.distance);

    return c.json(createSuccessResponse(nearbyShops));
  } catch (error) {
    console.error("Nearby shops error:", error);
    return c.json(createErrorResponse("近くの店舗の検索に失敗しました"), 500);
  }
});

/**
 * 店舗一覧取得
 * GET /api/shops
 *
 * クエリパラメータ:
 * - page: ページ番号（デフォルト: 1）
 * - limit: 1ページあたりの件数（デフォルト: 20、最大: 100）
 * - search: 検索キーワード（店舗名、住所、最寄り駅で検索）
 * - atmosphereIds: 雰囲気IDの配列（カンマ区切り）
 * - flavorIds: フレーバーIDの配列（カンマ区切り）
 * - hobbyIds: ホビーIDの配列（カンマ区切り）
 * - budgetMin: 最小予算
 * - budgetMax: 最大予算
 * - hasWifi: Wi-Fiあり
 * - hasPowerOutlet: 電源あり
 * - orderBy: ソート項目（createdAt, name, budgetMin）
 * - order: ソート順（asc, desc）
 */
shopsRouter.get("/", async (c) => {
  try {
    const prisma = c.get("prisma");
    const query = c.req.query();

    // クエリパラメータのバリデーション
    const validationResult = shopListQuerySchema.safeParse(query);
    if (!validationResult.success) {
      return c.json(
        createErrorResponse(
          "無効なクエリパラメータです",
          validationResult.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          }))
        ),
        400
      );
    }

    const {
      page,
      limit,
      search,
      atmosphereIds,
      flavorIds,
      hobbyIds,
      budgetMin,
      budgetMax,
      hasWifi,
      hasPowerOutlet,
      orderBy,
      order,
    } = validationResult.data;

    // 検索条件の構築
    const where: Prisma.ShopWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { address: { contains: search } },
        { nearestStation: { contains: search } },
      ];
    }

    if (atmosphereIds?.length) {
      where.shopAtmospheres = {
        some: {
          atmosphereId: { in: atmosphereIds },
        },
      };
    }

    if (flavorIds?.length) {
      where.shopFlavors = {
        some: {
          flavorId: { in: flavorIds },
        },
      };
    }

    if (hobbyIds?.length) {
      where.shopHobbies = {
        some: {
          hobbyId: { in: hobbyIds },
        },
      };
    }

    if (budgetMin !== undefined) {
      where.budgetMin = { gte: budgetMin };
    }

    if (budgetMax !== undefined) {
      where.budgetMax = { lte: budgetMax };
    }

    if (hasWifi !== undefined) {
      where.wifi = hasWifi;
    }

    if (hasPowerOutlet !== undefined) {
      where.powerOutlet = hasPowerOutlet;
    }

    // 並び替え設定
    const orderByClause: Prisma.ShopOrderByWithRelationInput = {};
    if (orderBy) {
      orderByClause[orderBy] = order;
    }

    // 総件数の取得
    const total = await prisma.shop.count({ where });

    // 店舗一覧の取得
    const shops = await prisma.shop.findMany({
      where,
      orderBy: orderByClause,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        shopFlavors: {
          include: {
            flavor: true,
          },
        },
        shopAtmospheres: {
          include: {
            atmosphere: true,
          },
        },
        shopHobbies: {
          include: {
            hobby: true,
          },
        },
        shopPaymentMethods: {
          include: {
            paymentMethod: true,
          },
        },
        shopEvents: {
          include: {
            event: true,
          },
        },
        reviews: {
          select: {
            id: true,
            ratingTaste: true,
            ratingAtmosphere: true,
            ratingService: true,
            ratingValue: true,
          },
        },
      },
    });

    // レスポンスデータの整形
    const formattedShops = shops.map((shop) => {
      // レビューの平均評価を計算
      const reviews = shop.reviews;
      const avgRating =
        reviews.length > 0
          ? {
              taste:
                reviews.reduce((sum, r) => sum + (r.ratingTaste || 0), 0) /
                reviews.length,
              atmosphere:
                reviews.reduce((sum, r) => sum + (r.ratingAtmosphere || 0), 0) /
                reviews.length,
              service:
                reviews.reduce((sum, r) => sum + (r.ratingService || 0), 0) /
                reviews.length,
              value:
                reviews.reduce((sum, r) => sum + (r.ratingValue || 0), 0) /
                reviews.length,
              overall:
                reviews.reduce(
                  (sum, r) =>
                    sum +
                    ((r.ratingTaste || 0) +
                      (r.ratingAtmosphere || 0) +
                      (r.ratingService || 0) +
                      (r.ratingValue || 0)) /
                      4,
                  0
                ) / reviews.length,
            }
          : null;

      // JSON文字列のパース
      const parsedShop = {
        ...shop,
        openingHours: shop.openingHours ? JSON.parse(shop.openingHours) : null,
        photos: shop.photos ? JSON.parse(shop.photos) : [],
        snsLinks: shop.snsLinks ? JSON.parse(shop.snsLinks) : null,
      };

      return {
        ...parsedShop,
        flavors: shop.shopFlavors.map((sf) => sf.flavor),
        atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
        hobbies: shop.shopHobbies.map((sh) => sh.hobby),
        paymentMethods: shop.shopPaymentMethods.map((spm) => spm.paymentMethod),
        events: shop.shopEvents.map((se) => se.event),
        reviewCount: reviews.length,
        averageRating: avgRating,
        // 中間テーブルのデータは削除
        shopFlavors: undefined,
        shopAtmospheres: undefined,
        shopHobbies: undefined,
        shopPaymentMethods: undefined,
        shopEvents: undefined,
        reviews: undefined,
      };
    });

    return c.json(
      createSuccessResponse({
        shops: formattedShops,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      })
    );
  } catch (error) {
    console.error("Shop list error:", error);
    return c.json(createErrorResponse("店舗一覧の取得に失敗しました"), 500);
  }
});

/**
 * 店舗詳細取得
 * GET /api/shops/:id
 */
shopsRouter.get("/:id", async (c) => {
  try {
    const prisma = c.get("prisma");
    const shopId = c.req.param("id");

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
      include: {
        shopFlavors: {
          include: {
            flavor: true,
          },
        },
        shopAtmospheres: {
          include: {
            atmosphere: true,
          },
        },
        shopHobbies: {
          include: {
            hobby: true,
          },
        },
        shopPaymentMethods: {
          include: {
            paymentMethod: true,
          },
        },
        shopEvents: {
          include: {
            event: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10, // 最新10件のレビューを取得
        },
      },
    });

    if (!shop) {
      return c.json(createErrorResponse("店舗が見つかりません"), 404);
    }

    // JSON文字列のパース
    const parsedShop = {
      ...shop,
      openingHours: shop.openingHours ? JSON.parse(shop.openingHours) : null,
      photos: shop.photos ? JSON.parse(shop.photos) : [],
      snsLinks: shop.snsLinks ? JSON.parse(shop.snsLinks) : null,
    };

    // レスポンスデータの整形
    const formattedShop = {
      ...parsedShop,
      flavors: shop.shopFlavors.map((sf) => sf.flavor),
      atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
      hobbies: shop.shopHobbies.map((sh) => sh.hobby),
      paymentMethods: shop.shopPaymentMethods.map((spm) => spm.paymentMethod),
      events: shop.shopEvents.map((se) => se.event),
      // 中間テーブルのデータは削除
      shopFlavors: undefined,
      shopAtmospheres: undefined,
      shopHobbies: undefined,
      shopPaymentMethods: undefined,
      shopEvents: undefined,
    };

    return c.json(createSuccessResponse(formattedShop));
  } catch (error) {
    console.error("Shop detail error:", error);
    return c.json(createErrorResponse("店舗詳細の取得に失敗しました"), 500);
  }
});

export { shopsRouter };
