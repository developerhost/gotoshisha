# Cloudflare Workers デプロイメントガイド

## 概要

このドキュメントでは、Gotoshisha プロジェクトの Cloudflare Workers バックエンドをデプロイし、D1 データベースをセットアップする方法を説明します。

## 前提条件

- [Cloudflare アカウント](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) がインストール済み
- Node.js と pnpm がインストール済み

## セットアップ手順

### 1. Wrangler CLI の認証

```bash
# Cloudflare アカウントにログイン
npx wrangler login
```

### 2. D1 データベースの作成

```bash
# backend ディレクトリに移動
cd backend

# 開発用データベース作成
npx wrangler d1 create gotoshisha-db


# データベースは既に作成済みのgotoshisha-dbを使用
# npx wrangler d1 create gotoshisha-db
```

**重要**: コマンド実行後、出力される `database_id` をメモしてください。

### 3. wrangler.toml の設定

`wrangler.toml` ファイルを更新し、データベース ID を設定します：

```toml
# 開発環境
[[d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = "your-dev-database-id-here"

# 本番環境
[[env.production.d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = "your-prod-database-id-here"

# ステージング環境
[[env.staging.d1_databases]]
binding = "DB"
database_name = "gotoshisha-db-staging"
database_id = "your-staging-database-id-here"
```

### 4. データベーススキーマの適用

```bash
# Prisma クライアント生成
pnpm db:generate

# 開発用データベースにマイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --local

# リモート開発データベースにマイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --remote

# 本番データベースにマイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --env production --remote

# シードデータの投入（開発環境）
pnpm db:seed
```

### 5. 環境変数の設定

Cloudflare Dashboard で環境変数を設定するか、`wrangler secret` コマンドを使用：

```bash
# 本番環境の秘密情報を設定
npx wrangler secret put DATABASE_URL --env production
```

### 6. デプロイ実行

```bash
# 開発環境へのデプロイ
pnpm deploy

# ステージング環境へのデプロイ
pnpm deploy --env staging

# 本番環境へのデプロイ
pnpm deploy --env production
```

## パッケージスクリプト

`backend/package.json` に定義されている便利なスクリプト：

```bash
# ローカル開発サーバー起動
pnpm dev

# デプロイ（開発環境）
pnpm deploy

# 本番デプロイ
pnpm deploy:prod

# ステージングデプロイ
pnpm deploy:staging

# データベース操作
pnpm db:generate     # Prisma クライアント生成
pnpm db:push         # スキーマ同期（開発用）
pnpm db:migrate      # マイグレーション作成
pnpm db:studio       # Prisma Studio 起動
pnpm db:seed         # シードデータ投入

# テスト
pnpm test:run        # テスト実行
pnpm test:coverage   # カバレッジ付きテスト

# コード品質
pnpm lint            # ESLint 実行
pnpm lint:fix        # ESLint 自動修正
pnpm type-check      # TypeScript 型チェック
```

## API エンドポイント

デプロイ後、以下の API エンドポイントが利用可能になります：

### ベース URL

- **開発**: `https://your-worker-name.your-subdomain.workers.dev`
- **ステージング**: `https://your-worker-name-staging.your-subdomain.workers.dev`
- **本番**: `https://your-worker-name-prod.your-subdomain.workers.dev`

### エンドポイント一覧

#### ヘルスチェック

- **GET** `/health` - サービス稼働状況確認

#### 店舗 API

- **GET** `/api/shops` - 店舗一覧取得

  - クエリパラメータ:
    - `page`: ページ番号（デフォルト: 1）
    - `limit`: 取得件数（デフォルト: 20, 最大: 100）
    - `search`: キーワード検索
    - `latitude`, `longitude`, `radius`: 位置情報検索
    - `budgetMin`, `budgetMax`: 予算範囲フィルター
    - `wifi`, `powerOutlet`, `privateBooking`: 設備フィルター
    - `reservation`: 予約可否フィルター
    - `smokingPolicy`: 喫煙ポリシーフィルター
    - `sortBy`: ソート項目（デフォルト: createdAt）
    - `sortOrder`: ソート順（asc/desc、デフォルト: desc）

