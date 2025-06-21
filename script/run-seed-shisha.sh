#!/bin/bash

# シーシャシードデータ実行スクリプト

echo "🚀 シーシャシードデータを実行中..."

cd backend

echo "🌱 シードデータを投入中..."
pnpm db:seed-shisha

echo "✅ 完了しました！"