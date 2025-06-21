#!/bin/bash

# シーシャ店舗用のマイグレーションとシードデータ実行スクリプト

echo "🚀 シーシャ店舗のマイグレーションとシードデータを実行中..."

cd backend

echo "📦 Prismaクライアントを生成中..."
pnpm db:generate

echo "🗄️ データベースマイグレーションを実行中..."
pnpm db:push

echo "🌱 シーシャシードデータを実行中..."
pnpm db:seed-shisha

echo "✅ 完了しました！"
echo "データベースの内容を確認するには: cd backend && pnpm db:studio"