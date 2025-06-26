/**
 * アメリカのシーシャ店舗データを直接データベースに追加するスクリプト
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUSShops() {
  console.log("🇺🇸 アメリカのシーシャ店舗データを追加中...");

  try {
    // アメリカのシーシャ店舗データ
    const usShops = [
      {
        name: "Hookah Palace NYC",
        address: "123 E 14th St, New York, NY 10003",
        nearestStation: "Union Square",
        stationWalkTime: 2,
        openingHours: JSON.stringify({
          mon: "17:00-02:00",
          tue: "17:00-02:00",
          wed: "17:00-02:00",
          thu: "17:00-02:00",
          fri: "17:00-03:00",
          sat: "17:00-03:00",
          sun: "17:00-01:00",
        }),
        holidays: "年中無休",
        budgetMin: 20, // USD
        budgetMax: 45,
        seatingCount: 50,
        seatingTypes: "ソファ席・ルーフトップ席・VIP個室",
        reservation: "RECOMMENDED" as const,
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
        smokingPolicy: "SMOKING_ALLOWED" as const,
        parkingInfo: "ストリートパーキング",
        timeLimit: "無制限",
        hookahBrand: "Khalil Mamoon",
        flavorCount: 120,
        photos: JSON.stringify([
          "https://example.com/hookah-palace-nyc-1.jpg",
          "https://example.com/hookah-palace-nyc-2.jpg",
        ]),
        websiteUrl: "https://hookahpalacenyc.com",
        googleMapUrl: "https://maps.google.com/place/hookah-palace-nyc",
        snsLinks: JSON.stringify({
          instagram: "@hookahpalacenyc",
          twitter: "@hookahpalace",
        }),
        latitude: 40.7359, // Union Square, NYC
        longitude: -73.9911,
      },
      {
        name: "Babylon Hookah Lounge",
        address: "8134 Sunset Blvd, West Hollywood, CA 90046",
        nearestStation: "West Hollywood",
        stationWalkTime: 5,
        openingHours: JSON.stringify({
          mon: "19:00-02:00",
          tue: "19:00-02:00",
          wed: "19:00-02:00",
          thu: "19:00-02:00",
          fri: "19:00-03:00",
          sat: "19:00-03:00",
          sun: "19:00-01:00",
        }),
        holidays: "クリスマス",
        budgetMin: 25,
        budgetMax: 50,
        seatingCount: 40,
        seatingTypes: "ソファ席・パティオ席",
        reservation: "NOT_REQUIRED" as const,
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
        smokingPolicy: "SMOKING_ALLOWED" as const,
        parkingInfo: "バレーパーキング利用可",
        timeLimit: "3時間制",
        hookahBrand: "Starbuzz",
        flavorCount: 90,
        photos: JSON.stringify([
          "https://example.com/babylon-la-1.jpg",
          "https://example.com/babylon-la-2.jpg",
        ]),
        websiteUrl: "https://babylonhookahla.com",
        googleMapUrl: "https://maps.google.com/place/babylon-hookah-la",
        snsLinks: JSON.stringify({
          instagram: "@babylonhookahla",
          twitter: "@babylonla",
        }),
        latitude: 34.0969, // West Hollywood, CA
        longitude: -118.3267,
      },
      {
        name: "Chicago Shisha Co.",
        address: "2156 N Clybourn Ave, Chicago, IL 60614",
        nearestStation: "Fullerton",
        stationWalkTime: 8,
        openingHours: JSON.stringify({
          mon: "18:00-01:00",
          tue: "18:00-01:00",
          wed: "18:00-01:00",
          thu: "18:00-02:00",
          fri: "18:00-02:00",
          sat: "18:00-02:00",
          sun: "18:00-01:00",
        }),
        holidays: "サンクスギビング・クリスマス",
        budgetMin: 18,
        budgetMax: 40,
        seatingCount: 35,
        seatingTypes: "ソファ席・カウンター席",
        reservation: "RECOMMENDED" as const,
        privateBooking: false,
        wifi: true,
        powerOutlet: true,
        smokingPolicy: "SMOKING_ALLOWED" as const,
        parkingInfo: "専用駐車場あり",
        timeLimit: "2時間制",
        hookahBrand: "Al Fakher",
        flavorCount: 75,
        photos: JSON.stringify([
          "https://example.com/chicago-shisha-1.jpg",
        ]),
        websiteUrl: "https://chicagoshisha.co",
        googleMapUrl: "https://maps.google.com/place/chicago-shisha",
        snsLinks: JSON.stringify({
          instagram: "@chicagoshishaco",
        }),
        latitude: 41.9244, // Lincoln Park, Chicago
        longitude: -87.6544,
      },
      {
        name: "Miami Beach Hookah",
        address: "1424 Alton Rd, Miami Beach, FL 33139",
        nearestStation: "Lincoln Road",
        stationWalkTime: 3,
        openingHours: JSON.stringify({
          mon: "20:00-03:00",
          tue: "20:00-03:00",
          wed: "20:00-03:00",
          thu: "20:00-04:00",
          fri: "20:00-04:00",
          sat: "20:00-04:00",
          sun: "20:00-02:00",
        }),
        holidays: "年中無休",
        budgetMin: 30,
        budgetMax: 60,
        seatingCount: 60,
        seatingTypes: "ビーチ席・ルーフトップ・VIP個室",
        reservation: "REQUIRED" as const,
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
        smokingPolicy: "SMOKING_ALLOWED" as const,
        parkingInfo: "バレーパーキング",
        timeLimit: "無制限",
        hookahBrand: "Fumari",
        flavorCount: 110,
        photos: JSON.stringify([
          "https://example.com/miami-hookah-1.jpg",
          "https://example.com/miami-hookah-2.jpg",
          "https://example.com/miami-hookah-3.jpg",
        ]),
        websiteUrl: "https://miamibeachhookah.com",
        googleMapUrl: "https://maps.google.com/place/miami-beach-hookah",
        snsLinks: JSON.stringify({
          instagram: "@miamibeachhookah",
          twitter: "@miamihookah",
          tiktok: "@miamibeachhookah",
        }),
        latitude: 25.7907, // Miami Beach, FL
        longitude: -80.1419,
      },
      {
        name: "Desert Winds Hookah",
        address: "4455 S Maryland Pkwy, Las Vegas, NV 89119",
        nearestStation: "University of Nevada",
        stationWalkTime: 10,
        openingHours: JSON.stringify({
          mon: "19:00-02:00",
          tue: "19:00-02:00",
          wed: "19:00-02:00",
          thu: "19:00-03:00",
          fri: "19:00-04:00",
          sat: "19:00-04:00",
          sun: "19:00-01:00",
        }),
        holidays: "クリスマス・新年",
        budgetMin: 22,
        budgetMax: 48,
        seatingCount: 45,
        seatingTypes: "ソファ席・パティオ席・個室",
        reservation: "NOT_REQUIRED" as const,
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
        smokingPolicy: "SMOKING_ALLOWED" as const,
        parkingInfo: "無料駐車場完備",
        timeLimit: "シーシャ切れまで",
        hookahBrand: "Tangiers",
        flavorCount: 85,
        photos: JSON.stringify([
          "https://example.com/desert-winds-1.jpg",
          "https://example.com/desert-winds-2.jpg",
        ]),
        websiteUrl: "https://desertwindshookah.com",
        googleMapUrl: "https://maps.google.com/place/desert-winds-hookah",
        snsLinks: JSON.stringify({
          instagram: "@desertwindshookah",
          facebook: "desert.winds.hookah",
        }),
        latitude: 36.1028, // Las Vegas, NV
        longitude: -115.1355,
      },
      {
        name: "Sahara Nights Hookah",
        address: "4620 Westheimer Rd, Houston, TX 77027",
        nearestStation: "Galleria",
        stationWalkTime: 7,
        openingHours: JSON.stringify({
          mon: "18:00-01:00",
          tue: "18:00-01:00",
          wed: "18:00-01:00",
          thu: "18:00-02:00",
          fri: "18:00-03:00",
          sat: "18:00-03:00",
          sun: "18:00-01:00",
        }),
        holidays: "クリスマス・新年",
        budgetMin: 19,
        budgetMax: 42,
        seatingCount: 38,
        seatingTypes: "ソファ席・テラス席",
        reservation: "RECOMMENDED" as const,
        privateBooking: true,
        wifi: true,
        powerOutlet: true,
        smokingPolicy: "SMOKING_ALLOWED" as const,
        parkingInfo: "無料駐車場",
        timeLimit: "3時間制",
        hookahBrand: "Al Waha",
        flavorCount: 95,
        photos: JSON.stringify([
          "https://example.com/sahara-nights-1.jpg",
        ]),
        websiteUrl: "https://saharanightshookah.com",
        googleMapUrl: "https://maps.google.com/place/sahara-nights-hookah",
        snsLinks: JSON.stringify({
          instagram: "@saharanightshookah",
          facebook: "sahara.nights.hookah",
        }),
        latitude: 29.7372, // Houston, TX
        longitude: -95.4618,
      },
    ];

    // 店舗データを作成
    const createdShops = [];
    for (const shopData of usShops) {
      console.log(`店舗を作成中: ${shopData.name}`);
      
      try {
        const shop = await prisma.shop.create({
          data: shopData,
        });
        createdShops.push(shop);
        console.log(`✅ ${shop.name} を作成しました (ID: ${shop.id})`);
      } catch (error) {
        console.error(`❌ ${shopData.name} の作成に失敗:`, error);
      }
    }

    // フレーバー、雰囲気、ホビーのマスタデータを取得
    const flavors = await prisma.flavor.findMany();
    const atmospheres = await prisma.atmosphere.findMany();
    const hobbies = await prisma.hobby.findMany();
    const paymentMethods = await prisma.paymentMethod.findMany();

    console.log("関連データを追加中...");

    // 各店舗に関連データを追加
    for (let i = 0; i < createdShops.length; i++) {
      const shop = createdShops[i];
      
      try {
        // フレーバーを追加（ランダムに3-5個）
        const selectedFlavors = flavors
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 3);
        
        for (const flavor of selectedFlavors) {
          await prisma.shopFlavor.create({
            data: {
              shopId: shop.id,
              flavorId: flavor.id,
            },
          }).catch(() => {}); // 重複エラーを無視
        }

        // 雰囲気を追加（ランダムに2-3個）
        const selectedAtmospheres = atmospheres
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 2) + 2);
        
        for (const atmosphere of selectedAtmospheres) {
          await prisma.shopAtmosphere.create({
            data: {
              shopId: shop.id,
              atmosphereId: atmosphere.id,
            },
          }).catch(() => {}); // 重複エラーを無視
        }

        // ホビーを追加（ランダムに1-3個）
        const selectedHobbies = hobbies
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 1);
        
        for (const hobby of selectedHobbies) {
          await prisma.shopHobby.create({
            data: {
              shopId: shop.id,
              hobbyId: hobby.id,
            },
          }).catch(() => {}); // 重複エラーを無視
        }

        // 支払い方法を追加（ランダムに2-4個）
        const selectedPaymentMethods = paymentMethods
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 2);
        
        for (const paymentMethod of selectedPaymentMethods) {
          await prisma.shopPaymentMethod.create({
            data: {
              shopId: shop.id,
              paymentMethodId: paymentMethod.id,
            },
          }).catch(() => {}); // 重複エラーを無視
        }

        console.log(`✅ ${shop.name} の関連データを追加しました`);
      } catch (error) {
        console.error(`❌ ${shop.name} の関連データ追加に失敗:`, error);
      }
    }

    console.log("🎉 アメリカのシーシャ店舗データの追加が完了しました！");
    console.log(`📊 追加されたデータ:`);
    console.log(`   - 店舗: ${createdShops.length}件`);
    
    // 追加された店舗の詳細を表示
    createdShops.forEach(shop => {
      console.log(`   * ${shop.name} (${shop.latitude}, ${shop.longitude})`);
    });

  } catch (error) {
    console.error("❌ データの追加に失敗しました:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプトの実行
addUSShops()
  .then(() => {
    console.log("✨ スクリプトが正常に完了しました！");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 スクリプトでエラーが発生しました:", error);
    process.exit(1);
  });

export { addUSShops };
