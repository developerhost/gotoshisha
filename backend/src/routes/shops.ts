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
} from "../lib/validation/shops";

interface Env {
  Variables: {
    prisma: PrismaClient;
    userId?: string;
  };
}

const shops = new Hono<Env>();

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
    // 簡易的な距離計算（実際の実装では適切な地理的計算を使用）
    const latRange = query.radius / 111; // 1度 ≈ 111km
    const lonRange =
      query.radius / (111 * Math.cos((query.latitude * Math.PI) / 180));

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
    // 店舗データの取得
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
      shops: formattedShops,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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

    return c.json(formattedShop);
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
        ...shop,
        flavors: [],
        atmospheres: [],
        hobbies: [],
        paymentMethods: [],
        events: [],
        reviewCount: shop._count.reviews,
        _count: undefined,
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

      return c.json(formattedShop);
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

    return c.json({ message: "店舗を削除しました" });
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

      return c.json({ message: "関連要素を追加しました" }, 201);
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

      return c.json({ message: "関連要素を削除しました" });
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
