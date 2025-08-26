# Cloudflare D1 データベースセットアップガイド

## 概要

このプロジェクトでは Cloudflare D1 を使用してデータベースを管理しています。

## データベース情報

- **データベース名**: gotoshisha-db
- **データベース ID**: .env に設定
- **バインディング名**: DB

## セットアップ済み内容

### 1. 環境設定

#### .env ファイル

```env
# Cloudflare D1
DATABASE_ID=".envに設定"
```

#### wrangler.toml

```toml
[[d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = ".envに設定"
```

### 2. データベーススキーマ

以下のテーブルが作成されています：

- **users**: ユーザー情報
- **posts**: 投稿情報（位置情報含む）
- **likes**: いいね情報
- **comments**: コメント情報
- **tags**: タグ情報
- **post_tags**: 投稿とタグの関連テーブル

### 3. マイグレーション

#### 初期マイグレーション実行済み

- ローカル環境: ✅ 完了
- リモート環境: ✅ 完了

## 使用方法

### マイグレーション実行

```bash
# ローカル環境
./scripts/migrate-d1.sh

# リモート環境のみ
npx wrangler d1 execute gotoshisha-db --file=migrations/0001_initial.sql --remote
```

### データベース操作

```bash
# テーブル一覧確認（ローカル）
npx wrangler d1 execute gotoshisha-db --command="SELECT name FROM sqlite_master WHERE type='table';"

# テーブル一覧確認（リモート）
npx wrangler d1 execute gotoshisha-db --command="SELECT name FROM sqlite_master WHERE type='table';" --remote

# 任意のSQLクエリ実行
npx wrangler d1 execute gotoshisha-db --command="SELECT * FROM users LIMIT 5;" --remote
```

### アプリケーションでの使用

```typescript
import { createPrismaClient } from "@/lib/db";

// Cloudflare Workers環境で使用
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const prisma = createPrismaClient(env);

    // データベース操作
    const users = await prisma.user.findMany();

    return Response.json({ users });
  },
};
```

## 注意事項

1. **環境の違い**

   - ローカル開発: `.wrangler/state/v3/d1` に保存
   - リモート: Cloudflare のエッジネットワーク上

2. **マイグレーション**

   - 新しいマイグレーションファイルは `migrations/` ディレクトリに配置
   - ファイル名は連番で管理（例: `0002_add_new_table.sql`）

3. **バックアップ**
   - 重要なデータ変更前は必ずバックアップを取得
   - `npx wrangler d1 export` コマンドを使用

## トラブルシューティング

### よくある問題

1. **マイグレーション失敗**

   ```bash
   # データベースの状態確認
   npx wrangler d1 execute gotoshisha-db --command="PRAGMA table_info(users);" --remote
   ```

2. **接続エラー**

   - wrangler.toml の database_id が正しいか確認
   - .env ファイルの DATABASE_ID が設定されているか確認

3. **権限エラー**
   - Cloudflare アカウントにログインしているか確認
   - `npx wrangler auth login`

## 参考リンク

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Prisma D1 Adapter](https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
