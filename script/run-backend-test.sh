#!/bin/bash

echo "🚀 バックエンドテストを実行中..."

cd backend

echo "📦 Prismaクライアントとzod-prisma-typesを生成中..."
pnpm db:generate

echo "🧪 テストを実行中..."
pnpm test:run

echo "✅ 完了しました！"