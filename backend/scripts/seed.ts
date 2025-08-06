import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * サンプルデータを作成
 */
async function main() {
  console.log("🌱 データベースにシードデータを投入中...");

  // ユーザーの作成
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice Johnson",
        avatar: "https://example.com/avatars/alice.jpg",
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob Smith",
        avatar: "https://example.com/avatars/bob.jpg",
      },
    }),
    prisma.user.create({
      data: {
        email: "charlie@example.com",
        name: "Charlie Brown",
        avatar: "https://example.com/avatars/charlie.jpg",
      },
    }),
  ]);

  console.log(`✅ ${users.length}人のユーザーを作成しました`);

  // タグの作成
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: "観光地",
        color: "#FF6B6B",
      },
    }),
    prisma.tag.create({
      data: {
        name: "グルメ",
        color: "#4ECDC4",
      },
    }),
    prisma.tag.create({
      data: {
        name: "自然",
        color: "#45B7D1",
      },
    }),
    prisma.tag.create({
      data: {
        name: "アート",
        color: "#96CEB4",
      },
    }),
    prisma.tag.create({
      data: {
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
        title: "上野公園の桜",
        content:
          "春の上野公園は桜が満開で、多くの人がお花見を楽しんでいました。",
        imageUrl: "https://example.com/images/ueno-sakura.jpg",
        latitude: 35.7148,
        longitude: 139.7731,
        address: "東京都台東区上野公園",
        isPublic: true,
        authorId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "渋谷スクランブル交差点",
        content:
          "世界で最も有名な交差点の一つ。人の流れを見ているだけで面白い！",
        imageUrl: "https://example.com/images/shibuya-crossing.jpg",
        latitude: 35.6598,
        longitude: 139.7006,
        address: "東京都渋谷区道玄坂2-1",
        isPublic: true,
        authorId: users[0].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "プライベートな場所",
        content: "これは非公開の投稿です。",
        latitude: 35.6762,
        longitude: 139.6503,
        address: "東京都新宿区西新宿2-8-1",
        isPublic: false,
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
        tagId: tags[2].id, // 自然
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[3].id,
        tagId: tags[0].id, // 観光地
      },
    }),
    prisma.postTag.create({
      data: {
        postId: posts[3].id,
        tagId: tags[4].id, // ショッピング
      },
    }),
  ]);

  console.log("✅ 投稿とタグの関連付けを作成しました");

  // いいねの作成
  await Promise.all([
    prisma.like.create({
      data: {
        userId: users[1].id,
        postId: posts[0].id,
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
        userId: users[0].id,
        postId: posts[1].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[2].id,
        postId: posts[1].id,
      },
    }),
    prisma.like.create({
      data: {
        userId: users[0].id,
        postId: posts[2].id,
      },
    }),
  ]);

  console.log("✅ いいねを作成しました");

  // コメントの作成
  await Promise.all([
    prisma.comment.create({
      data: {
        content: "素晴らしい写真ですね！私も行ってみたいです。",
        userId: users[1].id,
        postId: posts[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "夜景が本当にきれいですね。",
        userId: users[2].id,
        postId: posts[0].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "築地の寿司は最高ですよね！おすすめのお店はありますか？",
        userId: users[0].id,
        postId: posts[1].id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "桜の季節の上野公園は本当に美しいです。",
        userId: users[1].id,
        postId: posts[2].id,
      },
    }),
  ]);

  console.log("✅ コメントを作成しました");

  // シーシャショップのデータを作成
  const shops = await Promise.all([
    prisma.shop.create({
      data: {
        name: "シーシャカフェ 渋谷店",
        address: "東京都渋谷区渋谷1-2-3 シーシャビル2F",
        latitude: 35.6598,
        longitude: 139.7006,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.shop.create({
      data: {
        name: "Hookah Lounge 新宿",
        address: "東京都新宿区新宿3-4-5 フーカビル3F",
        latitude: 35.6896,
        longitude: 139.7006,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.shop.create({
      data: {
        name: "煙草天国 池袋店",
        address: "東京都豊島区池袋2-1-1 スモークタワー1F",
        latitude: 35.7295,
        longitude: 139.7109,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.shop.create({
      data: {
        name: "Oriental Smoke 原宿",
        address: "東京都渋谷区神宮前1-2-3 オリエンタルビル2F",
        latitude: 35.6751,
        longitude: 139.7028,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.shop.create({
      data: {
        name: "シーシャパラダイス 六本木",
        address: "東京都港区六本木6-7-8 パラダイスタワー4F",
        latitude: 35.6627,
        longitude: 139.7279,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ ${shops.length}軒のシーシャショップを作成しました`);

  console.log("🎉 シードデータの投入が完了しました！");
}

main()
  .catch((e) => {
    console.error("❌ シードデータの投入中にエラーが発生しました:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
