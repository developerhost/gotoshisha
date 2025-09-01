# クイックスタートガイド

## 概要

このガイドに従って、Gotoshisha プロジェクトの Cloudflare Workers バックエンドを最短でセットアップ・デプロイできます。

## 前提条件

- [Cloudflare アカウント](https://dash.cloudflare.com/sign-up)
- Node.js 18+ と pnpm がインストール済み
- Git がインストール済み

## セットアップ手順

### 1. Wrangler CLI のインストール

```bash
npm install -g wrangler@latest
```

### 2. プロジェクトの依存関係をインストール

```bash
cd backend
pnpm install
```

### 3. Cloudflare の自動セットアップ

```bash
# セットアップスクリプトを実行
./scripts/setup-cloudflare.sh
```

このスクリプトが以下を自動実行します：

- Cloudflare ログイン
- D1 データベース作成（本番環境用）
- データベース ID の表示

### 4. wrangler.toml の更新

スクリプトで表示されたデータベース ID を `wrangler.toml` に設定：

```toml
# 本番環境
[[d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = "4ef2320c-4159-4c27-9a38-2c34be72f830"

[[env.production.d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = "4ef2320c-4159-4c27-9a38-2c34be72f830"
```

### 5. データベースの準備

```bash
# Prisma クライアント生成
pnpm db:generate

# ローカルデータベースにマイグレーション適用
wrangler d1 migrations apply gotoshisha-db --local

# リモートデータベースにマイグレーション適用
wrangler d1 migrations apply gotoshisha-db --remote

# シードデータの投入（オプション）
pnpm db:seed
```

### 6. ローカル開発サーバーの起動

```bash
pnpm dev
```

http://localhost:8787 で API が利用可能になります。

### 7. デプロイ

```bash
# 本番環境へデプロイ
pnpm deploy
```

## 動作確認

### ヘルスチェック

```bash
curl https://shisha-up.shisha-up.workers.dev/health
```

### 店舗 API

```bash
# 店舗一覧取得
curl https://shisha-up.shisha-up.workers.dev/api/shops

# テスト用の店舗データ取得
curl https://shisha-up.shisha-up.workers.dev/test/shops
```

## フロントエンドの設定

### 環境変数設定

プロジェクトルートに `.env` ファイルを作成：

```env
# コピーして設定
cp .env.example .env
```

`.env` ファイルを編集：

```env
# API URL を Cloudflare Workers の URL に設定
EXPO_PUBLIC_API_URL=https://shisha-up.shisha-up.workers.dev

# Auth0 設定
EXPO_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
EXPO_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id

# Google Maps API Key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### フロントエンドの起動

```bash
# プロジェクトルートで実行
pnpm install
pnpm start
```

## トラブルシューティング

### よくある問題

#### 1. `wrangler login` でエラー

```bash
# ブラウザでログインできない場合
wrangler login --scopes-list
wrangler login --browser=false
```

#### 2. データベース接続エラー

```bash
# データベース一覧を確認
wrangler d1 list

# データベース情報を確認
wrangler d1 info gotoshisha-db
```

#### 3. デプロイエラー

```bash
# Wrangler を最新版に更新
npm install -g wrangler@latest

# 設定ファイルの検証
wrangler deploy --dry-run
```

#### 4. マイグレーションエラー

```bash
# マイグレーション履歴を確認
wrangler d1 migrations list gotoshisha-db

# 手動でマイグレーションファイルを適用
wrangler d1 execute gotoshisha-db --file=migrations/0001_initial_migration.sql
```

### ログ確認

```bash
# リアルタイムログを表示
wrangler tail

# 特定の環境のログを表示
wrangler tail --env production
```

## 便利なコマンド

```bash
# 開発
pnpm dev                 # ローカル開発サーバー起動
pnpm build              # ビルドチェック（デプロイせず）

# データベース
pnpm db:generate        # Prisma クライアント生成
pnpm db:studio          # Prisma Studio（GUI）起動
pnpm db:seed            # シードデータ投入

# デプロイ
pnpm deploy             # 本番環境

# コード品質
pnpm lint               # ESLint 実行
pnpm type-check         # 型チェック
pnpm test:run           # テスト実行
```

## 参考資料

- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [詳細なデプロイメントガイド](./cloudflare-deployment.md)
- [API リファレンス](./api-reference.md)
- [プロジェクト全体のドキュメント](../../CLAUDE.md)

## 次のステップ

1. [API リファレンス](./api-reference.md) でエンドポイントの詳細を確認
2. フロントエンドから API を呼び出してテスト
3. Auth0 設定を追加して認証機能を有効化
4. 本番環境でのモニタリングとログ設定
5. CI/CD パイプラインの設定（GitHub Actions）

## サポート

問題が発生した場合：

1. [トラブルシューティング](#トラブルシューティング) を確認
2. [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/) を参照
3. GitHub Issues でサポートを求める
