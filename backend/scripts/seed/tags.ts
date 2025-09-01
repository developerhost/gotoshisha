/**
 * タグテーブルのシードデータ
 */
import { PrismaClient } from "@prisma/client";

export async function seedTags(prisma: PrismaClient) {
  console.log("🏷️ タグデータを作成中...");

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
  return tags;
}
