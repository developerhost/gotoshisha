/**
 * ユーザーテーブルのシードデータ
 */
import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  console.log("👥 ユーザーデータを作成中...");

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
  return users;
}
