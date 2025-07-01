#!/bin/bash

# Cloudflare D1データベース作成スクリプト
# 使用方法: ./scripts/create-d1-database.sh

set -e

echo "🚀 Cloudflare D1データベースを作成します..."

# backendディレクトリに移動
cd "$(dirname "$0")/.."

# D1データベースを作成
echo "📋 データベース 'gotoshisha-db' を作成中..."
npx wrangler d1 create gotoshisha-db

echo "✅ データベースが作成されました！"
echo ""
echo "📝 次の手順:"
echo "1. 上記の出力から database_id をコピーしてください"
echo "2. wrangler.toml の database_id を更新してください"
echo "3. ./scripts/migrate-d1.sh を実行してマイグレーションを適用してください"
echo ""
echo "📖 詳細: https://developers.cloudflare.com/d1/get-started/"
