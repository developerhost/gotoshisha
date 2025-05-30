# Gotoshisha - React Native マップアプリケーション

このプロジェクトは、Expo と React Native Maps を使用した React Native アプリケーションで、Hono + Cloudflare Workers で構築されたバックエンド API を持っています。

## プロジェクト構成

- **フロントエンド**: React Native + Expo + TypeScript
- **バックエンド**: Hono + Cloudflare Workers + D1 Database + Prisma
- **テスト**: フロントエンドとバックエンドの両方で Vitest を使用
- **リンティング**: TypeScript サポート付き ESLint
- **CI/CD**: 自動テストとリンティングのための GitHub Actions

## 開発環境のセットアップ

### 前提条件

- Node.js 20+
- Yarn パッケージマネージャー
- Expo CLI

### フロントエンドのセットアップ

1. 依存関係をインストール:
   ```bash
   yarn install
   ```

2. 開発サーバーを起動:
   ```bash
   yarn start
   # または iOS の場合
   yarn ios
   # または Android の場合
   yarn android
   ```

3. トンネルモード（テスト推奨）:
   ```bash
   yarn start:clear
   ```

### バックエンドのセットアップ

1. バックエンドディレクトリに移動:
   ```bash
   cd backend
   ```

2. 依存関係をインストール:
   ```bash
   yarn install
   ```

3. 環境変数を設定:
   ```bash
   cp .env.example .env
   ```

4. Prisma クライアントを生成:
   ```bash
   yarn db:generate
   ```

5. 開発サーバーを起動:
   ```bash
   yarn dev
   ```

## 利用可能なスクリプト

### フロントエンドスクリプト

- `yarn start` - Expo 開発サーバーを起動
- `yarn ios` - iOS シミュレーターを起動
- `yarn android` - Android エミュレーターを起動
- `yarn web` - Web 開発サーバーを起動
- `yarn lint` - ESLint を実行
- `yarn lint:fix` - ESLint の問題を自動修正
- `yarn test` - ウォッチモードでテストを実行
- `yarn test:run` - テストを一度実行
- `yarn type-check` - TypeScript 型チェックを実行

### バックエンドスクリプト

- `yarn dev` - Wrangler で開発サーバーを起動
- `yarn build` - プロダクション用にビルド
- `yarn deploy` - Cloudflare Workers にデプロイ
- `yarn lint` - ESLint を実行
- `yarn test:run` - テストを実行
- `yarn db:generate` - Prisma クライアントを生成
- `yarn db:push` - スキーマ変更をデータベースにプッシュ

## CI/CD

このプロジェクトは継続的インテグレーションのために GitHub Actions を使用しています。CI パイプラインには以下が含まれます：

### フロントエンド CI
- TypeScript 型チェック
- ESLint リンティング
- Vitest ユニットテスト

### バックエンド CI
- Prisma クライアント生成
- TypeScript 型チェック
- ESLint リンティング
- Vitest ユニットテスト

### ビルドチェック
- バックエンドビルド検証
- Expo Web エクスポート検証

CI は以下の場合に実行されます：
- `main` および `develop` ブランチへのプッシュ
- `main` および `develop` ブランチへのプルリクエスト

## テスト

### テストの実行

```bash
# フロントエンドテスト
yarn test:run

# バックエンドテスト
cd backend && yarn test:run

# 全テスト（ルートから）
yarn test:run
```

### テスト構造

- フロントエンドテストは `src/` ディレクトリ内のソースファイルと同じ場所に配置
- バックエンドテストは `backend/src/` ディレクトリ内に配置
- テストファイルは `*.test.ts` パターンに従う
- テストはプロジェクトガイドラインに従って日本語の説明で Vitest を使用

## コード品質

### リンティング

```bash
# フロントエンドリンティング
yarn lint

# バックエンドリンティング
cd backend && yarn lint

# リンティング問題の修正
yarn lint:fix
```

### 型チェック

```bash
# フロントエンド型チェック
yarn type-check

# バックエンド型チェック
cd backend && yarn type-check
```

### 期待される結果

![期待される結果](./docs/expected.png)

### 実際の結果

App.tsx でスタートアップ時に expo-asset を使用してアセットをキャッシュすることで、アセットバンドリングの結果をシミュレートしています。

![実際の結果](./docs/actual.png)
