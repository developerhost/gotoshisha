/**
 * D1データベース用のシードスクリプト
 * Wrangler CLIを使用してD1に直接データを投入
 */
import { execSync } from "child_process";

// シーシャ店舗のシードデータ
const seedData = {
  flavors: [
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
  ],
  atmospheres: [
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
  ],
  hobbies: [
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
  ],
  paymentMethods: [
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
  ],
  events: [
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
  ],
  shops: [
    {
      id: "shop1",
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
      id: "shop2",
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
      snsLinks: JSON.stringify({
        instagram: "@arabesque_cafe",
      }),
      latitude: 35.6938129,
      longitude: 139.7034872,
    },
    {
      id: "shop3",
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
  ],
};

function executeD1Command(command: string): void {
  try {
    console.log(`実行中: ${command}`);
    const result = execSync(
      `npx wrangler d1 execute gotoshisha-db --command="${command}"`,
      {
        encoding: "utf8",
        stdio: "pipe",
      }
    );
    console.log(result, "✅ 成功");
  } catch (error) {
    console.error("❌ エラー:", error);
  }
}

async function seedD1Database() {
  console.log("🚀 D1データベースにシードデータを投入開始...");

  // 1. フレーバーマスタを投入
  console.log("フレーバーマスタを作成中...");
  for (const flavor of seedData.flavors) {
    const command = `INSERT OR IGNORE INTO flavors (id, name) VALUES ('flavor_${flavor}', '${flavor}');`;
    executeD1Command(command);
  }

  // 2. 雰囲気マスタを投入
  console.log("雰囲気マスタを作成中...");
  for (const atmosphere of seedData.atmospheres) {
    const command = `INSERT OR IGNORE INTO atmospheres (id, name) VALUES ('atmosphere_${atmosphere}', '${atmosphere}');`;
    executeD1Command(command);
  }

  // 3. ホビーマスタを投入
  console.log("ホビーマスタを作成中...");
  for (const hobby of seedData.hobbies) {
    const command = `INSERT OR IGNORE INTO hobbies (id, name) VALUES ('hobby_${hobby}', '${hobby}');`;
    executeD1Command(command);
  }

  // 4. 支払い方法マスタを投入
  console.log("支払い方法マスタを作成中...");
  for (const paymentMethod of seedData.paymentMethods) {
    const command = `INSERT OR IGNORE INTO payment_methods (id, name) VALUES ('payment_${paymentMethod}', '${paymentMethod}');`;
    executeD1Command(command);
  }

  // 5. イベントマスタを投入
  console.log("イベントマスタを作成中...");
  for (const event of seedData.events) {
    const command = `INSERT OR IGNORE INTO events (id, name, description, schedule) VALUES ('event_${event.name}', '${event.name}', '${event.description}', '${event.schedule}');`;
    executeD1Command(command);
  }

  // 6. 店舗データを投入
  console.log("店舗データを作成中...");
  for (const shop of seedData.shops) {
    const command = `INSERT OR IGNORE INTO shops (
      id, name, address, nearestStation, stationWalkTime, openingHours, holidays,
      budgetMin, budgetMax, seatingCount, seatingTypes, reservation, privateBooking,
      wifi, powerOutlet, smokingPolicy, parkingInfo, timeLimit, hookahBrand,
      flavorCount, photos, websiteUrl, googleMapUrl, snsLinks, latitude, longitude,
      createdAt, updatedAt
    ) VALUES (
      '${shop.id}', '${shop.name}', '${shop.address}', '${shop.nearestStation}', ${shop.stationWalkTime},
      '${shop.openingHours}', '${shop.holidays}', ${shop.budgetMin}, ${shop.budgetMax}, ${shop.seatingCount},
      '${shop.seatingTypes}', '${shop.reservation}', ${shop.privateBooking}, ${shop.wifi}, ${shop.powerOutlet},
      '${shop.smokingPolicy}', '${shop.parkingInfo}', '${shop.timeLimit}', '${shop.hookahBrand}',
      ${shop.flavorCount}, '${shop.photos}', '${shop.websiteUrl}', '${shop.googleMapUrl}',
      '${shop.snsLinks}', ${shop.latitude}, ${shop.longitude}, datetime('now'), datetime('now')
    );`;
    executeD1Command(command);
  }

  // 7. 関連テーブルのデータを投入
  console.log("店舗とマスタデータを関連付け中...");

  // shop1の関連データ
  executeD1Command(
    `INSERT OR IGNORE INTO shop_flavors (shopId, flavorId) VALUES ('shop1', 'flavor_アップル');`
  );
  executeD1Command(
    `INSERT OR IGNORE INTO shop_flavors (shopId, flavorId) VALUES ('shop1', 'flavor_グレープ');`
  );
  executeD1Command(
    `INSERT OR IGNORE INTO shop_flavors (shopId, flavorId) VALUES ('shop1', 'flavor_ミント');`
  );

  executeD1Command(
    `INSERT OR IGNORE INTO shop_atmospheres (shopId, atmosphereId) VALUES ('shop1', 'atmosphere_味重視');`
  );
  executeD1Command(
    `INSERT OR IGNORE INTO shop_atmospheres (shopId, atmosphereId) VALUES ('shop1', 'atmosphere_デート向き');`
  );

  executeD1Command(
    `INSERT OR IGNORE INTO shop_hobbies (shopId, hobbyId) VALUES ('shop1', 'hobby_ジェンガ');`
  );
  executeD1Command(
    `INSERT OR IGNORE INTO shop_hobbies (shopId, hobbyId) VALUES ('shop1', 'hobby_ボードゲーム');`
  );

  executeD1Command(
    `INSERT OR IGNORE INTO shop_payment_methods (shopId, paymentMethodId) VALUES ('shop1', 'payment_現金');`
  );
  executeD1Command(
    `INSERT OR IGNORE INTO shop_payment_methods (shopId, paymentMethodId) VALUES ('shop1', 'payment_Visa');`
  );
  executeD1Command(
    `INSERT OR IGNORE INTO shop_payment_methods (shopId, paymentMethodId) VALUES ('shop1', 'payment_PayPay');`
  );

  console.log("✅ D1データベースのシードデータ投入が完了しました！");
}

// スクリプト実行
seedD1Database()
  .then(() => {
    console.log("🎉 D1シードデータスクリプトが完了しました！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 D1シードデータスクリプトでエラーが発生しました:", error);
    process.exit(1);
  });
