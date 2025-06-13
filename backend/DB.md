🛠️ マイグレーション実行手順

以下のコマンドを順番に実行してください：

# 1. backend ディレクトリに移動

cd backend

# 2. Prisma クライアントを生成

pnpm db:generate

# 3. データベースにスキーマを適用

pnpm db:push

# 4. シーシャシードデータを投入

pnpm db:seed-shisha

# 5. データベースの内容を確認（オプション）

pnpm db:studio

# 6. マイグレーションの実行

pnpm db:migrate

# 7. マイグレーションの確認

pnpm db:check

# 8. マイグレーションの適用

pnpm db:apply

# 9. シードデータの挿入までのスクリプト

./run-seed-shisha.sh
