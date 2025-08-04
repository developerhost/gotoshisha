import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { checkDatabaseHealth, createPrismaClient } from "@/lib/db/db";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";
import type { Env } from "@/types";
import type { PrismaClient } from "@prisma/client";

// ルーターのインポート
import shops from "@/routes/shops";
import profile from "@/routes/profile";

/**
 * Honoアプリケーションのインスタンスを作成
 */
type Variables = {
  prisma: PrismaClient;
};

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

/**
 * ミドルウェアの設定
 */
app.use("*", logger());
app.use("*", prettyJSON());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:8081"], // React Native開発サーバー用
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * Prismaクライアントをコンテキストに追加するミドルウェア
 */
app.use("*", async (c, next) => {
  const prisma = createPrismaClient(c.env);
  c.set("prisma", prisma);

  try {
    await next();
  } finally {
    // リクエスト終了時にPrismaクライアントを切断
    await prisma.$disconnect();
  }
});

/**
 * ヘルスチェックエンドポイント
 */
app.get("/health", async (c) => {
  try {
    const prisma = c.get("prisma");
    const isDbHealthy = await checkDatabaseHealth(prisma);

    if (!isDbHealthy) {
      return c.json(createErrorResponse("データベース接続エラー"), 503);
    }

    return c.json(
      createSuccessResponse({
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: c.env.ENVIRONMENT,
        database: "connected",
      })
    );
  } catch (error) {
    return c.json(
      createErrorResponse(`ヘルスチェックに失敗しました ${error}`),
      500
    );
  }
});

/**
 * APIルートの設定
 */
app.get("/api", (c) => {
  return c.json(
    createSuccessResponse({
      message: "Gotoshisha API",
      version: "1.0.0",
      environment: c.env.ENVIRONMENT,
      endpoints: {
        health: "/health",
        shops: "/api/shops",
        profile: "/api/profile",
        users: "/api/users",
        posts: "/api/posts",
        comments: "/api/comments",
        tags: "/api/tags",
        likes: "/api/likes",
      },
    })
  );
});

/**
 * デバッグ用テストエンドポイント
 */
app.get("/test/shops", async (c) => {
  try {
    const prisma = c.get("prisma");
    const shops = await prisma.shop.findMany();
    return c.json({
      success: true,
      data: shops,
      count: shops.length,
    });
  } catch (error) {
    console.error("Test shops error:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
});

/**
 * ルーターの登録
 */
app.route("/api/shops", shops);
app.route("/api/profile", profile);

/**
 * 404エラーハンドリング
 */
app.notFound((c) => {
  return c.json(createErrorResponse("エンドポイントが見つかりません"), 404);
});

/**
 * エラーハンドリング
 */
app.onError((err, c) => {
  console.error("Unhandled error:", err);

  return c.json(
    createErrorResponse(
      c.env.ENVIRONMENT === "development"
        ? err.message
        : "内部サーバーエラーが発生しました"
    ),
    500
  );
});

export default app;
