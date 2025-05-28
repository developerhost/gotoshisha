#!/bin/bash

# Cloudflare D1データベースのセットアップスクリプト

set -e

echo "🚀 Cloudflare D1データベースのセットアップを開始します..."

# 開発環境用データベースの作成
echo "📦 開発環境用データベースを作成中..."
wrangler d1 create gotoshisha-db

echo "✅ 開発環境用データベースが作成されました"
echo "📝 wrangler.tomlファイルのdatabase_idを更新してください"

# ステージング環境用データベースの作成
echo "📦 ステージング環境用データベースを作成中..."
wrangler d1 create gotoshisha-db-staging

echo "✅ ステージング環境用データベースが作成されました"

# 本番環境用データベースの作成
echo "📦 本番環境用データベースを作成中..."
wrangler d1 create gotoshisha-db-prod

echo "✅ 本番環境用データベースが作成されました"

echo ""
echo "🎉 データベースのセットアップが完了しました！"
echo ""
echo "次のステップ:"
echo "1. wrangler.tomlファイルのdatabase_idを上記の出力から取得して更新してください"
echo "2. yarn db:generate を実行してPrismaクライアントを生成してください"
echo "3. yarn db:push を実行してスキーマをデータベースに適用してください"
echo "4. yarn dev を実行して開発サーバーを起動してください"
