/**
 * 本番環境用シードデータスクリプト
 * Cloudflare D1 (本番環境) にシードデータを直接投入
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLクエリを生成
function generateSeedSQL() {
  const queries: string[] = [];

  // マスタデータ: フレーバー
  const flavors = [
    "アップル",
    "グレープ",
    "ミント",
    "レモン",
    "オレンジ",
    "ストロベリー",
    "ピーチ",
    "チェリー",
    "バナナ",
    "ブルーベリー",
    "パイナップル",
    "マンゴー",
    "ココナッツ",
    "バニラ",
    "チョコレート",
    "コーヒー",
    "ローズ",
    "ジャスミン",
    "ラベンダー",
    "カルダモン",
    "シナモン",
    "ガム",
    "ミルク",
    "ハニー",
    "グレープフルーツ",
  ];

  flavors.forEach((name) => {
    queries.push(`
      INSERT OR IGNORE INTO flavors (id, name) 
      VALUES (lower(hex(randomblob(16))), '${name}');
    `);
  });

  // マスタデータ: 雰囲気
  const atmospheres = [
    "味重視",
    "映え重視",
    "お酒重視",
    "まったり",
    "ワイワイ",
    "デート向き",
    "一人時間",
    "勉強・作業",
    "おしゃべり",
    "高級感",
    "カジュアル",
    "アットホーム",
    "スタイリッシュ",
    "隠れ家",
  ];

  atmospheres.forEach((name) => {
    queries.push(`
      INSERT OR IGNORE INTO atmospheres (id, name) 
      VALUES (lower(hex(randomblob(16))), '${name}');
    `);
  });

  // マスタデータ: ホビー
  const hobbies = [
    "ジェンガ",
    "ダーツ",
    "ビリヤード",
    "カラオケ",
    "ボードゲーム",
    "トランプ",
    "UNO",
    "オセロ",
    "チェス",
    "マージャン",
    "テレビゲーム",
    "Netflix鑑賞",
    "音楽鑑賞",
    "読書スペース",
  ];

  hobbies.forEach((name) => {
    queries.push(`
      INSERT OR IGNORE INTO hobbies (id, name) 
      VALUES (lower(hex(randomblob(16))), '${name}');
    `);
  });

  // マスタデータ: 支払い方法
  const paymentMethods = [
    "現金",
    "Visa",
    "Mastercard",
    "JCB",
    "American Express",
    "PayPay",
    "LINE Pay",
    "メルペイ",
    "d払い",
    "au PAY",
    "Suica",
    "PASMO",
    "nanaco",
    "WAON",
    "楽天Edy",
    "楽天Pay",
    "Apple Pay",
    "Google Pay",
    "QUICPay",
    "iD",
  ];

  paymentMethods.forEach((name) => {
    queries.push(`
      INSERT OR IGNORE INTO payment_methods (id, name) 
      VALUES (lower(hex(randomblob(16))), '${name}');
    `);
  });

  // マスタデータ: イベント
  const events = [
    {
      name: "DJナイト",
      description: "DJによる音楽イベント",
      schedule: "毎週金曜日",
    },
    {
      name: "コスプレデー",
      description: "コスプレでの来店で割引",
      schedule: "毎月第2土曜日",
    },
    {
      name: "レディースデー",
      description: "女性限定割引",
      schedule: "毎週水曜日",
    },
    { name: "メンズデー", description: "男性限定割引", schedule: "毎週月曜日" },
    {
      name: "カップル割引",
      description: "カップルでの来店で割引",
      schedule: "毎日",
    },
    { name: "学割デー", description: "学生証提示で割引", schedule: "平日限定" },
    {
      name: "ハッピーアワー",
      description: "時間限定割引",
      schedule: "18:00-20:00",
    },
    {
      name: "ベリーダンスショー",
      description: "ベリーダンスパフォーマンス",
      schedule: "毎月第1日曜日",
    },
  ];

  events.forEach((event) => {
    queries.push(`
      INSERT OR IGNORE INTO events (id, name, description, schedule) 
      VALUES (lower(hex(randomblob(16))), '${event.name}', '${event.description}', '${event.schedule}');
    `);
  });

  // 店舗データ
  const shops = [
    {
      name: "Shisha Lounge TOKYO",
      address: "東京都渋谷区道玄坂2-25-12",
      nearestStation: "渋谷駅",
      stationWalkTime: 5,
      openingHours: JSON.stringify({
        mon: "18:00-02:00",
        tue: "18:00-02:00",
        wed: "18:00-02:00",
        thu: "18:00-02:00",
        fri: "18:00-03:00",
        sat: "18:00-03:00",
        sun: "18:00-01:00",
      }),
      holidays: "年中無休",
      budgetMin: 2000,
      budgetMax: 4000,
      seatingCount: 40,
      seatingTypes: "ソファ席・カウンター席・個室",
      reservation: "RECOMMENDED",
      privateBooking: 1,
      wifi: 1,
      powerOutlet: 1,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "近隣コインパーキング利用",
      timeLimit: "2時間制",
      hookahBrand: "Khalil Mamoon",
      flavorCount: 80,
      photos: JSON.stringify([
        "https://example.com/shop1_1.jpg",
        "https://example.com/shop1_2.jpg",
      ]),
      websiteUrl: "https://shisha-lounge-tokyo.com",
      googleMapUrl: "https://maps.google.com/...",
      snsLinks: JSON.stringify({
        instagram: "@shisha_lounge_tokyo",
        twitter: "@shisha_tokyo",
      }),
      latitude: 35.6580339,
      longitude: 139.7016358,
    },
    {
      name: "Arabesque Cafe",
      address: "東京都新宿区歌舞伎町1-15-3",
      nearestStation: "新宿駅",
      stationWalkTime: 8,
      openingHours: JSON.stringify({
        mon: "17:00-01:00",
        tue: "17:00-01:00",
        wed: "17:00-01:00",
        thu: "17:00-01:00",
        fri: "17:00-02:00",
        sat: "17:00-02:00",
        sun: "定休日",
      }),
      holidays: "毎週日曜日",
      budgetMin: 1500,
      budgetMax: 3500,
      seatingCount: 25,
      seatingTypes: "ソファ席・座敷席",
      reservation: "NOT_REQUIRED",
      privateBooking: 0,
      wifi: 1,
      powerOutlet: 0,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "なし",
      timeLimit: "無制限",
      hookahBrand: "KM",
      flavorCount: 60,
      photos: JSON.stringify(["https://example.com/shop2_1.jpg"]),
      websiteUrl: "https://arabesque-cafe.jp",
      googleMapUrl: "https://maps.google.com/...",
      snsLinks: JSON.stringify({ instagram: "@arabesque_cafe" }),
      latitude: 35.6938129,
      longitude: 139.7034872,
    },
    {
      name: "Mint Hookah Bar",
      address: "大阪府大阪市中央区心斎橋筋1-4-26",
      nearestStation: "心斎橋駅",
      stationWalkTime: 3,
      openingHours: JSON.stringify({
        mon: "19:00-02:00",
        tue: "19:00-02:00",
        wed: "19:00-02:00",
        thu: "19:00-02:00",
        fri: "19:00-03:00",
        sat: "19:00-03:00",
        sun: "19:00-01:00",
      }),
      holidays: "不定休",
      budgetMin: 2500,
      budgetMax: 5000,
      seatingCount: 30,
      seatingTypes: "ソファ席・VIP個室",
      reservation: "REQUIRED",
      privateBooking: 1,
      wifi: 1,
      powerOutlet: 1,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "提携駐車場あり",
      timeLimit: "シーシャ切れまで",
      hookahBrand: "Starbuzz",
      flavorCount: 100,
      photos: JSON.stringify([
        "https://example.com/shop3_1.jpg",
        "https://example.com/shop3_2.jpg",
        "https://example.com/shop3_3.jpg",
      ]),
      websiteUrl: "https://mint-hookah.osaka",
      googleMapUrl: "https://maps.google.com/...",
      snsLinks: JSON.stringify({
        instagram: "@mint_hookah_osaka",
        twitter: "@mint_hookah",
        facebook: "mint.hookah.osaka",
      }),
      latitude: 34.6718488,
      longitude: 135.5012739,
    },
  ];

  shops.forEach((shop) => {
    const id = `shop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    queries.push(`
      INSERT OR IGNORE INTO shops (
        id, name, address, nearestStation, stationWalkTime, openingHours,
        holidays, budgetMin, budgetMax, seatingCount, seatingTypes,
        reservation, privateBooking, wifi, powerOutlet, smokingPolicy,
        parkingInfo, timeLimit, hookahBrand, flavorCount, photos,
        websiteUrl, googleMapUrl, snsLinks, latitude, longitude,
        createdAt, updatedAt
      ) VALUES (
        '${id}',
        '${shop.name.replace(/'/g, "''")}',
        '${shop.address.replace(/'/g, "''")}',
        '${shop.nearestStation}',
        ${shop.stationWalkTime},
        '${shop.openingHours.replace(/'/g, "''")}',
        '${shop.holidays}',
        ${shop.budgetMin},
        ${shop.budgetMax},
        ${shop.seatingCount},
        '${shop.seatingTypes}',
        '${shop.reservation}',
        ${shop.privateBooking},
        ${shop.wifi},
        ${shop.powerOutlet},
        '${shop.smokingPolicy}',
        '${shop.parkingInfo.replace(/'/g, "''")}',
        '${shop.timeLimit}',
        '${shop.hookahBrand}',
        ${shop.flavorCount},
        '${shop.photos.replace(/'/g, "''")}',
        '${shop.websiteUrl}',
        '${shop.googleMapUrl}',
        '${shop.snsLinks.replace(/'/g, "''")}',
        ${shop.latitude},
        ${shop.longitude},
        datetime('now'),
        datetime('now')
      );
    `);
  });

  return queries.join("\n");
}

// SQLファイルを作成
function createSeedSQLFile() {
  const sqlContent = generateSeedSQL();
  const sqlFilePath = path.join(__dirname, "seed-prod.sql");
  fs.writeFileSync(sqlFilePath, sqlContent);
  console.log(`✅ SQLファイルを作成しました: ${sqlFilePath}`);
  return sqlFilePath;
}

// D1データベースにSQLを実行
async function executeSeedSQL() {
  try {
    console.log("🚀 本番環境へのシードデータ投入を開始...");

    // SQLファイルを作成
    const sqlFilePath = createSeedSQLFile();

    // D1データベースに対してSQLを実行
    console.log("📤 本番環境のD1データベースにSQLを実行中...");

    const command = `npx wrangler d1 execute gotoshisha-db --env production --remote --file="${sqlFilePath}"`;

    execSync(command, {
      stdio: "inherit",
      cwd: path.resolve(__dirname, ".."),
    });

    console.log("✅ 本番環境へのシードデータ投入が完了しました！");

    // SQLファイルを削除（オプション）
    // fs.unlinkSync(sqlFilePath);
    // console.log('🧹 一時SQLファイルを削除しました');
  } catch (error) {
    console.error("❌ シードデータの投入に失敗しました:", error);
    process.exit(1);
  }
}

// メイン実行
executeSeedSQL();
