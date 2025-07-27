# 開発サーバーテストガイド

## 概要

このドキュメントでは、Gotoshisha バックエンドの開発サーバーを起動し、動作確認を行う方法について説明します。

## 前提条件

- Node.js 18 以上がインストールされていること
- pnpm がインストールされていること
- Cloudflare D1 データベースがセットアップされていること

## セットアップ手順

### 1. 依存関係のインストール

```bash
cd backend
pnpm install
```

### 2. 環境変数の設定

`.env`ファイルに以下の設定が必要です：

```env
# Prisma
DATABASE_URL="file:./dev.db"

# Cloudflare D1
DATABASE_ID="your-database-id"

# 開発環境用の設定
ENVIRONMENT=development
```

### 3. Prisma クライアントの生成

```bash
pnpm db:generate
```

このコマンドで以下が生成されます：

- Prisma クライアント（`node_modules/.prisma/client`）
- Zod 型定義（`src/generated/zod`）

### 4. データベースのマイグレーション

初回セットアップまたはスキーマ変更時：

```bash
# ローカルD1データベースにマイグレーション適用
./scripts/migrate-d1.sh
```

## 開発サーバーの起動

```bash
pnpm run dev
```

正常に起動すると以下のメッセージが表示されます：

```
⛅️ wrangler 4.26.0
───────────────────
Your Worker has access to the following bindings:
Binding                              Resource                  Mode
env.DB (gotoshisha-db)               D1 Database               local
env.ENVIRONMENT ("development")      Environment Variable      local

⎔ Starting local server...
[wrangler:info] Ready on http://localhost:8787
```

## API エンドポイントのテスト

### 1. ヘルスチェック

```bash
curl http://localhost:8787/health
```

期待されるレスポンス：

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. ユーザー一覧取得

```bash
curl http://localhost:8787/api/users
```

### 3. 投稿一覧取得

```bash
curl http://localhost:8787/api/posts
```

### 4. ユーザー作成（POST）

```bash
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "avatar": "https://example.com/avatar.png"
  }'
```

### 5. 投稿作成（POST）

```bash
curl -X POST http://localhost:8787/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-here",
    "title": "テスト投稿",
    "content": "これはテスト投稿です",
    "latitude": 35.6762,
    "longitude": 139.6503
  }'
```

## 開発ツール

### 1. HTTPie（推奨）

よりシンプルな API テスト：

```bash
# インストール
brew install httpie

# GETリクエスト
http :8787/api/users

# POSTリクエスト
http POST :8787/api/users email=test@example.com name="Test User"
```

### 2. Postman/Insomnia

GUI ベースの API テストツール。以下の設定でコレクションを作成：

- Base URL: `http://localhost:8787`
- Environment: Development
- Headers:
  - `Content-Type: application/json`

### 3. VS Code REST Client

`.http`ファイルを作成して API テスト：

```http
### Get all users
GET http://localhost:8787/api/users

### Create user
POST http://localhost:8787/api/users
Content-Type: application/json

{
  "email": "test@example.com",
  "name": "Test User"
}
```

## デバッグ方法

### 1. コンソールログ

開発サーバーのターミナルにログが出力されます：

```typescript
console.log("Debug info:", data);
```

### 2. Wrangler Dev Tools

ブラウザで開発者ツールを使用：

1. `pnpm run dev`実行中に`d`キーを押す
2. ブラウザの開発者ツールが開く
3. Network、Console、Sources タブでデバッグ

### 3. エラーハンドリング

カスタムエラーレスポンスの確認：

```bash
# 存在しないユーザー
curl http://localhost:8787/api/users/non-existent-id

# バリデーションエラー
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{"invalid": "data"}'
```

## トラブルシューティング

### 1. Prisma クライアントエラー

```
Could not resolve ".prisma/client/default"
```

**解決方法**：

```bash
pnpm db:generate
```

### 2. D1 データベース接続エラー

```
Database connection failed
```

**解決方法**：

- `wrangler.toml`の`database_id`を確認
- `.env`の`DATABASE_ID`を確認
- `npx wrangler d1 list`でデータベースの存在を確認

### 3. ポート競合

```
Port 8787 is already in use
```

**解決方法**：

```bash
# 別のポートで起動
pnpm run dev -- --port 8788
```

### 4. キャッシュ問題

**解決方法**：

```bash
# Wranglerキャッシュクリア
rm -rf .wrangler
pnpm run dev
```

## パフォーマンステスト

### 1. 負荷テスト（Apache Bench）

```bash
# 100リクエスト、同時接続10
ab -n 100 -c 10 http://localhost:8787/api/users
```

### 2. レスポンスタイム計測

```bash
# curlでタイミング情報表示
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:8787/api/users
```

`curl-format.txt`:

```
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
      time_redirect:  %{time_redirect}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
```

## データベース確認

### 1. Prisma Studio

GUI でデータベースを確認：

```bash
pnpm db:studio
```

ブラウザで`http://localhost:5555`にアクセス

### 2. D1 コマンド

```bash
# テーブル一覧
npx wrangler d1 execute gotoshisha-db --command="SELECT name FROM sqlite_master WHERE type='table';"

# ユーザー数確認
npx wrangler d1 execute gotoshisha-db --command="SELECT COUNT(*) FROM User;"

# 最新の投稿5件
npx wrangler d1 execute gotoshisha-db --command="SELECT * FROM Post ORDER BY createdAt DESC LIMIT 5;"
```

## 継続的な開発

### 1. ファイル変更の自動検知

開発サーバーは自動的にファイル変更を検知して再起動します。

### 2. テストデータのシード

```bash
pnpm db:seed
```

### 3. ログレベルの設定

環境変数で制御：

```env
LOG_LEVEL=debug  # debug, info, warn, error
```

## 次のステップ

1. [API ドキュメント](./api-documentation.md)を参照
2. [認証実装ガイド](./auth-implementation.md)を確認
3. [本番デプロイガイド](./production-deployment.md)に従ってデプロイ

## 参考リンク

- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Documentation](https://hono.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)
