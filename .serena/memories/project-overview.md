# Gotoshisha プロジェクト概要

## プロジェクトの目的
**Gotoshisha**は、位置情報共有機能を持つSNSアプリケーション。お店の発見、情報共有、ソーシャル機能を提供する。

## 技術スタック
### フロントエンド
- React Native 0.79.4 + Expo 53.0.12
- TypeScript 5.1.3
- Expo Router 5.1.0（ルーティング）
- React Native Maps 1.20.1（マップ機能）
- Tamagui 1.126.14（UIライブラリ）
- Auth0（認証）
- React Query（状態管理）

### バックエンド
- Cloudflare Workers + Hono
- Cloudflare D1 (SQLite)
- Prisma ORM

### 開発環境
- パッケージマネージャー: pnpm
- テスト: Vitest 3.1.4
- リンター: ESLint 9.15.0
- TypeScript設定

## プロジェクト構造
- `app/` - フロントエンド（React Native + Expo）
- `backend/` - バックエンド（Cloudflare Workers）
- モノレポ構成

## データベース
- User, Post, Like, Comment, Tag/PostTag モデル
- 位置情報データの保存