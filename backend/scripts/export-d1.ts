/**
 * D1データベースのデータをエクスポートするスクリプト
 */
import { execSync } from "child_process";
import { writeFileSync } from "fs";

function executeQuery(sql: string): any[] {
  try {
    const command = `npx wrangler d1 execute gotoshisha-db --command="${sql}"`;
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

async function exportData() {
  console.log("📤 D1データベースからデータをエクスポート中...\n");

  const exportData: any = {
    exportedAt: new Date().toISOString(),
    database: "gotoshisha-db",
    tables: {},
  };

  // 各テーブルのデータを取得
  const tables = [
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
  ];

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
  Object.entries(exportData.tables).forEach(([table, info]: [string, any]) => {
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
