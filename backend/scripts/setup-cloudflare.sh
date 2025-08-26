#!/bin/bash

# Cloudflare Workers セットアップスクリプト
# このスクリプトは初回セットアップ時に実行してください

set -e

echo "🚀 Cloudflare Workers セットアップを開始します..."

# スクリプトのディレクトリとプロジェクトルートを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# 現在のディレクトリを確認
if [[ ! -f "$PROJECT_ROOT/wrangler.toml" ]]; then
    echo "❌ エラー: wrangler.toml が見つかりません ($PROJECT_ROOT/wrangler.toml)"
    exit 1
fi

# Wrangler がインストールされているかチェック
if ! command -v wrangler &> /dev/null; then
    echo "❌ エラー: Wrangler CLI がインストールされていません"
    echo "以下のコマンドでインストールしてください:"
    echo "npm install -g wrangler"
    exit 1
fi

# Wrangler にログインしているかチェック
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Cloudflare にログインしています..."
    wrangler login
else
    echo "✅ Cloudflare にログイン済みです"
fi

echo ""
echo "📊 D1 データベースを作成しています..."

# 開発用データベース作成
echo "開発用データベースを作成中..."
DEV_DB_OUTPUT=$(wrangler d1 create gotoshisha-db 2>&1 || true)
if echo "$DEV_DB_OUTPUT" | grep -qE "(database_id|DB ID:)"; then
    # 新しい形式 "DB ID: uuid" をまず試す
    DEV_DB_ID=$(echo "$DEV_DB_OUTPUT" | grep -oE "DB ID:[[:space:]]*[a-f0-9-]+" | sed 's/DB ID:[[:space:]]*//')
    # 古い形式 "database_id = \"uuid\"" も試す
    if [[ -z "$DEV_DB_ID" ]]; then
        DEV_DB_ID=$(echo "$DEV_DB_OUTPUT" | grep -o 'database_id = "[^"]*"' | sed 's/database_id = "\(.*\)"/\1/')
    fi
    if [[ -n "$DEV_DB_ID" ]]; then
        echo "✅ 開発用データベース作成完了: $DEV_DB_ID"
    else
        echo "⚠️  データベースIDの抽出に失敗しました"
        echo "$DEV_DB_OUTPUT"
    fi
else
    echo "⚠️  開発用データベースは既に存在するか、作成に失敗しました"
    echo "$DEV_DB_OUTPUT"
fi

# ステージング用データベース作成
echo "ステージング用データベースを作成中..."
STAGING_DB_OUTPUT=$(wrangler d1 create gotoshisha-db-staging 2>&1 || true)
if echo "$STAGING_DB_OUTPUT" | grep -qE "(database_id|DB ID:)"; then
    # 新しい形式 "DB ID: uuid" をまず試す
    STAGING_DB_ID=$(echo "$STAGING_DB_OUTPUT" | grep -oE "DB ID:[[:space:]]*[a-f0-9-]+" | sed 's/DB ID:[[:space:]]*//')
    # 古い形式 "database_id = \"uuid\"" も試す
    if [[ -z "$STAGING_DB_ID" ]]; then
        STAGING_DB_ID=$(echo "$STAGING_DB_OUTPUT" | grep -o 'database_id = "[^"]*"' | sed 's/database_id = "\(.*\)"/\1/')
    fi
    if [[ -n "$STAGING_DB_ID" ]]; then
        echo "✅ ステージング用データベース作成完了: $STAGING_DB_ID"
    else
        echo "⚠️  データベースIDの抽出に失敗しました"
        echo "$STAGING_DB_OUTPUT"
    fi
else
    echo "⚠️  ステージング用データベースは既に存在するか、作成に失敗しました"
    echo "$STAGING_DB_OUTPUT"
fi

# データベース作成（全環境共通）
echo "データベースを作成中..."
DB_OUTPUT=$(wrangler d1 create gotoshisha-db 2>&1 || true)
if echo "$DB_OUTPUT" | grep -qE "(database_id|DB ID:)"; then
    # 新しい形式 "DB ID: uuid" をまず試す
    DB_ID=$(echo "$DB_OUTPUT" | grep -oE "DB ID:[[:space:]]*[a-f0-9-]+" | sed 's/DB ID:[[:space:]]*//')
    # 古い形式 "database_id = \"uuid\"" も試す
    if [[ -z "$DB_ID" ]]; then
        DB_ID=$(echo "$DB_OUTPUT" | grep -o 'database_id = "[^"]*"' | sed 's/database_id = "\(.*\)"/\1/')
    fi
    if [[ -n "$DB_ID" ]]; then
        echo "✅ データベース作成完了: $DB_ID"
    else
        echo "⚠️  データベースIDの抽出に失敗しました"
        echo "$DB_OUTPUT"
    fi
else
    echo "⚠️  データベースは既に存在するか、作成に失敗しました"
    echo "$DB_OUTPUT"
fi

echo ""
echo "📝 wrangler.toml を更新する必要があります"
echo ""
echo "以下の情報を wrangler.toml ファイルに追加してください:"
echo ""
if [[ -n "$DB_ID" ]]; then
    echo "全環境共通設定:"
    echo "database_id = \"$DB_ID\""
    echo ""
    echo "本番環境:"
    echo "[[env.production.d1_databases]]"
    echo "binding = \"DB\""
    echo "database_name = \"gotoshisha-db\""
    echo "database_id = \"$DB_ID\""
    echo ""
    echo "ステージング環境:"
    echo "[[env.staging.d1_databases]]"
    echo "binding = \"DB\""
    echo "database_name = \"gotoshisha-db\""
    echo "database_id = \"$DB_ID\""
    echo ""
fi

echo "🔧 次に実行すべきステップ:"
echo "1. wrangler.toml ファイルを上記の情報で更新"
echo "2. pnpm db:generate でPrismaクライアントを生成"
echo "3. マイグレーションをデータベースに適用:"
echo "   - ローカル: wrangler d1 migrations apply gotoshisha-db --local"
echo "   - リモート: wrangler d1 migrations apply gotoshisha-db --remote"
echo "   - 本番: wrangler d1 migrations apply gotoshisha-db --env production --remote"
echo "4. pnpm deploy でデプロイ"
echo ""
echo "✨ セットアップスクリプト完了!"