import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * サンプルデータを作成
 */
async function main() {
  console.log("🌱 データベースにシードデータを投入中...");

  // ユーザーの作成
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: {
        email: "alice@example.com",
        name: "Alice Johnson",
        avatar: "https://example.com/avatars/alice.jpg",
      },
    }),
    prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: {
        email: "bob@example.com",
        name: "Bob Smith",
        avatar: "https://example.com/avatars/bob.jpg",
      },
    }),
    prisma.user.upsert({
      where: { email: "charlie@example.com" },
      update: {},
      create: {
        email: "charlie@example.com",
        name: "Charlie Brown",
        avatar: "https://example.com/avatars/charlie.jpg",
      },
    }),
  ]);

  console.log(`✅ ${users.length}人のユーザーを作成しました`);

  // タグの作成
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: "観光地" },
      update: {},
      create: {
        name: "観光地",
        color: "#FF6B6B",
      },
    }),
    prisma.tag.upsert({
      where: { name: "グルメ" },
      update: {},
      create: {
        name: "グルメ",
        color: "#4ECDC4",
      },
    }),
    prisma.tag.upsert({
      where: { name: "自然" },
      update: {},
      create: {
        name: "自然",
        color: "#45B7D1",
      },
    }),
    prisma.tag.upsert({
      where: { name: "アート" },
      update: {},
      create: {
        name: "アート",
        color: "#96CEB4",
      },
    }),
    prisma.tag.upsert({
      where: { name: "ショッピング" },
      update: {},
      create: {
        name: "ショッピング",
        color: "#FFEAA7",
      },
    }),
  ]);

  console.log(`✅ ${tags.length}個のタグを作成しました`);

  // 投稿の作成
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "東京タワーからの絶景",
        content:
          "東京タワーの展望台から見た夜景は本当に美しかったです！特に夕暮れ時の景色は格別でした。",
        imageUrl: "https://example.com/images/tokyo-tower.jpg",
        latitude: 35.6586,
        longitude: 139.7454,
        address: "東京都港区芝公園4-2-8",
        isPublic: true,
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "築地市場の新鮮な寿司",
        content:
          "築地市場で食べた寿司は今まで食べた中で最高でした。特にマグロの中トロが絶品！",
        imageUrl: "https://example.com/images/tsukiji-sushi.jpg",
        latitude: 35.6654,
        longitude: 139.7707,
        address: "東京都中央区築地5-2-1",
        isPublic: true,
        authorId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "鎌倉の大仏様",
        content:
          "鎌倉の大仏様を訪れました。その大きさと歴史的な重みに圧倒されました。",
        imageUrl: "https://example.com/images/kamakura-daibutsu.jpg",
        latitude: 35.3168,
        longitude: 139.5358,
        address: "神奈川県鎌倉市長谷4-2-28",
        isPublic: true,
        authorId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "富士山の朝日",
        content: "富士山頂から見た朝日は一生忘れられない思い出になりました。",
        imageUrl: "https://example.com/images/fuji-sunrise.jpg",
        latitude: 35.3606,
        longitude: 138.7278,
        address: "山梨県・静岡県",
        isPublic: true,
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "秋葉原電気街",
        content:
          "秋葉原の電気街を散策。最新のガジェットとアニメグッズがたくさん！",
        imageUrl: "https://example.com/images/akihabara.jpg",
        latitude: 35.6986,
        longitude: 139.7738,
        address: "東京都千代田区外神田1-15-16",
        isPublic: true,
        authorId: users[1].id,
      },
    }),
  ]);

  console.log(`✅ ${posts.length}件の投稿を作成しました`);

  // 投稿とタグの関連付け
  await Promise.all([
    prisma.postTag.create({
      data: {
        postId: posts[0].id,
        tagId: tags[0].id, // 観光地
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[1].id,
        tagId: tags[1].id, // グルメ
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[2].id,
        tagId: tags[0].id, // 観光地
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[2].id,
        tagId: tags[3].id, // アート
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[3].id,
        tagId: tags[2].id, // 自然
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[4].id,
        tagId: tags[4].id, // ショッピング
      },
    }),
  ]);

  console.log("✅ 投稿とタグを関連付けました");

  // いいねの作成
  await Promise.all([
    prisma.like.create({
      data: {
        userId: users[0].id,
        postId: posts[1].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[0].id,
        postId: posts[2].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[1].id,
        postId: posts[0].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[1].id,
        postId: posts[3].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[0].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[1].id,
      },
    }),
  ]);

  console.log("✅ いいねを作成しました");

  // コメントの作成
  await Promise.all([
    prisma.comment.create({
      data: {
        content: "素晴らしい景色ですね！私も行ってみたいです。",
        userId: users[1].id,
        postId: posts[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "おいしそう！どのお店で食べましたか？",
        userId: users[0].id,
        postId: posts[1].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "歴史を感じる素敵な場所ですね。",
        userId: users[0].id,
        postId: posts[2].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "いつか富士山に登ってみたいです！",
        userId: users[2].id,
        postId: posts[3].id,
      },
    }),
  ]);

  console.log("✅ コメントを作成しました");

  // シーシャショップのデータを作成
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

  console.log("🎉 シードデータの投入が完了しました！");
}

main()
  .catch((e) => {
    console.error("❌ シードデータの投入中にエラーが発生しました:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
