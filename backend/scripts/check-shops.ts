/**
 * データベースの店舗データを確認するスクリプト
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkShops() {
  console.log("🔍 データベースの店舗データを確認中...");

  try {
    // 全店舗数を確認
    const totalShops = await prisma.shop.count();
    console.log(`📊 総店舗数: ${totalShops}件`);

    // 最近追加された店舗を確認
    const recentShops = await prisma.shop.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        address: true,
        createdAt: true,
      }
    });

    console.log("\n📍 最近追加された店舗:");
    recentShops.forEach((shop, index) => {
      console.log(`${index + 1}. ${shop.name}`);
      console.log(`   住所: ${shop.address}`);
      console.log(`   座標: (${shop.latitude}, ${shop.longitude})`);
      console.log(`   作成日: ${shop.createdAt}`);
      console.log("");
    });

    // アメリカの店舗を具体的に検索
    const usShops = await prisma.shop.findMany({
      where: {
        OR: [
          { address: { contains: "NY" } },
          { address: { contains: "CA" } },
          { address: { contains: "IL" } },
          { address: { contains: "FL" } },
          { address: { contains: "NV" } },
          { address: { contains: "TX" } },
          { name: { contains: "NYC" } },
          { name: { contains: "Chicago" } },
          { name: { contains: "Miami" } },
          { name: { contains: "Desert" } },
          { name: { contains: "Sahara" } },
          { name: { contains: "Babylon" } },
        ]
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        address: true,
      }
    });

    console.log(`🇺🇸 アメリカの店舗: ${usShops.length}件`);
    usShops.forEach((shop, index) => {
      console.log(`${index + 1}. ${shop.name} (${shop.latitude}, ${shop.longitude})`);
      console.log(`   ${shop.address}`);
    });

    // 特定の座標範囲でテスト検索
    console.log("\n🧪 ニューヨーク周辺のテスト検索:");
    const nycLat = 40.7359;
    const nycLng = -73.9911;
    const radius = 50; // 50km
    
    // 簡易的な範囲計算
    const latRange = radius / 111;
    const lonRange = radius / (111 * Math.cos((nycLat * Math.PI) / 180));
    
    const nycAreaShops = await prisma.shop.findMany({
      where: {
        latitude: {
          gte: nycLat - latRange,
          lte: nycLat + latRange,
        },
        longitude: {
          gte: nycLng - lonRange,
          lte: nycLng + lonRange,
        },
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        address: true,
      }
    });

    console.log(`範囲内の店舗: ${nycAreaShops.length}件`);
    nycAreaShops.forEach((shop, index) => {
      if (shop.latitude !== null && shop.longitude !== null) {
        const distance = Math.sqrt(
          Math.pow(shop.latitude - nycLat, 2) + Math.pow(shop.longitude - nycLng, 2)
        ) * 111;
        console.log(`${index + 1}. ${shop.name} (距離: ${distance.toFixed(2)}km)`);
      }
    });

  } catch (error) {
    console.error("❌ データの確認に失敗しました:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// スクリプトの実行
checkShops()
  .then(() => {
    console.log("✅ データ確認完了");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 エラーが発生しました:", error);
    process.exit(1);
  });
