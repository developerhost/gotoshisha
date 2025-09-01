/**
 * いいねテーブルのシードデータ
 */
import { PrismaClient, type User, type Post } from "@prisma/client";

export async function seedLikes(
  prisma: PrismaClient,
  users: User[],
  posts: Post[]
) {
  console.log("👍 いいねデータを作成中...");

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
}
