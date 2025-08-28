/**
 * シーシャショップテーブルのシードデータ
 */
import {
  PrismaClient,
  type Flavor,
  type Atmosphere,
  type Hobby,
  type PaymentMethod,
  type Event,
} from "@prisma/client";

interface ShishaMasters {
  flavors: Flavor[];
  atmospheres: Atmosphere[];
  hobbies: Hobby[];
  paymentMethods: PaymentMethod[];
  events: Event[];
}

export async function seedShops(prisma: PrismaClient, masters: ShishaMasters) {
  console.log("🏪 シーシャショップデータを作成中...");

  const shopsData = [
    {
      name: "シーシャカフェ 渋谷店",
      address: "東京都渋谷区渋谷1-2-3 シーシャビル2F",
      nearestStation: "渋谷駅",
      stationWalkTime: 5,
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
      budgetMin: 2000,
      budgetMax: 4000,
      seatingCount: 35,
      seatingTypes: "ソファ席・カウンター席",
      reservation: "RECOMMENDED",
      privateBooking: false,
      wifi: true,
      powerOutlet: true,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "近隣コインパーキング利用",
      timeLimit: "2時間制",
      hookahBrand: "Khalil Mamoon",
      flavorCount: 70,
      photos: JSON.stringify([
        "https://example.com/shibuya-shisha-1.jpg",
        "https://example.com/shibuya-shisha-2.jpg",
      ]),
      websiteUrl: "https://shisha-cafe-shibuya.com",
      googleMapUrl: "https://maps.google.com/place/shisha-cafe-shibuya",
      snsLinks: JSON.stringify({
        instagram: "@shisha_cafe_shibuya",
        twitter: "@shisha_shibuya",
      }),
      latitude: 35.6598,
      longitude: 139.7006,
    },
    {
      name: "Hookah Lounge 新宿",
      address: "東京都新宿区新宿3-4-5 フーカビル3F",
      nearestStation: "新宿駅",
      stationWalkTime: 7,
      openingHours: JSON.stringify({
        mon: "18:00-03:00",
        tue: "18:00-03:00",
        wed: "18:00-03:00",
        thu: "18:00-03:00",
        fri: "18:00-04:00",
        sat: "18:00-04:00",
        sun: "18:00-02:00",
      }),
      holidays: "不定休",
      budgetMin: 2500,
      budgetMax: 5000,
      seatingCount: 50,
      seatingTypes: "ソファ席・VIP個室・テラス席",
      reservation: "REQUIRED",
      privateBooking: true,
      wifi: true,
      powerOutlet: true,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "提携駐車場あり（2時間無料）",
      timeLimit: "無制限",
      hookahBrand: "Starbuzz",
      flavorCount: 100,
      photos: JSON.stringify([
        "https://example.com/hookah-lounge-shinjuku-1.jpg",
        "https://example.com/hookah-lounge-shinjuku-2.jpg",
        "https://example.com/hookah-lounge-shinjuku-3.jpg",
      ]),
      websiteUrl: "https://hookah-lounge-shinjuku.jp",
      googleMapUrl: "https://maps.google.com/place/hookah-lounge-shinjuku",
      snsLinks: JSON.stringify({
        instagram: "@hookah_lounge_shinjuku",
        twitter: "@hookah_shinjuku",
        facebook: "hookah.lounge.shinjuku",
      }),
      latitude: 35.6896,
      longitude: 139.7006,
    },
    {
      name: "煙草天国 池袋店",
      address: "東京都豊島区池袋2-1-1 スモークタワー1F",
      nearestStation: "池袋駅",
      stationWalkTime: 3,
      openingHours: JSON.stringify({
        mon: "16:00-01:00",
        tue: "16:00-01:00",
        wed: "16:00-01:00",
        thu: "16:00-01:00",
        fri: "16:00-02:00",
        sat: "16:00-02:00",
        sun: "16:00-00:00",
      }),
      holidays: "毎週火曜日",
      budgetMin: 1800,
      budgetMax: 3500,
      seatingCount: 40,
      seatingTypes: "ソファ席・座敷席・カウンター席",
      reservation: "NOT_REQUIRED",
      privateBooking: false,
      wifi: true,
      powerOutlet: false,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "なし",
      timeLimit: "3時間制（混雑時）",
      hookahBrand: "Al Fakher",
      flavorCount: 80,
      photos: JSON.stringify([
        "https://example.com/tabako-tengoku-1.jpg",
        "https://example.com/tabako-tengoku-2.jpg",
      ]),
      websiteUrl: "https://tabako-tengoku.com",
      googleMapUrl: "https://maps.google.com/place/tabako-tengoku-ikebukuro",
      snsLinks: JSON.stringify({
        instagram: "@tabako_tengoku",
        twitter: "@tabako_tengoku_ikebukuro",
      }),
      latitude: 35.7295,
      longitude: 139.7109,
    },
    {
      name: "Oriental Smoke 原宿",
      address: "東京都渋谷区神宮前1-2-3 オリエンタルビル2F",
      nearestStation: "原宿駅",
      stationWalkTime: 6,
      openingHours: JSON.stringify({
        mon: "15:00-23:00",
        tue: "15:00-23:00",
        wed: "15:00-23:00",
        thu: "15:00-23:00",
        fri: "15:00-01:00",
        sat: "15:00-01:00",
        sun: "15:00-22:00",
      }),
      holidays: "年末年始",
      budgetMin: 2200,
      budgetMax: 4500,
      seatingCount: 30,
      seatingTypes: "ソファ席・個室",
      reservation: "RECOMMENDED",
      privateBooking: true,
      wifi: true,
      powerOutlet: true,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "近隣コインパーキング利用",
      timeLimit: "無制限",
      hookahBrand: "KM",
      flavorCount: 65,
      photos: JSON.stringify(["https://example.com/oriental-smoke-1.jpg"]),
      websiteUrl: "https://oriental-smoke.tokyo",
      googleMapUrl: "https://maps.google.com/place/oriental-smoke-harajuku",
      snsLinks: JSON.stringify({
        instagram: "@oriental_smoke_harajuku",
      }),
      latitude: 35.6751,
      longitude: 139.7028,
    },
    {
      name: "シーシャパラダイス 六本木",
      address: "東京都港区六本木6-7-8 パラダイスタワー4F",
      nearestStation: "六本木駅",
      stationWalkTime: 4,
      openingHours: JSON.stringify({
        mon: "19:00-04:00",
        tue: "19:00-04:00",
        wed: "19:00-04:00",
        thu: "19:00-04:00",
        fri: "19:00-05:00",
        sat: "19:00-05:00",
        sun: "19:00-03:00",
      }),
      holidays: "年中無休",
      budgetMin: 3000,
      budgetMax: 6000,
      seatingCount: 60,
      seatingTypes: "ソファ席・VIP個室・ルーフトップテラス",
      reservation: "REQUIRED",
      privateBooking: true,
      wifi: true,
      powerOutlet: true,
      smokingPolicy: "SMOKING_ALLOWED",
      parkingInfo: "バレーパーキングサービスあり",
      timeLimit: "シーシャ切れまで",
      hookahBrand: "Fumari",
      flavorCount: 120,
      photos: JSON.stringify([
        "https://example.com/shisha-paradise-1.jpg",
        "https://example.com/shisha-paradise-2.jpg",
        "https://example.com/shisha-paradise-3.jpg",
        "https://example.com/shisha-paradise-4.jpg",
      ]),
      websiteUrl: "https://shisha-paradise-roppongi.com",
      googleMapUrl: "https://maps.google.com/place/shisha-paradise-roppongi",
      snsLinks: JSON.stringify({
        instagram: "@shisha_paradise_roppongi",
        twitter: "@shisha_paradise",
        facebook: "shisha.paradise.roppongi",
        tiktok: "@shisha_paradise",
      }),
      latitude: 35.6627,
      longitude: 139.7279,
    },
  ];

  // 既存の店舗を更新または新規作成
  const shops = [];
  for (const shopData of shopsData) {
    const existingShop = await prisma.shop.findFirst({
      where: { name: shopData.name },
    });

    if (existingShop) {
      const updated = await prisma.shop.update({
        where: { id: existingShop.id },
        data: shopData,
      });
      shops.push(updated);
    } else {
      const created = await prisma.shop.create({
        data: shopData,
      });
      shops.push(created);
    }
  }

  console.log(`✅ ${shops.length}軒のシーシャショップを更新/作成しました`);

  // 店舗とマスタデータの関連付け
  console.log("🔗 店舗とマスタデータを関連付け中...");

  // 店舗1: シーシャカフェ 渋谷店
  const shop1 = shops[0];
  const shop1Relations = [
    // フレーバー
    {
      table: "shopFlavor",
      data: {
        shopId: shop1.id,
        flavorId: masters.flavors.find((f) => f.name === "アップル")?.id,
      },
    },
    {
      table: "shopFlavor",
      data: {
        shopId: shop1.id,
        flavorId: masters.flavors.find((f) => f.name === "グレープ")?.id,
      },
    },
    {
      table: "shopFlavor",
      data: {
        shopId: shop1.id,
        flavorId: masters.flavors.find((f) => f.name === "ミント")?.id,
      },
    },
    {
      table: "shopFlavor",
      data: {
        shopId: shop1.id,
        flavorId: masters.flavors.find((f) => f.name === "ストロベリー")?.id,
      },
    },
    {
      table: "shopFlavor",
      data: {
        shopId: shop1.id,
        flavorId: masters.flavors.find((f) => f.name === "チョコレート")?.id,
      },
    },
    // 雰囲気
    {
      table: "shopAtmosphere",
      data: {
        shopId: shop1.id,
        atmosphereId: masters.atmospheres.find((a) => a.name === "味重視")?.id,
      },
    },
    {
      table: "shopAtmosphere",
      data: {
        shopId: shop1.id,
        atmosphereId: masters.atmospheres.find((a) => a.name === "デート向き")
          ?.id,
      },
    },
    {
      table: "shopAtmosphere",
      data: {
        shopId: shop1.id,
        atmosphereId: masters.atmospheres.find((a) => a.name === "高級感")?.id,
      },
    },
    // ホビー
    {
      table: "shopHobby",
      data: {
        shopId: shop1.id,
        hobbyId: masters.hobbies.find((h) => h.name === "ジェンガ")?.id,
      },
    },
    {
      table: "shopHobby",
      data: {
        shopId: shop1.id,
        hobbyId: masters.hobbies.find((h) => h.name === "ボードゲーム")?.id,
      },
    },
    // 支払い方法
    {
      table: "shopPaymentMethod",
      data: {
        shopId: shop1.id,
        paymentMethodId: masters.paymentMethods.find((p) => p.name === "現金")
          ?.id,
      },
    },
    {
      table: "shopPaymentMethod",
      data: {
        shopId: shop1.id,
        paymentMethodId: masters.paymentMethods.find((p) => p.name === "Visa")
          ?.id,
      },
    },
    {
      table: "shopPaymentMethod",
      data: {
        shopId: shop1.id,
        paymentMethodId: masters.paymentMethods.find((p) => p.name === "PayPay")
          ?.id,
      },
    },
    // イベント
    {
      table: "shopEvent",
      data: {
        shopId: shop1.id,
        eventId: masters.events.find((e) => e.name === "DJナイト")?.id,
      },
    },
    {
      table: "shopEvent",
      data: {
        shopId: shop1.id,
        eventId: masters.events.find((e) => e.name === "カップル割引")?.id,
      },
    },
  ];

  for (const relation of shop1Relations) {
    if (
      relation.data &&
      Object.values(relation.data).every((v) => v !== undefined)
    ) {
      try {
        await (prisma as any)[relation.table].create({ data: relation.data });
      } catch (e) {
        // 既に存在する場合はスキップ
        console.warn(`関連データが既に存在: ${relation.table}`, e);
      }
    }
  }

  // 店舗2: Hookah Lounge 新宿（ミント、ローズ、カルダモンなど異なるフレーバー）
  const shop2 = shops[1];
  const shop2Relations = [
    // フレーバー
    {
      table: "shopFlavor",
      data: {
        shopId: shop2.id,
        flavorId: masters.flavors.find((f) => f.name === "ミント")?.id,
      },
    },
    {
      table: "shopFlavor",
      data: {
        shopId: shop2.id,
        flavorId: masters.flavors.find((f) => f.name === "ローズ")?.id,
      },
    },
    {
      table: "shopFlavor",
      data: {
        shopId: shop2.id,
        flavorId: masters.flavors.find((f) => f.name === "カルダモン")?.id,
      },
    },
    // 雰囲気
    {
      table: "shopAtmosphere",
      data: {
        shopId: shop2.id,
        atmosphereId: masters.atmospheres.find((a) => a.name === "映え重視")
          ?.id,
      },
    },
    {
      table: "shopAtmosphere",
      data: {
        shopId: shop2.id,
        atmosphereId: masters.atmospheres.find((a) => a.name === "ワイワイ")
          ?.id,
      },
    },
    // ホビー
    {
      table: "shopHobby",
      data: {
        shopId: shop2.id,
        hobbyId: masters.hobbies.find((h) => h.name === "ダーツ")?.id,
      },
    },
    {
      table: "shopHobby",
      data: {
        shopId: shop2.id,
        hobbyId: masters.hobbies.find((h) => h.name === "カラオケ")?.id,
      },
    },
  ];

  for (const relation of shop2Relations) {
    if (
      relation.data &&
      Object.values(relation.data).every((v) => v !== undefined)
    ) {
      try {
        await (prisma as any)[relation.table].create({ data: relation.data });
      } catch (e) {
        console.warn(`関連データが既に存在: ${relation.table}`, e);
      }
    }
  }

  console.log("✅ 店舗とマスタデータの関連付けが完了しました");
  return shops;
}