- **GET** `/api/shops/:id` - 店舗詳細取得
- **POST** `/api/shops` - 店舗作成（要認証）
- **PUT** `/api/shops/:id` - 店舗更新（要認証）
- **DELETE** `/api/shops/:id` - 店舗削除（要認証）
- **POST** `/api/shops/:id/relations` - 店舗関連要素追加（要認証）
- **DELETE** `/api/shops/:id/relations` - 店舗関連要素削除（要認証）

#### プロフィール API

- **GET** `/api/profile` - プロフィール取得（要認証）
- **PUT** `/api/profile` - プロフィール更新（要認証）

### レスポンス形式

成功時:

```json
{
  "success": true,
  "data": {
    // レスポンスデータ
  },
  "pagination": {
    // ページネーション情報（リスト取得時のみ）
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

エラー時:

```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

## 位置情報検索の使用例

店舗の位置情報検索の例：

```bash
# 東京駅周辺 5km 以内の店舗を検索
curl "https://your-worker.workers.dev/api/shops?latitude=35.681236&longitude=139.767125&radius=5"

# 新宿駅周辺 3km 以内で Wi-Fi ありの店舗を検索
curl "https://your-worker.workers.dev/api/shops?latitude=35.689487&longitude=139.691711&radius=3&wifi=true"
```

## 環境別設定

### 開発環境

- ローカル D1 データベースを使用
- 詳細なログ出力
- CORS 設定でローカル開発サーバーを許可

### ステージング環境

- リモート D1 データベース（staging）を使用
- 本番に近い設定でテスト可能
- 限定的な CORS 設定

### 本番環境

- リモート D1 データベース（production）を使用
- 最適化されたログレベル
- セキュアな CORS 設定
- レート制限やセキュリティ機能を有効化

## トラブルシューティング

### よくある問題と解決方法

#### 1. データベース接続エラー

```bash
# データベース ID が正しく設定されているか確認
npx wrangler d1 list

# マイグレーションが適用されているか確認
npx wrangler d1 info gotoshisha-db
```

#### 2. デプロイエラー

```bash
# Wrangler の最新版を使用
npm install -g wrangler@latest

# 認証情報を再確認
npx wrangler whoami
npx wrangler auth list
```

#### 3. API レスポンスエラー

```bash
# ログを確認
npx wrangler tail

# ヘルスチェックでサービス状態を確認
curl https://your-worker.workers.dev/health
```

#### 4. CORS エラー

- フロントエンドの URL が `wrangler.toml` の CORS 設定に含まれているか確認
- 本番環境では適切な Origin を設定

## セキュリティ考慮事項

1. **認証**: JWT トークンによる認証を実装
2. **認可**: ユーザー権限に基づいたアクセス制御
3. **レート制限**: 過度なリクエストを防ぐ
4. **データ検証**: Zod による入力値検証
5. **CORS**: 適切な Origin 設定
6. **ログ**: 機密情報をログに出力しない

## パフォーマンス最適化

1. **データベースインデックス**: 検索対象フィールドにインデックスを設定
2. **ページネーション**: 大量データの取得時にページネーションを使用
3. **キャッシュ**: Cloudflare KV や Cache API の活用（必要に応じて）
4. **圧縮**: レスポンスの gzip 圧縮

## 監視とメトリクス

1. **Cloudflare Analytics**: リクエスト数、エラー率の監視
2. **Workers Analytics**: CPU 使用率、実行時間の監視
3. **D1 Analytics**: データベースクエリのパフォーマンス監視
4. **カスタムログ**: アプリケーション固有のメトリクス

## バックアップとリストア

### データベースバックアップ

```bash
# D1 データベースのバックアップ（SQLite形式でエクスポート）
npx wrangler d1 backup create gotoshisha-db --env production
```

### バックアップからのリストア

```bash
# バックアップファイルをリストア
npx wrangler d1 backup restore gotoshisha-db [backup-id] --env production
```

## 参考リンク

- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 ドキュメント](https://developers.cloudflare.com/d1/)
- [Wrangler CLI ドキュメント](https://developers.cloudflare.com/workers/wrangler/)
- [Hono フレームワーク](https://hono.dev/)
- [Prisma ドキュメント](https://www.prisma.io/docs/)
