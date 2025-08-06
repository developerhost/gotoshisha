# D1 データベースセットアップマニュアル

## 概要

このドキュメントでは、Cloudflare D1 データベースのセットアップとシードデータの投入方法について説明します。

## 前提条件

- Node.js (v18 以上)
- pnpm
- Cloudflare アカウント
- wrangler CLI

## セットアップ手順

### 1. Cloudflare へのログイン

```bash
npx wrangler login
```

### 2. D1 データベースの作成

```bash
npx wrangler d1 create gotoshisha-db
```

### 3. データベース ID の設定

作成後、返される Database ID を `wrangler.toml` に設定します：

```toml
[[d1_databases]]
binding = "DB"
database_name = "gotoshisha-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 4. データベーススキーマの適用

#### A. 基本テーブルの作成

```bash
# usersテーブル（既存の場合はスキップ）
npx wrangler d1 execute gotoshisha-db --command "
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);" --remote
```

```bash
# bioカラムの追加
npx wrangler d1 execute gotoshisha-db --command "
ALTER TABLE users ADD COLUMN bio TEXT;" --remote
```

#### B. shops テーブルの作成

```bash
# 基本的なshopsテーブル
npx wrangler d1 execute gotoshisha-db --command "
CREATE TABLE IF NOT EXISTS shops (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);" --remote
```

#### C. shops テーブルの拡張カラム追加

```bash
npx wrangler d1 execute gotoshisha-db --command "
ALTER TABLE shops ADD COLUMN nearestStation TEXT;
ALTER TABLE shops ADD COLUMN stationWalkTime INTEGER;
ALTER TABLE shops ADD COLUMN openingHours TEXT;
ALTER TABLE shops ADD COLUMN holidays TEXT;
ALTER TABLE shops ADD COLUMN budgetMin INTEGER;
ALTER TABLE shops ADD COLUMN budgetMax INTEGER;
ALTER TABLE shops ADD COLUMN seatingCount INTEGER;
ALTER TABLE shops ADD COLUMN seatingTypes TEXT;
ALTER TABLE shops ADD COLUMN reservation TEXT;
ALTER TABLE shops ADD COLUMN privateBooking INTEGER DEFAULT 0;
ALTER TABLE shops ADD COLUMN wifi INTEGER DEFAULT 0;
ALTER TABLE shops ADD COLUMN powerOutlet INTEGER DEFAULT 0;
ALTER TABLE shops ADD COLUMN smokingPolicy TEXT;
ALTER TABLE shops ADD COLUMN parkingInfo TEXT;
ALTER TABLE shops ADD COLUMN timeLimit TEXT;
ALTER TABLE shops ADD COLUMN hookahBrand TEXT;
ALTER TABLE shops ADD COLUMN flavorCount INTEGER;
ALTER TABLE shops ADD COLUMN photos TEXT;
ALTER TABLE shops ADD COLUMN websiteUrl TEXT;
ALTER TABLE shops ADD COLUMN googleMapUrl TEXT;
ALTER TABLE shops ADD COLUMN snsLinks TEXT;
" --remote
```

## シードデータの投入

### 手動でのシードデータ投入

#### 1. ユーザーデータの投入

```bash
# ユーザー1
npx wrangler d1 execute gotoshisha-db --command "
INSERT INTO users (id, email, name, avatar, createdAt, updatedAt)
VALUES ('clzabcd001', 'alice@example.com', 'Alice Johnson', 'https://example.com/avatars/alice.jpg', datetime('now'), datetime('now'));
" --remote

# ユーザー2
npx wrangler d1 execute gotoshisha-db --command "
INSERT INTO users (id, email, name, avatar, createdAt, updatedAt)
VALUES ('clzabcd002', 'bob@example.com', 'Bob Smith', 'https://example.com/avatars/bob.jpg', datetime('now'), datetime('now'));
" --remote
```

#### 2. シーシャショップデータの投入

```bash
# ショップ1
npx wrangler d1 execute gotoshisha-db --command "
INSERT INTO shops (id, name, address, latitude, longitude, createdAt, updatedAt)
VALUES ('shop001', 'シーシャカフェ 渋谷店', '東京都渋谷区渋谷1-2-3 シーシャビル2F', 35.6598, 139.7006, datetime('now'), datetime('now'));
" --remote

# ショップ2と3を同時に投入
npx wrangler d1 execute gotoshisha-db --command "
INSERT INTO shops (id, name, address, latitude, longitude, createdAt, updatedAt)
VALUES
  ('shop002', 'Hookah Lounge 新宿', '東京都新宿区新宿3-4-5 フーカビル3F', 35.6896, 139.7006, datetime('now'), datetime('now')),
  ('shop003', '煙草天国 池袋店', '東京都豊島区池袋2-1-1 スモークタワー1F', 35.7295, 139.7109, datetime('now'), datetime('now'));
" --remote
```

### データの確認

```bash
# ユーザーデータの確認
npx wrangler d1 execute gotoshisha-db --command "SELECT * FROM users;" --remote

# ショップデータの確認
npx wrangler d1 execute gotoshisha-db --command "SELECT * FROM shops;" --remote

# テーブル一覧の確認
npx wrangler d1 execute gotoshisha-db --command "SELECT name FROM sqlite_master WHERE type='table';" --remote
```

## トラブルシューティング

### よくあるエラー

1. **認証エラー**

   ```text
   Authentication error [code: 10000]
   ```

   解決方法: `npx wrangler login` で再ログイン

2. **カラムが存在しない**

   ```text
   no such column: main.shops.nearestStation
   ```

   解決方法: 上記の拡張カラム追加コマンドを実行

3. **重複エラー**
   ```text
   UNIQUE constraint failed
   ```
   解決方法: 既存データを削除するか、異なる ID を使用

### データベースのリセット

```bash
# 全データ削除（注意：本番環境では実行しないこと）
npx wrangler d1 execute gotoshisha-db --command "DELETE FROM shops;" --remote
npx wrangler d1 execute gotoshisha-db --command "DELETE FROM users;" --remote
```

## 本番環境での注意事項

- 本番環境用のデータベース ID は別途設定する
- 環境変数を使用してデータベース接続を管理する
- 定期的なバックアップを検討する
- シードデータは本番環境に適したものを用意する
