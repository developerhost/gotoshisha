# Gotoshisha Backend

Hono + Cloudflare Workers + Cloudflare D1 + Prisma を使用したバックエンド API

## 技術スタック

- **フレームワーク**: [Hono](https://hono.dev/) - 軽量で高速な Web フレームワーク
- **ランタイム**: [Cloudflare Workers](https://workers.cloudflare.com/) - エッジコンピューティングプラットフォーム
- **データベース**: [Cloudflare D1](https://developers.cloudflare.com/d1/) - SQLite ベースのサーバーレスデータベース
- **ORM**: [Prisma](https://www.prisma.io/) - 型安全なデータベースクライアント
- **バリデーション**: [Zod](https://zod.dev/) - TypeScript ファーストなスキーマバリデーション

## セットアップ

### 1. 依存関係のインストール

```bash
cd backend
pnpm install
```

### 2. Cloudflare Workers CLI の設定

Cloudflare アカウントにログインします：

```bash
pnpm wrangler login
```

### 3. データベースの作成

データベースセットアップスクリプトを実行します：

```bash
chmod +x scripts/setup-db.sh
./scripts/setup-db.sh
```

このスクリプトは以下のデータベースを作成します：

- `gotoshisha-db` (全環境共通)

### 4. wrangler.toml の更新

スクリプト実行後に表示されるデータベース ID を`wrangler.toml`ファイルの該当箇所に設定してください：

```toml
[[d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = "ここにデータベースIDを設定"
```

### 5. Prisma クライアントの生成

```bash
pnpm db:generate
```

### 6. データベーススキーマの適用

```bash
pnpm db:push
```

### 7. シードデータの投入（オプション）

```bash
pnpm db:seed
```

## 開発

### 開発サーバーの起動

```bash
pnpm dev
```

開発サーバーは `http://localhost:8787` で起動します。

### 利用可能なエンドポイント

- `GET /health` - ヘルスチェック
- `GET /api` - API 情報
- `GET /api/users` - ユーザー一覧（実装予定）
- `GET /api/posts` - 投稿一覧（実装予定）
- `GET /api/comments` - コメント一覧（実装予定）
- `GET /api/tags` - タグ一覧（実装予定）
- `GET /api/likes` - いいね一覧（実装予定）

## データベース操作

### マイグレーション

```bash
# 開発環境でのマイグレーション
pnpm db:migrate

# 本番環境でのマイグレーション
pnpm wrangler d1 migrations apply gotoshisha-db --remote
```

### Prisma Studio

```bash
pnpm db:studio
```

### データベースのリセット

```bash
# スキーマを再適用
pnpm db:push --force-reset

# シードデータを再投入
pnpm db:seed
```

## デプロイ

### ステージング環境

```bash
pnpm wrangler deploy --env staging
```

### 本番環境

```bash
pnpm wrangler deploy --env production
```

## プロジェクト構造

```
backend/
├── src/
│   ├── index.ts              # メインアプリケーション
│   ├── types/
│   │   └── index.ts          # 型定義
│   ├── lib/
│   │   ├── db.ts             # データベース接続
│   │   ├── utils.ts          # ユーティリティ関数
│   │   └── validation.ts     # バリデーションスキーマ
│   └── routes/               # APIルート（実装予定）
│       ├── users.ts
│       ├── posts.ts
│       ├── comments.ts
│       ├── tags.ts
│       └── likes.ts
├── prisma/
│   └── schema.prisma         # Prismaスキーマ
├── scripts/
│   ├── setup-db.sh          # データベースセットアップ
│   └── seed.ts              # シードデータ
├── package.json
├── tsconfig.json
├── wrangler.toml             # Cloudflare Workers設定
└── README.md
```

## 環境変数

開発環境では`.env`ファイルを作成してください（`.env.example`を参考）：

```bash
cp .env.example .env
```

## トラブルシューティング

### データベース接続エラー

1. `wrangler.toml`のデータベース ID が正しく設定されているか確認
2. Cloudflare アカウントにログインしているか確認
3. データベースが正しく作成されているか確認

### Prisma クライアントエラー

```bash
# Prismaクライアントを再生成
pnpm db:generate

# node_modulesをクリア
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 型エラー

現在、パッケージのインストール前のため型エラーが表示されていますが、`pnpm install`実行後に解決されます。

## 次のステップ

1. 依存関係をインストール: `pnpm install`
2. データベースをセットアップ: `./scripts/setup-db.sh`
3. 開発サーバーを起動: `pnpm dev`
4. API ルートの実装
5. 認証機能の追加
6. テストの実装

## 参考リンク

- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Zod Documentation](https://zod.dev/)
