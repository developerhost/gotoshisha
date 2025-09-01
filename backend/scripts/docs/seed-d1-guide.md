# D1 データベースへのシードデータ投入ガイド

## 概要

このガイドでは、Cloudflare D1 データベースにシードデータを投入する方法を説明します。
シードスクリプト（`scripts/seed.ts`）は、ローカル SQLite と Cloudflare D1 の両方に対応しており、環境を自動判定して適切なデータベースに接続します。

## 🔄 改善履歴（2025年9月）

### 問題と解決策
- **問題**: PrismaのD1アダプターでupsert操作時に既存データが正しく更新されない
- **原因**: upsertのupdate部分が空の場合、既存データがそのまま残る仕様
- **解決**: D1環境では`deleteMany` → `create`戦略を採用し、確実にデータを更新

## シード構造

```
backend/scripts/
├── seed.ts                    # メインシードファイル（環境自動判定）
└── seed/
    ├── users.ts              # ユーザーデータ
    ├── tags.ts               # タグデータ
    ├── posts.ts              # 投稿データ
    ├── likes.ts              # いいねデータ
    ├── comments.ts           # コメントデータ
    ├── shisha-masters.ts     # シーシャマスターデータ（フレーバー、雰囲気等）
    └── shops.ts              # シーシャショップデータ
```

## 前提条件

1. Node.js と pnpm がインストール済み
2. Wrangler CLI がプロジェクトにインストール済み（`pnpm install`で自動インストール）
3. `backend/wrangler.toml` に D1 データベースが設定済み
4. Prisma クライアントが生成済み（`pnpm db:generate`）

## Wrangler コマンドの実行方法

Wrangler はローカルにインストールされているため、以下の方法で実行できます：

### 方法 1: pnpm スクリプト経由（推奨）

```bash
# ローカルD1へマイグレーション適用
pnpm db:migrate:d1:local

# リモートD1へマイグレーション適用
pnpm db:migrate:d1:remote
```

### 方法 2: npx 経由

```bash
# ローカルD1へマイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --local

# リモートD1へマイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --remote
```

### 方法 3: グローバルインストール（オプション）

```bash
# Wranglerをグローバルにインストール
npm install -g wrangler

# その後は直接実行可能
wrangler d1 migrations apply gotoshisha-db --local
```

## シード投入方法

### 1. ローカル SQLite へのシード投入（デフォルト）

開発時のデフォルト動作です。

```bash
cd backend

# Prismaクライアント生成
pnpm db:generate

# ローカルDBにシード投入
pnpm db:seed
```

出力例：

```
💻 ローカルデータベースを使用します
🌱 データベースにシードデータを投入中...
✅ 3人のユーザーを作成しました
✅ 5個のタグを作成しました
✅ 5件の投稿を作成しました
✅ 5軒のシーシャショップを更新/作成しました
🎉 全てのシードデータの投入が完了しました！
```

### 2. D1 ローカル環境へのシード投入

Wrangler のローカル開発環境にある D1 データベースへシードを投入します。

#### 方法 1: pnpm スクリプト使用（推奨）

```bash
cd backend

# ステップ1: マイグレーション適用
pnpm db:migrate:d1:local

# ステップ2: 開発サーバー起動（別ターミナル）
pnpm dev

# ステップ3: D1環境でシード実行（メインターミナル）
USE_D1=true pnpm db:seed
```

#### 方法 2: npx 使用

```bash
cd backend

# ステップ1: マイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --local

# ステップ2: 開発サーバー起動（別ターミナル）
npx wrangler dev

# ステップ3: D1環境でシード実行（メインターミナル）
USE_D1=true pnpm db:seed
```

### 3. D1 リモート（本番）環境へのシード投入

⚠️ **注意**: 本番環境へのシード投入は慎重に行ってください。

#### pnpm スクリプト使用

```bash
cd backend

# ステップ1: 本番環境にマイグレーション適用
pnpm db:migrate:d1:remote

# ステップ2: 本番環境にシード投入
USE_D1=true pnpm db:seed
```

#### npx 使用

```bash
cd backend

# ステップ1: 本番環境にマイグレーション適用
npx wrangler d1 migrations apply gotoshisha-db --remote

# ステップ2: 本番環境にシード投入
USE_D1=true pnpm db:seed
```

### 4. 特定環境への強制実行

環境変数を使用して、特定の環境を明示的に指定できます。

```bash
# ローカルSQLiteを強制
USE_D1=false pnpm db:seed

# D1を強制（Wrangler環境が必要）
USE_D1=true pnpm db:seed
```

## データ確認方法

### ローカル SQLite の確認

```bash
# Prisma Studioで確認
pnpm db:studio
```

### D1 ローカルの確認

```bash
# ユーザー数を確認
npx wrangler d1 execute gotoshisha-db --local --command="SELECT COUNT(*) as count FROM users;"

# ショップ数を確認
npx wrangler d1 execute gotoshisha-db --local --command="SELECT COUNT(*) as count FROM shops;"

# 特定テーブルの内容を確認
npx wrangler d1 execute gotoshisha-db --local --command="SELECT * FROM shops LIMIT 5;"
```

### D1 リモートの確認

