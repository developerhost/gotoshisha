/**
 * 投稿テーブルのシードデータ
 */
import { PrismaClient, type User, type Tag } from "@prisma/client";

export async function seedPosts(
  prisma: PrismaClient,
  users: User[],
  tags: Tag[]
) {
  console.log("📝 投稿データを作成中...");

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
  return posts;
}
