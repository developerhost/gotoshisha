#!/bin/bash

# Cloudflare D1ローカル開発用マイグレーションスクリプト
# 使用方法: ./scripts/migrate-d1-local.sh

set -e

echo "🚀 ローカルD1データベースのマイグレーションを開始します..."

# backendディレクトリに移動
cd "$(dirname "$0")/.."

echo "📝 ローカルマイグレーションファイルを実行中..."

# ローカルD1にマイグレーションを実行
echo "🔄 初期マイグレーション (0001_initial.sql) を実行中..."
npx wrangler d1 execute gotoshisha-db --local --file=migrations/0001_initial.sql

echo "🔄 bioフィールド追加マイグレーション (0002_add_user_bio.sql) を実行中..."
npx wrangler d1 execute gotoshisha-db --local --file=migrations/0002_add_user_bio.sql

echo "✅ ローカルマイグレーションが完了しました！"

# テーブル一覧を表示
echo "📊 作成されたテーブル一覧:"
npx wrangler d1 execute gotoshisha-db --local --command="SELECT name FROM sqlite_master WHERE type='table';"

echo "🎉 ローカルD1のセットアップが完了しました！"
