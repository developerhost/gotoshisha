/**
 * D1データベースからデータを取得するスクリプト
 */
import { execSync } from "child_process";

interface QueryResult {
  results: Record<string, unknown>[];
  success: boolean;
  meta: {
    duration: number;
  };
}

/**
 * D1データベースに対してSQLクエリを実行する
 * @param sql 実行するSQLコマンド
 * @param remote リモート実行フラグ
 * @returns クエリ結果の配列
 */
function executeQuery(sql: string, remote: boolean = false): QueryResult[] {
  try {
    const remoteFlag = remote ? "--remote" : "";
    const dbName = process.env.D1_DATABASE_NAME || "gotoshisha-db";
    const command = `npx wrangler d1 execute ${dbName} --command="${sql}" ${remoteFlag}`;

    const result = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
    });

    // Wranglerの出力からJSONを抽出
    const lines = result.split("\n");
    const jsonStart = lines.findIndex((line) => line.trim().startsWith("["));
    if (jsonStart === -1) {
      throw new Error("JSON結果が見つかりません");
    }

    const jsonStr = lines.slice(jsonStart).join("\n").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("クエリ実行エラー:", error);
    throw error;
  }
}

/**
 * D1データベースからさまざまなクエリを実行してデータを取得する使用例
 * @returns Promise<void>
 */
async function main(): Promise<void> {
  console.log("🔍 D1データベースからデータを取得中...\n");

  // 1. 店舗一覧を取得
  console.log("📍 店舗一覧:");
  const shops = executeQuery(
    "SELECT id, name, address FROM shops ORDER BY name;"
  );
  console.table(shops[0].results);

  // 2. フレーバー数を取得
  console.log("🌿 フレーバー数:");
  const flavorCount = executeQuery("SELECT COUNT(*) as count FROM flavors;");
  console.log(`総フレーバー数: ${flavorCount[0].results[0].count}件\n`);

  // 3. 予算別店舗数
  console.log("💰 予算別店舗分布:");
  const budgetQuery = `
    SELECT 
      CASE 
        WHEN budgetMin < 2000 THEN '安価 (2000円未満)'
        WHEN budgetMin >= 2000 AND budgetMin < 3000 THEN '中価格 (2000-3000円)'
        ELSE '高価格 (3000円以上)'
      END as price_range,
      COUNT(*) as shop_count
    FROM shops 
    GROUP BY price_range;
  `;
  const budget = executeQuery(budgetQuery);
  console.table(budget[0].results);

  // 4. 設備の集計
  console.log("🔌 設備の普及率:");
  const facilities = executeQuery(`
    SELECT 
      SUM(wifi) as wifi_count,
      SUM(powerOutlet) as power_count,
      SUM(privateBooking) as private_count,
      COUNT(*) as total_shops
    FROM shops;
  `);
  const facilityData = facilities[0].results[0];
  console.log(
    `WiFi対応: ${facilityData.wifi_count}/${facilityData.total_shops}店舗`
  );
  console.log(
    `電源対応: ${facilityData.power_count}/${facilityData.total_shops}店舗`
  );
  console.log(
    `個室予約可: ${facilityData.private_count}/${facilityData.total_shops}店舗\n`
  );

  // 5. 店舗別フレーバー数
  console.log("🍃 店舗別フレーバー数:");
  const shopFlavors = executeQuery(`
    SELECT 
      s.name as shop_name,
      COUNT(sf.flavorId) as flavor_count
    FROM shops s
    LEFT JOIN shop_flavors sf ON s.id = sf.shopId
    GROUP BY s.id, s.name
    ORDER BY flavor_count DESC;
  `);
  console.table(shopFlavors[0].results);
}

// スクリプト実行
main()
  .then(() => {
    console.log("✅ クエリ実行完了！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ エラー:", error);
    process.exit(1);
  });

export { executeQuery };
