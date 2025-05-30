import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import type { Env } from "@/types";

/**
 * 環境に応じたPrismaのログレベルを決定する
 * @param environment - 環境変数（'development' | 'production' など）
 * @returns ログレベルの配列
 */
export function determineLogLevels(
  environment: string
): Array<"query" | "info" | "warn" | "error"> {
  return environment === "development"
    ? ["query", "info", "warn", "error"]
    : ["error"];
}

/**
 * Prismaクライアントのインスタンスを作成
 * Cloudflare D1データベースアダプターを使用
 */
export function createPrismaClient(env: Env): PrismaClient {
  const adapter = new PrismaD1(env.DB);

  return new PrismaClient({
    adapter,
    log: determineLogLevels(env.ENVIRONMENT),
  });
}

/**
 * データベース接続のヘルスチェック
 */
export async function checkDatabaseHealth(
  prisma: PrismaClient
): Promise<boolean> {
  try {
    // 簡単なクエリを実行してデータベース接続を確認
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database health check failed: ${error.message}`);
    }
    throw new Error("Database health check failed: Unknown error");
  }
}

/**
 * データベース接続を安全に閉じる
 */
export async function closeDatabaseConnection(
  prisma: PrismaClient
): Promise<void> {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
}
