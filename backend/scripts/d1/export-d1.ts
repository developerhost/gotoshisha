/**
 * D1データベースのデータをエクスポートするスクリプト
 */
import { execSync } from "child_process";
import { writeFileSync } from "fs";

const EXPORT_TABLES = [
  "shops",
  "flavors",
  "atmospheres",
  "hobbies",
  "payment_methods",
  "events",
  "shop_flavors",
  "shop_atmospheres",
  "shop_hobbies",
  "shop_payment_methods",
] as const;

/**
 * D1データベースに対してSQLクエリを実行する
 * @param sql 実行するSQLコマンド
 * @returns クエリ結果の配列
 */
function executeQuery(sql: string): Record<string, unknown>[] {
  try {
    const dbName = process.env.D1_DATABASE_NAME || "gotoshisha-db";
    const command = `npx wrangler d1 execute ${dbName} --command="${sql}"`;
    const result = execSync(command, { encoding: "utf8", stdio: "pipe" });

    const lines = result.split("\n");
    const jsonStart = lines.findIndex((line) => line.trim().startsWith("["));
    if (jsonStart === -1) return [];

    const jsonStr = lines.slice(jsonStart).join("\n").trim();
    const parsed = JSON.parse(jsonStr);
    return parsed[0]?.results || [];
  } catch (error) {
    console.error("エラー:", error);
    return [];
  }
}

/**
 * D1データベースからすべてのテーブルデータをエクスポートする
 * @returns Promise<void>
 */
async function exportData(): Promise<void> {
  console.log("📤 D1データベースからデータをエクスポート中...\n");

  const dbName = process.env.D1_DATABASE_NAME || "gotoshisha-db";
  const exportData: {
    exportedAt: string;
    database: string;
    tables: Record<string, { count: number; data: Record<string, unknown>[] }>;
  } = {
    exportedAt: new Date().toISOString(),
    database: dbName,
    tables: {},
  };

  // 各テーブルのデータを取得
  const tables = EXPORT_TABLES;

  for (const table of tables) {
    console.log(`📋 ${table} テーブルを取得中...`);
    const data = executeQuery(`SELECT * FROM ${table};`);
    exportData.tables[table] = {
      count: data.length,
      data,
    };
    console.log(`   ✅ ${data.length}件取得`);
  }

  // JSONファイルに保存
  const filename = `export_${new Date().toISOString().split("T")[0]}.json`;
  writeFileSync(filename, JSON.stringify(exportData, null, 2));

  console.log(`\n💾 データを ${filename} に保存しました`);

  // サマリー表示
  console.log("\n📊 エクスポートサマリー:");
  Object.entries(exportData.tables).forEach(([table, info]) => {
    console.log(`   ${table}: ${info.count}件`);
  });
}

exportData()
  .then(() => {
    console.log("\n✅ エクスポート完了！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ エラー:", error);
    process.exit(1);
  });
