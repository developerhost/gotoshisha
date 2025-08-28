/**
 * 統一されたシードデータスクリプト
 * 各テーブル専用のシードファイルを呼び出して実行
 * ローカル・リモートの両方のデータベースに対応
 */
import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

import { seedUsers } from "./seed/users.js";
import { seedTags } from "./seed/tags.js";
import { seedPosts } from "./seed/posts.js";
import { seedLikes } from "./seed/likes.js";
import { seedComments } from "./seed/comments.js";
import { seedShishaMasters } from "./seed/shisha-masters.js";
import { seedShops } from "./seed/shops.js";

/**
 * 環境に応じたPrismaクライアントを初期化
 */
function createPrismaClient(): PrismaClient {
  // Cloudflare Workers環境での実行の場合
  if ("D1Database" in globalThis && process.env.DB) {
    console.log("🌐 Cloudflare D1データベースを使用します");
    const adapter = new PrismaD1(process.env.DB as any);
    return new PrismaClient({ adapter });
  }

  // ローカル開発環境の場合
  console.log("💻 ローカルデータベースを使用します");
  return new PrismaClient();
}

/**
 * 全テーブルのシードデータを順次実行
 */
async function main() {
  const prisma = createPrismaClient();

  try {
    console.log("🌱 データベースにシードデータを投入中...");
    console.log("=====================================");

    // 1. ユーザーデータの作成
    const users = await seedUsers(prisma);

    // 2. タグデータの作成
    const tags = await seedTags(prisma);

    // 3. 投稿データの作成（ユーザーとタグに依存）
    const posts = await seedPosts(prisma, users, tags);

    // 4. いいねデータの作成（ユーザーと投稿に依存）
    await seedLikes(prisma, users, posts);

    // 5. コメントデータの作成（ユーザーと投稿に依存）
    await seedComments(prisma, users, posts);

    // 6. シーシャマスターデータの作成
    const shishaMasters = await seedShishaMasters(prisma);

    // 7. シーシャショップデータの作成（マスターデータに依存）
    await seedShops(prisma, shishaMasters);

    console.log("=====================================");
    console.log("🎉 全てのシードデータの投入が完了しました！");

    // 作成されたデータの概要を表示
    console.log("\n📊 作成されたデータの概要:");
    console.log(`   👥 ユーザー: ${users.length}人`);
    console.log(`   🏷️  タグ: ${tags.length}個`);
    console.log(`   📝 投稿: ${posts.length}件`);
    console.log(`   🎨 フレーバー: ${shishaMasters.flavors.length}種類`);
    console.log(`   🌟 雰囲気: ${shishaMasters.atmospheres.length}種類`);
    console.log(`   🎮 ホビー: ${shishaMasters.hobbies.length}種類`);
    console.log(`   💳 支払い方法: ${shishaMasters.paymentMethods.length}種類`);
    console.log(`   🎪 イベント: ${shishaMasters.events.length}種類`);
    console.log(`   🏪 シーシャショップ: 5軒`);
  } catch (error) {
    console.error("❌ シードデータの投入中にエラーが発生しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプトが直接実行された場合のみmain関数を実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error("💥 シードスクリプトでエラーが発生しました:", e);
    process.exit(1);
  });
}

export { main as seedAll };
