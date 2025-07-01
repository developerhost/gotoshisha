#!/bin/bash

# Cloudflare D1マイグレーション実行スクリプト
# 使用方法: ./scripts/migrate-d1.sh

set -e

echo "🚀 Cloudflare D1マイグレーションを開始します..."

# backendディレクトリに移動
cd "$(dirname "$0")/.."

# 環境変数の確認
if [ ! -f ".env" ]; then
    echo "❌ .envファイルが見つかりません"
    exit 1
fi

# DATABASE_IDの確認
source .env
if [ -z "$DATABASE_ID" ]; then
    echo "❌ DATABASE_IDが設定されていません"
    exit 1
fi

echo "📋 データベースID: $DATABASE_ID"

# マイグレーションファイルの存在確認
if [ ! -f "migrations/0001_initial.sql" ]; then
    echo "❌ マイグレーションファイルが見つかりません: migrations/0001_initial.sql"
    exit 1
fi

echo "📝 マイグレーションファイルを実行中..."

# Cloudflare D1にマイグレーションを実行
echo "🔄 初期マイグレーション (0001_initial.sql) を実行中..."
npx wrangler d1 execute gotoshisha-db --file=migrations/0001_initial.sql

echo "🔄 bioフィールド追加マイグレーション (0002_add_user_bio.sql) を実行中..."
npx wrangler d1 execute gotoshisha-db --file=migrations/0002_add_user_bio.sql

echo "✅ マイグレーションが完了しました！"

# テーブル一覧を表示
echo "📊 作成されたテーブル一覧:"
npx wrangler d1 execute gotoshisha-db --command="SELECT name FROM sqlite_master WHERE type='table';"

echo "🎉 Cloudflare D1のセットアップが完了しました！"
