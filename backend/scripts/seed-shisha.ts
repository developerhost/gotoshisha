/**
 * シーシャ店舗のシードデータスクリプト
 * マスタデータと店舗データを作成
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedShishaData() {
  console.log("🚀 シーシャ店舗のシードデータを開始...");

  try {
    // 1. フレーバーマスタデータを作成
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

    console.log("フレーバーマスタを作成中...");
    const createdFlavors = await Promise.all(
      flavors.map((name) =>
        prisma.flavor.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    // 2. 雰囲気マスタデータを作成
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

    console.log("雰囲気マスタを作成中...");
    const createdAtmospheres = await Promise.all(
      atmospheres.map((name) =>
        prisma.atmosphere.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    // 3. ホビーマスタデータを作成
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

    console.log("ホビーマスタを作成中...");
    const createdHobbies = await Promise.all(
      hobbies.map((name) =>
        prisma.hobby.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    // 4. 支払い方法マスタデータを作成
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

    console.log("支払い方法マスタを作成中...");
    const createdPaymentMethods = await Promise.all(
      paymentMethods.map((name) =>
        prisma.paymentMethod.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    );

    // 5. イベントマスタデータを作成
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
      {
        name: "メンズデー",
        description: "男性限定割引",
        schedule: "毎週月曜日",
      },
      {
        name: "カップル割引",
        description: "カップルでの来店で割引",
        schedule: "毎日",
      },
      {
        name: "学割デー",
        description: "学生証提示で割引",
        schedule: "平日限定",
      },
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

    console.log("イベントマスタを作成中...");
    const createdEvents = [];
    for (const event of events) {
      // 既存のイベントを検索
      const existingEvent = await prisma.event.findFirst({
        where: { name: event.name },
      });

      if (existingEvent) {
        // 既存の場合は更新
        const updated = await prisma.event.update({
          where: { id: existingEvent.id },
          data: event,
        });
        createdEvents.push(updated);
      } else {
        // 新規の場合は作成
        const created = await prisma.event.create({
          data: event,
        });
        createdEvents.push(created);
      }
    }

    // 6. 店舗データを作成
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
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
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
        privateBooking: false,
        wifi: true,
        powerOutlet: false,
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
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
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

    console.log("店舗データを作成中...");
    const createdShops = [];
    for (const shopData of shops) {
      // 既存の店舗を検索
      const existingShop = await prisma.shop.findFirst({
        where: { name: shopData.name },
      });

      if (existingShop) {
        // 既存の場合は更新
        const updated = await prisma.shop.update({
          where: { id: existingShop.id },
          data: shopData,
        });
        createdShops.push(updated);
      } else {
        // 新規の場合は作成
        const created = await prisma.shop.create({
          data: shopData,
        });
        createdShops.push(created);
      }
    }

    // 7. 店舗とマスタデータの関連付け
    console.log("店舗とマスタデータを関連付け中...");

    // 店舗1: Shisha Lounge TOKYO
    const shop1 = createdShops[0];
    const shop1Flavors = [
      { shopId: shop1.id, flavorId: createdFlavors[0].id }, // アップル
      { shopId: shop1.id, flavorId: createdFlavors[1].id }, // グレープ
      { shopId: shop1.id, flavorId: createdFlavors[2].id }, // ミント
      { shopId: shop1.id, flavorId: createdFlavors[5].id }, // ストロベリー
      { shopId: shop1.id, flavorId: createdFlavors[14].id }, // チョコレート
    ];
    for (const flavor of shop1Flavors) {
      try {
        await prisma.shopFlavor.create({ data: flavor });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`Flavor already exists: ${flavor.flavorId}`, e);
      }
    }

    const shop1Atmospheres = [
      { shopId: shop1.id, atmosphereId: createdAtmospheres[0].id }, // 味重視
      { shopId: shop1.id, atmosphereId: createdAtmospheres[5].id }, // デート向き
      { shopId: shop1.id, atmosphereId: createdAtmospheres[9].id }, // 高級感
    ];
    for (const atmosphere of shop1Atmospheres) {
      try {
        await prisma.shopAtmosphere.create({ data: atmosphere });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(
          `Atmosphere already exists: ${atmosphere.atmosphereId}`,
          e
        );
      }
    }

    const shop1Hobbies = [
      { shopId: shop1.id, hobbyId: createdHobbies[0].id }, // ジェンガ
      { shopId: shop1.id, hobbyId: createdHobbies[4].id }, // ボードゲーム
    ];
    for (const hobby of shop1Hobbies) {
      try {
        await prisma.shopHobby.create({ data: hobby });
      } catch (e) {
        // 既に存在する場合はスキップ
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.warn(
          `Hobby already exists: ${hobby.hobbyId} - ${errorMessage}`
        );
      }
    }

    const shop1PaymentMethods = [
      { shopId: shop1.id, paymentMethodId: createdPaymentMethods[0].id }, // 現金
      { shopId: shop1.id, paymentMethodId: createdPaymentMethods[1].id }, // Visa
      { shopId: shop1.id, paymentMethodId: createdPaymentMethods[5].id }, // PayPay
    ];
    for (const paymentMethod of shop1PaymentMethods) {
      try {
        await prisma.shopPaymentMethod.create({ data: paymentMethod });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(
          `PaymentMethod already exists: ${paymentMethod.paymentMethodId}`,
          e
        );
      }
    }

    const shop1Events = [
      { shopId: shop1.id, eventId: createdEvents[0].id }, // DJナイト
      { shopId: shop1.id, eventId: createdEvents[4].id }, // カップル割引
    ];
    for (const event of shop1Events) {
      try {
        await prisma.shopEvent.create({ data: event });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`Event already exists: ${event.eventId}`, e);
      }
    }

    // 店舗2: Arabesque Cafe
    const shop2 = createdShops[1];
    const shop2Flavors = [
      { shopId: shop2.id, flavorId: createdFlavors[2].id }, // ミント
      { shopId: shop2.id, flavorId: createdFlavors[16].id }, // ローズ
      { shopId: shop2.id, flavorId: createdFlavors[19].id }, // カルダモン
      { shopId: shop2.id, flavorId: createdFlavors[20].id }, // シナモン
    ];
    for (const flavor of shop2Flavors) {
      try {
        await prisma.shopFlavor.create({ data: flavor });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`Flavor already exists: ${flavor.flavorId}`, e);
      }
    }

    const shop2Atmospheres = [
      { shopId: shop2.id, atmosphereId: createdAtmospheres[3].id }, // まったり
      { shopId: shop2.id, atmosphereId: createdAtmospheres[11].id }, // アットホーム
      { shopId: shop2.id, atmosphereId: createdAtmospheres[13].id }, // 隠れ家
    ];
    for (const atmosphere of shop2Atmospheres) {
      try {
        await prisma.shopAtmosphere.create({ data: atmosphere });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(
          `Atmosphere already exists: ${atmosphere.atmosphereId}`,
          e
        );
      }
    }

    const shop2Hobbies = [
      { shopId: shop2.id, hobbyId: createdHobbies[12].id }, // 音楽鑑賞
      { shopId: shop2.id, hobbyId: createdHobbies[13].id }, // 読書スペース
    ];
    for (const hobby of shop2Hobbies) {
      try {
        await prisma.shopHobby.create({ data: hobby });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`Hobby already exists: ${hobby.hobbyId}`, e);
      }
    }

    // 店舗3: Mint Hookah Bar
    const shop3 = createdShops[2];
    const shop3Flavors = [
      { shopId: shop3.id, flavorId: createdFlavors[2].id }, // ミント
      { shopId: shop3.id, flavorId: createdFlavors[11].id }, // マンゴー
      { shopId: shop3.id, flavorId: createdFlavors[24].id }, // グレープフルーツ
    ];
    for (const flavor of shop3Flavors) {
      try {
        await prisma.shopFlavor.create({ data: flavor });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`Flavor already exists: ${flavor.flavorId}`, e);
      }
    }

    const shop3Atmospheres = [
      { shopId: shop3.id, atmosphereId: createdAtmospheres[1].id }, // 映え重視
      { shopId: shop3.id, atmosphereId: createdAtmospheres[4].id }, // ワイワイ
      { shopId: shop3.id, atmosphereId: createdAtmospheres[12].id }, // スタイリッシュ
    ];
    for (const atmosphere of shop3Atmospheres) {
      try {
        await prisma.shopAtmosphere.create({ data: atmosphere });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(
          `Atmosphere already exists: ${atmosphere.atmosphereId}`,
          e
        );
      }
    }

    const shop3Hobbies = [
      { shopId: shop3.id, hobbyId: createdHobbies[1].id }, // ダーツ
      { shopId: shop3.id, hobbyId: createdHobbies[3].id }, // カラオケ
    ];
    for (const hobby of shop3Hobbies) {
      try {
        await prisma.shopHobby.create({ data: hobby });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`Hobby already exists: ${hobby.hobbyId}`, e);
      }
    }

    console.log("✅ シーシャ店舗のシードデータが正常に作成されました！");
    console.log(`📊 作成されたデータ:`);
    console.log(`   - フレーバー: ${createdFlavors.length}件`);
    console.log(`   - 雰囲気: ${createdAtmospheres.length}件`);
    console.log(`   - ホビー: ${createdHobbies.length}件`);
    console.log(`   - 支払い方法: ${createdPaymentMethods.length}件`);
    console.log(`   - イベント: ${createdEvents.length}件`);
    console.log(`   - 店舗: ${createdShops.length}件`);
  } catch (error) {
    console.error("❌ シードデータの作成に失敗しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプトの実行
seedShishaData()
  .then(() => {
    console.log("🎉 シーシャシードデータスクリプトが完了しました！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 シードデータスクリプトでエラーが発生しました:", error);
    process.exit(1);
  });

export { seedShishaData };
