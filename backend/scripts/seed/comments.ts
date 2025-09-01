/**
 * コメントテーブルのシードデータ
 */
import { PrismaClient, type User, type Post } from "@prisma/client";

export async function seedComments(
  prisma: PrismaClient,
  users: User[],
  posts: Post[]
) {
  console.log("💬 コメントデータを作成中...");

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
}
