/**
 * シーシャ店舗関連のAPIエンドポイント
 */
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import type { PrismaClient } from "@prisma/client";
import {
  ShopCreateSchema,
  ShopIdSchema,
  ShopQuerySchema,
  ShopRelationCreateSchema,
  ShopRelationDeleteSchema,
  ShopUpdateSchema,
} from "../lib/shop/shops";

interface Env {
  Variables: {
    prisma: PrismaClient;
    userId?: string;
  };
}

const shops = new Hono<Env>();

/**
 * 2点間の距離を計算（ハバーシン公式）
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // 地球の半径（km）
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 店舗一覧取得
 * GET /shops
 */
shops.get("/", zValidator("query", ShopQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const prisma = c.get("prisma");

  // ページネーション設定
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;

  // 検索条件の構築
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  // キーワード検索
  if (query.search) {
    where.OR = [
      { name: { contains: query.search } },
      { address: { contains: query.search } },
      { nearestStation: { contains: query.search } },
    ];
  }

  // 位置情報による検索
  if (query.latitude && query.longitude && query.radius) {
    console.log(
      `位置情報検索: lat=${query.latitude}, lng=${query.longitude}, radius=${query.radius}km`
    );

    // radiusはkm単位なので、1度 ≈ 111kmで計算
    const latRange = query.radius / 111; // 1度 ≈ 111km
    const lonRange =
      query.radius / (111 * Math.cos((query.latitude * Math.PI) / 180));

    console.log(`検索範囲: latRange=${latRange}度, lonRange=${lonRange}度`);
    console.log(
      `緯度範囲: ${query.latitude - latRange} 〜 ${query.latitude + latRange}`
    );
    console.log(
      `経度範囲: ${query.longitude - lonRange} 〜 ${query.longitude + lonRange}`
    );

    where.latitude = {
      gte: query.latitude - latRange,
      lte: query.latitude + latRange,
    };
    where.longitude = {
      gte: query.longitude - lonRange,
      lte: query.longitude + lonRange,
    };
  }

  // 予算範囲フィルター
  if (query.budgetMin) {
    where.budgetMin = { gte: query.budgetMin };
  }
  if (query.budgetMax) {
    where.budgetMax = { lte: query.budgetMax };
  }

  // 設備フィルター
  if (query.wifi !== undefined) {
    where.wifi = query.wifi;
  }
  if (query.powerOutlet !== undefined) {
    where.powerOutlet = query.powerOutlet;
  }
  if (query.privateBooking !== undefined) {
    where.privateBooking = query.privateBooking;
  }

  // その他フィルター
  if (query.reservation) {
    where.reservation = query.reservation;
  }
  if (query.smokingPolicy) {
    where.smokingPolicy = query.smokingPolicy;
  }

  // ソート設定
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderBy: any = {};
  orderBy[query.sortBy] = query.sortOrder;

  try {
    console.log(`検索条件:`, JSON.stringify(where, null, 2));

    // 位置情報がある場合は距離計算を含む特別な処理
    if (query.latitude && query.longitude && query.radius) {
      // 店舗データの取得（位置情報フィルター適用）
      const allShops = await prisma.shop.findMany({
        where,
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
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      });

      console.log(
        `データベース検索結果: ${allShops.length}件の店舗が見つかりました`
      );
      allShops.forEach((shop) => {
        console.log(`- ${shop.name}: (${shop.latitude}, ${shop.longitude})`);
      });

      // 各店舗の距離を計算し、距離順でソート
      const shopsWithDistance = allShops
        .map((shop) => {
          if (shop.latitude === null || shop.longitude === null) {
            return null;
          }
          const distance = calculateDistance(
            query.latitude as number,
            query.longitude as number,
            shop.latitude,
            shop.longitude
          );
          return {
            ...shop,
            distance,
          };
        })
        .filter((shop): shop is NonNullable<typeof shop> => shop !== null)
        .filter((shop) => shop.distance <= (query.radius as number))
        .sort((a, b) => a.distance - b.distance);

      // ページネーション適用
      const total = shopsWithDistance.length;
      const shops = shopsWithDistance.slice(skip, skip + limit);

      // レスポンスの整形
      const formattedShops = shops.map((shop) => ({
        ...shop,
        flavors: shop.shopFlavors.map((sf) => sf.flavor),
        atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
        hobbies: shop.shopHobbies.map((sh) => sh.hobby),
        paymentMethods: shop.shopPaymentMethods.map((spm) => spm.paymentMethod),
        events: shop.shopEvents.map((se) => se.event),
        reviewCount: shop._count.reviews,
        // 不要なフィールドを削除
        shopFlavors: undefined,
        shopAtmospheres: undefined,
        shopHobbies: undefined,
        shopPaymentMethods: undefined,
        shopEvents: undefined,
        _count: undefined,
      }));

      return c.json({
        success: true,
        data: {
          shops: formattedShops,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        },
      });
    }

    // 位置情報がない場合の通常の処理
    const [shops, total] = await Promise.all([
      prisma.shop.findMany({
        where,
        skip,
        take: limit,
        orderBy,
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
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),
      prisma.shop.count({ where }),
    ]);

    // レスポンスの整形
    const formattedShops = shops.map((shop) => ({
      ...shop,
      flavors: shop.shopFlavors.map((sf) => sf.flavor),
      atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
      hobbies: shop.shopHobbies.map((sh) => sh.hobby),
      paymentMethods: shop.shopPaymentMethods.map((spm) => spm.paymentMethod),
      events: shop.shopEvents.map((se) => se.event),
      reviewCount: shop._count.reviews,
      // 不要なフィールドを削除
      shopFlavors: undefined,
      shopAtmospheres: undefined,
      shopHobbies: undefined,
      shopPaymentMethods: undefined,
      shopEvents: undefined,
      _count: undefined,
    }));

    return c.json({
      success: true,
      data: {
        shops: formattedShops,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching shops:", error);
    throw new HTTPException(500, { message: "店舗一覧の取得に失敗しました" });
  }
});

/**
 * 店舗詳細取得
 * GET /shops/:id
 */
shops.get("/:id", zValidator("param", ShopIdSchema), async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");

  try {
    const shop = await prisma.shop.findUnique({
      where: { id },
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
          take: 10, // 最新10件のレビュー
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!shop) {
      throw new HTTPException(404, { message: "店舗が見つかりません" });
    }

    // レスポンスの整形
    const formattedShop = {
      ...shop,
      flavors: shop.shopFlavors.map((sf) => sf.flavor),
      atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
      hobbies: shop.shopHobbies.map((sh) => sh.hobby),
      paymentMethods: shop.shopPaymentMethods.map((spm) => spm.paymentMethod),
      events: shop.shopEvents.map((se) => se.event),
      reviewCount: shop._count.reviews,
      // 平均評価を計算
      averageRating:
        shop.reviews.length > 0
          ? {
              taste:
                shop.reviews.reduce((sum, r) => sum + (r.ratingTaste || 0), 0) /
                  shop.reviews.filter((r) => r.ratingTaste).length || null,
              atmosphere:
                shop.reviews.reduce(
                  (sum, r) => sum + (r.ratingAtmosphere || 0),
                  0
                ) / shop.reviews.filter((r) => r.ratingAtmosphere).length ||
                null,
              service:
                shop.reviews.reduce(
                  (sum, r) => sum + (r.ratingService || 0),
                  0
                ) / shop.reviews.filter((r) => r.ratingService).length || null,
              value:
                shop.reviews.reduce((sum, r) => sum + (r.ratingValue || 0), 0) /
                  shop.reviews.filter((r) => r.ratingValue).length || null,
            }
          : null,
      // 不要なフィールドを削除
      shopFlavors: undefined,
      shopAtmospheres: undefined,
      shopHobbies: undefined,
      shopPaymentMethods: undefined,
      shopEvents: undefined,
      _count: undefined,
    };

    return c.json({
      success: true,
      data: formattedShop,
    });
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    console.error("Error fetching shop:", error);
    throw new HTTPException(500, { message: "店舗詳細の取得に失敗しました" });
  }
});

/**
 * 店舗作成
 * POST /shops
 */
shops.post("/", zValidator("json", ShopCreateSchema), async (c) => {
  const data = c.req.valid("json");
  const prisma = c.get("prisma");
  const userId = c.get("userId");

  // 認証チェック（管理者権限など必要に応じて実装）
  if (!userId) {
    throw new HTTPException(401, { message: "認証が必要です" });
  }

  try {
    const shop = await prisma.shop.create({
      data,
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    return c.json(
      {
        success: true,
        data: {
          ...shop,
          flavors: [],
          atmospheres: [],
          hobbies: [],
          paymentMethods: [],
          events: [],
          reviewCount: shop._count.reviews,
          _count: undefined,
        },
      },
      201
    );
  } catch (error) {
    console.error("Error creating shop:", error);
    throw new HTTPException(500, { message: "店舗の作成に失敗しました" });
  }
});

/**
 * 店舗更新
 * PUT /shops/:id
 */
shops.put(
  "/:id",
  zValidator("param", ShopIdSchema),
  zValidator("json", ShopUpdateSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const prisma = c.get("prisma");
    const userId = c.get("userId");

    // 認証チェック
    if (!userId) {
      throw new HTTPException(401, { message: "認証が必要です" });
    }

    try {
      // 店舗の存在確認
      const existing = await prisma.shop.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new HTTPException(404, { message: "店舗が見つかりません" });
      }

      // 更新
      const shop = await prisma.shop.update({
        where: { id },
        data,
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
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      });

      // レスポンスの整形
      const formattedShop = {
        ...shop,
        flavors: shop.shopFlavors.map((sf) => sf.flavor),
        atmospheres: shop.shopAtmospheres.map((sa) => sa.atmosphere),
        hobbies: shop.shopHobbies.map((sh) => sh.hobby),
        paymentMethods: shop.shopPaymentMethods.map((spm) => spm.paymentMethod),
        events: shop.shopEvents.map((se) => se.event),
        reviewCount: shop._count.reviews,
        shopFlavors: undefined,
        shopAtmospheres: undefined,
        shopHobbies: undefined,
        shopPaymentMethods: undefined,
        shopEvents: undefined,
        _count: undefined,
      };

      return c.json({
        success: true,
        data: formattedShop,
      });
    } catch (error) {
      if (error instanceof HTTPException) throw error;
      console.error("Error updating shop:", error);
      throw new HTTPException(500, { message: "店舗の更新に失敗しました" });
    }
  }
);

/**
 * 店舗削除
 * DELETE /shops/:id
 */
shops.delete("/:id", zValidator("param", ShopIdSchema), async (c) => {
  const { id } = c.req.valid("param");
  const prisma = c.get("prisma");
  const userId = c.get("userId");

  // 認証チェック
  if (!userId) {
    throw new HTTPException(401, { message: "認証が必要です" });
  }

  try {
    // 店舗の存在確認
    const existing = await prisma.shop.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new HTTPException(404, { message: "店舗が見つかりません" });
    }

    // 削除（カスケード削除により関連データも削除される）
    await prisma.shop.delete({
      where: { id },
    });

    return c.json({
      success: true,
      message: "店舗を削除しました",
    });
  } catch (error) {
    if (error instanceof HTTPException) throw error;
    console.error("Error deleting shop:", error);
    throw new HTTPException(500, { message: "店舗の削除に失敗しました" });
  }
});

/**
 * 店舗に関連要素を追加
 * POST /shops/:id/relations
 */
shops.post(
  "/:id/relations",
  zValidator("param", ShopIdSchema),
  zValidator("json", ShopRelationCreateSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const prisma = c.get("prisma");
    const userId = c.get("userId");

    // 認証チェック
    if (!userId) {
      throw new HTTPException(401, { message: "認証が必要です" });
    }

    // 店舗IDの確認
    if (data.shopId !== id) {
      throw new HTTPException(400, { message: "店舗IDが一致しません" });
    }

    try {
      // 店舗の存在確認
      const shop = await prisma.shop.findUnique({
        where: { id },
      });

      if (!shop) {
        throw new HTTPException(404, { message: "店舗が見つかりません" });
      }

      // 関連要素の追加
      if (data.flavorId) {
        await prisma.shopFlavor.create({
          data: {
            shopId: id,
            flavorId: data.flavorId,
          },
        });
      } else if (data.atmosphereId) {
        await prisma.shopAtmosphere.create({
          data: {
            shopId: id,
            atmosphereId: data.atmosphereId,
          },
        });
      } else if (data.hobbyId) {
        await prisma.shopHobby.create({
          data: {
            shopId: id,
            hobbyId: data.hobbyId,
          },
        });
      } else if (data.paymentMethodId) {
        await prisma.shopPaymentMethod.create({
          data: {
            shopId: id,
            paymentMethodId: data.paymentMethodId,
          },
        });
      } else if (data.eventId) {
        await prisma.shopEvent.create({
          data: {
            shopId: id,
            eventId: data.eventId,
          },
        });
      }

      return c.json(
        {
          success: true,
          message: "関連要素を追加しました",
        },
        201
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 重複エラーの処理
      if (error.code === "P2002") {
        throw new HTTPException(409, {
          message: "この関連要素は既に追加されています",
        });
      }
      console.error("Error adding relation:", error);
      throw new HTTPException(500, { message: "関連要素の追加に失敗しました" });
    }
  }
);

/**
 * 店舗から関連要素を削除
 * DELETE /shops/:id/relations
 */
shops.delete(
  "/:id/relations",
  zValidator("param", ShopIdSchema),
  zValidator("json", ShopRelationDeleteSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const prisma = c.get("prisma");
    const userId = c.get("userId");

    // 認証チェック
    if (!userId) {
      throw new HTTPException(401, { message: "認証が必要です" });
    }

    // 店舗IDの確認
    if (data.shopId !== id) {
      throw new HTTPException(400, { message: "店舗IDが一致しません" });
    }

    try {
      // 関連要素の削除
      if (data.flavorId) {
        await prisma.shopFlavor.delete({
          where: {
            shopId_flavorId: {
              shopId: id,
              flavorId: data.flavorId,
            },
          },
        });
      } else if (data.atmosphereId) {
        await prisma.shopAtmosphere.delete({
          where: {
            shopId_atmosphereId: {
              shopId: id,
              atmosphereId: data.atmosphereId,
            },
          },
        });
      } else if (data.hobbyId) {
        await prisma.shopHobby.delete({
          where: {
            shopId_hobbyId: {
              shopId: id,
              hobbyId: data.hobbyId,
            },
          },
        });
      } else if (data.paymentMethodId) {
        await prisma.shopPaymentMethod.delete({
          where: {
            shopId_paymentMethodId: {
              shopId: id,
              paymentMethodId: data.paymentMethodId,
            },
          },
        });
      } else if (data.eventId) {
        await prisma.shopEvent.delete({
          where: {
            shopId_eventId: {
              shopId: id,
              eventId: data.eventId,
            },
          },
        });
      }

      return c.json({
        success: true,
        message: "関連要素を削除しました",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // レコードが見つからない場合
      if (error.code === "P2025") {
        throw new HTTPException(404, { message: "この関連要素は存在しません" });
      }
      console.error("Error deleting relation:", error);
      throw new HTTPException(500, { message: "関連要素の削除に失敗しました" });
    }
  }
);

export default shops;
