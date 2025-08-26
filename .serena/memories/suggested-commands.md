# 開発で使用する主要コマンド

## フロントエンド開発
```bash
# 開発サーバー起動
pnpm start              # Expo開発サーバー
pnpm ios               # iOS実行
pnpm android           # Android実行
pnpm start:clear       # キャッシュクリア付き起動

# ビルド
pnpm build             # Web用ビルド
eas build --platform ios      # iOS用ビルド
eas build --platform android  # Android用ビルド
```

## バックエンド開発
```bash
cd backend
pnpm dev               # Wrangler開発サーバー（ローカル）
pnpm deploy            # 開発環境へデプロイ
pnpm deploy:staging    # ステージング環境へデプロイ
pnpm deploy:prod       # 本番環境へデプロイ
```

## テスト・品質チェック
```bash
# テスト
pnpm test              # ウォッチモード
pnpm test:run          # 単発実行
pnpm test:ui           # UI付きテスト

# コード品質
pnpm lint              # ESLint実行
pnpm lint:fix          # 自動修正
pnpm type-check        # TypeScript型チェック
```

## データベース操作
```bash
cd backend
pnpm db:generate       # Prismaクライアント生成
pnpm db:push           # スキーマ同期（開発用）
pnpm db:migrate        # マイグレーション（本番用）
pnpm db:studio         # Prisma Studio（GUI）
pnpm db:seed           # シードデータ投入
```

## 基本コマンド（Darwin）
```bash
ls                     # ファイル一覧
find                   # ファイル検索
grep                   # テキスト検索
cd                     # ディレクトリ移動
git                    # バージョン管理
```