```bash
# ユーザー数を確認
npx wrangler d1 execute gotoshisha-db --remote --command="SELECT COUNT(*) as count FROM users;"

# ショップ数を確認
npx wrangler d1 execute gotoshisha-db --remote --command="SELECT COUNT(*) as count FROM shops;"
```

## トラブルシューティング

### エラー: "zsh: command not found: wrangler"

**原因**: Wrangler がグローバルにインストールされていない

**解決策**:

1. **推奨**: pnpm スクリプトを使用

   ```bash
   pnpm db:migrate:d1:local
   ```

2. **代替**: npx 経由で実行

   ```bash
   npx wrangler d1 migrations apply gotoshisha-db --local
   ```

3. **グローバルインストール**:
   ```bash
   npm install -g wrangler
   ```

### エラー: "D1 データベース環境が検出されません"

**原因**: D1 環境変数が設定されていないか、Wrangler 環境外で実行している

**解決策**:

1. `wrangler.toml` にデータベース設定があるか確認
2. `pnpm dev` または `npx wrangler dev` 環境で実行しているか確認
3. 環境変数 `USE_D1=true` が設定されているか確認

### エラー: "no such table: users"

**原因**: マイグレーションが適用されていない

**解決策**:

```bash
# ローカルD1にマイグレーション適用
pnpm db:migrate:d1:local
# または
npx wrangler d1 migrations apply gotoshisha-db --local

# リモートD1にマイグレーション適用
pnpm db:migrate:d1:remote
# または
npx wrangler d1 migrations apply gotoshisha-db --remote
```

### エラー: "adapter is not defined"

**原因**: Prisma D1 アダプターが正しくインストールされていない

**解決策**:

```bash
pnpm install @prisma/adapter-d1
pnpm db:generate
```

### エラー: "UNIQUE constraint failed"

**原因**: 既にデータが存在する状態で再度シードを実行

**解決策**:
シードスクリプトは`upsert`を使用しているため、基本的には問題ありませんが、
完全にリセットしたい場合は以下を実行：

```bash
# データベースをクリーンな状態にリセット
npx wrangler d1 execute gotoshisha-db --local --command="DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS shops;"

# マイグレーション再適用
pnpm db:migrate:d1:local

# シード再実行
USE_D1=true pnpm db:seed
```

## クイックスタートガイド

初回セットアップから実行までの最短手順：

```bash
cd backend

# 1. 依存関係インストール・セットアップ
pnpm install
pnpm db:generate

# 2. D1ローカル環境準備
pnpm db:migrate:d1:local

# 3. シードデータ投入
USE_D1=true pnpm db:seed

# 4. データ確認
npx wrangler d1 execute gotoshisha-db --local --command="SELECT COUNT(*) FROM users;"
```

## 利用可能な pnpm スクリプト

package.json に定義されている D1 関連のスクリプト：

```bash
# シード関連
pnpm db:seed                    # 環境自動判定でシード実行
USE_D1=true pnpm db:seed        # D1強制でシード実行

# マイグレーション関連
pnpm db:migrate:d1:local        # ローカルD1へマイグレーション適用
pnpm db:migrate:d1:remote       # リモートD1へマイグレーション適用

# 開発サーバー
pnpm dev                        # Wrangler開発サーバー起動

# その他
pnpm db:generate                # Prismaクライアント生成
pnpm db:studio                  # Prisma Studio起動
```

## シードデータの内容

投入されるデータの概要：

- **ユーザー**: 3 人（Alice, Bob, Charlie）
- **タグ**: 5 個（観光地、グルメ、自然、アート、ショッピング）
- **投稿**: 5 件（各ユーザーからの観光地投稿）
- **いいね**: 6 件（ユーザー間のいいね）
- **コメント**: 4 件（投稿へのコメント）
- **フレーバー**: 25 種類（アップル、グレープ、ミント等）
- **雰囲気**: 14 種類（味重視、映え重視、まったり等）
- **ホビー**: 14 種類（ジェンガ、ダーツ、ボードゲーム等）
- **支払い方法**: 20 種類（現金、クレジットカード、電子マネー等）
- **イベント**: 8 種類（DJ ナイト、レディースデー等）
- **シーシャショップ**: 5 軒（渋谷、新宿、池袋、原宿、六本木）

## ベストプラクティス

1. **pnpm スクリプト優先**: `pnpm db:migrate:d1:local` など定義済みスクリプトを使用
2. **開発環境での確認**: 本番環境にシードを投入する前に、必ずローカル環境でテストする
3. **バックアップ**: 本番環境のデータをバックアップしてからシードを実行
4. **段階的実行**: 大量のデータを投入する場合は、段階的に実行して確認
5. **ログの確認**: シード実行時のログを確認し、エラーがないことを確認
6. **データ検証**: シード後にデータが正しく投入されたか確認

## 関連ドキュメント

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Prisma with D1](https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## 更新履歴

- 2025-09-01: D1データ更新問題の修正
  - shops.tsに環境判定ロジック追加
  - D1環境では`deleteMany` → `create`戦略を採用
  - seed-d1-direct.tsを削除し、seed.tsに統合
- 2024-08-29: 初版作成
  - シード構造をテーブル別に分割
  - ローカル・D1 両環境対応の統一スクリプト化
  - pnpm スクリプトと npx 実行方法を追加
  - wrangler command not found エラーの解決策を追加
