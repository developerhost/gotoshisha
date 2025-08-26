# Gotoshisha プロジェクト - Claude Code ガイド

## プロジェクト概要

**Gotoshisha**は、位置情報共有機能を持つ SNS アプリケーションです。React Native + Expo でクロスプラットフォーム対応のフロントエンド、Cloudflare Workers + Hono のサーバーレスバックエンドで構築されています。

- **アプリ名**: Gotoshisha
- **プロジェクトタイプ**: モノレポ構成のフルスタックアプリケーション
- **主要機能**: 位置情報共有、投稿・コメント・いいね機能、Auth0 認証

## 技術スタック

### フロントエンド

- **フレームワーク**: React Native 0.79.2 + Expo 53.0.9
- **言語**: TypeScript 5.1.3
- **ルーティング**: Expo Router 5.0.7
- **マップ**: React Native Maps 1.20.1
- **認証**: Auth0 (react-native-auth0 4.6.0 + expo-auth-session 6.1.5)
- **プラットフォーム**: iOS / Android
- **ディープリンクスキーム**: `gotoshisha://`

### バックエンド

- **フレームワーク**: Hono 4.6.3
- **ランタイム**: Cloudflare Workers
- **データベース**: Cloudflare D1 (SQLite)
- **ORM**: Prisma 5.22.0 with @prisma/adapter-d1
- **バリデーション**: Zod 3.23.8
- **デプロイ**: Wrangler 3.86.1

### 開発・テスト環境

- **パッケージマネージャー**: pnpm
- **テストフレームワーク**: Vitest 3.1.4
- **リンター**: ESLint 9.15.0 + TypeScript ESLint
- **CI/CD**: GitHub Actions

## プロジェクト構造

```
gotoshisha/
├── app/                          # フロントエンド（React Native + Expo）
│   ├── components/               # 再利用可能なコンポーネント
│   │   └── LoginButton.tsx      # Auth0ログインボタン
│   ├── contexts/                 # React Context
│   │   ├── AuthContext.tsx      # ネイティブ認証コンテキスト
│   │   └── AuthContext.web.tsx  # Web認証コンテキスト
│   ├── routes/                   # 画面コンポーネント
│   │   ├── home.tsx             # ホーム画面
│   │   ├── login.tsx            # ログイン画面
│   │   └── map.tsx              # マップ画面
│   ├── config/                   # 設定ファイル
│   │   └── auth0.ts             # Auth0設定
│   └── utils/                    # ユーティリティ
│       └── auth/                 # 認証関連ユーティリティ
│           ├── storage.ts        # クロスプラットフォームストレージ
│           ├── auth0Api.ts       # Auth0 API
│           ├── useAuth0.ts       # Auth0カスタムフック
│           └── *.test.ts         # テストファイル
├── backend/                      # バックエンド（Cloudflare Workers）
│   ├── src/                      # バックエンドソースコード
│   │   ├── index.ts             # メインエントリーポイント
│   │   ├── lib/                 # ライブラリ
│   │   └── types/               # 型定義
│   ├── prisma/                   # データベース
│   │   ├── schema.prisma        # Prismaスキーマ
│   │   └── dev.db               # 開発用SQLiteファイル
│   ├── migrations/               # マイグレーションファイル
│   ├── scripts/                  # ユーティリティスクリプト
│   │   └── seed.ts              # データベースシード
│   └── wrangler.toml            # Cloudflare Workers設定
├── assets/                       # 静的アセット
├── docs/                         # プロジェクトドキュメント
└── src/                          # 共通ユーティリティ
```

## データベース設計

### モデル構成

- **User**: ユーザー情報（email, name, avatar）
- **Post**: 投稿（title, content, 位置情報、画像）
- **Like**: いいね機能
- **Comment**: コメント機能
- **Tag/PostTag**: タグシステム

### 環境別 DB 設定

- **すべての環境**: `gotoshisha-db`

## 開発ワークフロー

### セットアップ

```bash
# 1. 依存関係インストール
pnpm install

# 2. バックエンドセットアップ
cd backend
pnpm install
pnpm db:generate

# 3. 環境変数設定（Auth0設定が必要）
cp .env.example .env
```

### 開発サーバー起動

```bash
# フロントエンド（ルートディレクトリから）
pnpm start              # Expo開発サーバー
pnpm ios               # iOS実行
pnpm android           # Android実行
pnpm start:clear       # キャッシュクリア付き起動

# バックエンド（backendディレクトリから）
cd backend
pnpm dev               # Wrangler開発サーバー（ローカル）
```

### テスト実行

```bash
# フロントエンド
pnpm test              # ウォッチモード
pnpm test:run          # 単発実行
pnpm test:ui           # UI付きテスト

# バックエンド
cd backend
pnpm test:run          # テスト実行
```

### コード品質チェック

```bash
# リンティング
pnpm lint              # ESLint実行
pnpm lint:fix          # 自動修正

# 型チェック
pnpm type-check        # TypeScript型チェック
```

### データベース操作

```bash
cd backend

# Prisma操作
pnpm db:generate       # クライアント生成
pnpm db:push           # スキーマ同期（開発用）
pnpm db:migrate        # マイグレーション（本番用）
pnpm db:studio         # Prisma Studio（GUI）
pnpm db:seed           # シードデータ投入

# Cloudflare D1 操作
wrangler d1 migrations apply gotoshisha-db --local     # ローカルにマイグレーション適用
wrangler d1 migrations apply gotoshisha-db --remote    # リモートにマイグレーション適用
wrangler d1 list                                       # データベース一覧
wrangler d1 info gotoshisha-db                        # データベース情報確認
```

## Cloudflare Workers デプロイメント

### 初回セットアップ

```bash
cd backend

# 1. 自動セットアップスクリプト実行
./scripts/setup-cloudflare.sh

# 2. wrangler.toml にデータベースID を設定（スクリプトで表示される値を使用）

# 3. データベースの準備
pnpm db:generate
wrangler d1 migrations apply gotoshisha-db --local
wrangler d1 migrations apply gotoshisha-db --remote

# 4. デプロイ
pnpm deploy
```

### 日常的なデプロイ

```bash
cd backend

# 本番環境へデプロイ
pnpm run deploy
```

### API エンドポイント

デプロイ後、以下の URL で API が利用可能：

- **本番環境**: `https://shisha-up.shisha-up.workers.dev`

主要エンドポイント：

- `GET /health` - ヘルスチェック
- `GET /api/shops` - 店舗一覧（位置情報検索対応）
- `GET /api/shops/:id` - 店舗詳細
- `POST /api/shops` - 店舗作成（要認証）

詳細は [backend/docs/api-reference.md](backend/docs/api-reference.md) を参照。

## 認証システム

### Auth0 設定

- **プロバイダー**: Auth0
- **プラットフォーム別対応**:
  - ネイティブ: react-native-auth0
  - Web: expo-auth-session + expo-crypto
- **セッション管理**: expo-secure-store（ネイティブ）/ localStorage（Web）

### コールバック URL 設定

Auth0 ダッシュボードの「Allowed Callback URLs」に以下を設定：

```
exp://localhost:8081/--/redirect,
exp://127.0.0.1:8081/--/redirect,
http://localhost:8081/redirect,
http://localhost:19006/redirect,
http://localhost:3000/redirect,
gotoshisha://redirect,
https://auth.expo.io/@dirtyman69/exporeactnativemapsdemo/redirect,
com.dirtyman69.exporeactnativemapsdemo://redirect
```

## テストガイドライン

### フロントエンド

- **ファイル配置**: `app/utils/auth/*.test.ts`
- **テスト対象**: ユーティリティ関数、カスタムフック、純粋関数
- **環境**: jsdom + vitest
- **日本語**: テスト説明とコメントは日本語で記述

### バックエンド

- **ファイル配置**: `backend/src/**/*.test.ts`
- **テスト対象**: API エンドポイント、データベース操作、ビジネスロジック
- **環境**: Node.js + vitest

### テスト実行環境

- **グローバル設定**: vitest.config.ts（両方）
- **セットアップ**: vitest.setup.ts（フロントエンド）
- **モック**: React Native、Expo、Cloudflare Workers

## デプロイメント

### フロントエンド

```bash
# Web
pnpm build

# ネイティブ（要Expo Application Services）
eas build --platform ios
eas build --platform android
```

### バックエンド

```bash
cd backend

# 本番デプロイ
pnpm deploy
```

## 重要な設定ファイル

### フロントエンド

- `app.json`: Expo アプリ設定
- `babel.config.js`: Babel 設定（静的クラスブロック対応）
- `metro.config.js`: Metro bundler 設定（テストファイル除外）
- `tsconfig.json`: TypeScript 設定

### バックエンド

- `wrangler.toml`: Cloudflare Workers 設定
- `prisma/schema.prisma`: データベーススキーマ
- `vitest.config.ts`: テスト設定

## トラブルシューティング

### よくある問題

1. **認証エラー**: Auth0 のコールバック URL 設定を確認
2. **バンドルエラー**: Metro 設定でテストファイルが除外されているか確認
3. **型エラー**: Prisma クライアント生成（`pnpm db:generate`）を実行
4. **D1 エラー**: wrangler.toml の database_id 設定を確認

### デバッグコマンド

```bash
# キャッシュクリア
pnpm start:clear

# 依存関係再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Expo診断
npx expo doctor
```

## CI/CD

GitHub Actions で以下を自動実行：

- TypeScript 型チェック
- ESLint リンティング
- Vitest ユニットテスト
- ビルド検証

実行タイミング：

- `main`/`develop`ブランチへのプッシュ
- `main`/`develop`ブランチへのプルリクエスト

## コントリビューション

1. 機能ブランチを作成
2. コード品質チェックを通す（lint + type-check + test）
3. 日本語でのコメント・テスト記述
4. プルリクエスト作成

## コード生成規約

- **言語**: TypeScript
- 使用ライブラリ: 必ず package.json を見て、使用しているライブラリがあれば独自で実装するのではなく、ライブラリを使用すること。
  - 特に tamagui のコンポーネントを極力使用すること。
- useEffect は極力使用しないこと。代わりに useSyncExternalStore や useRef を使用すること。もしどうしても useEffect を使用する必要がある場合は、必ず依存配列を指定し、使用する理由をコメントアウトで明記すること。
- DRY 原則の遵守: コードの重複を排除
- 実装の一貫性: テストが実際の実装をテストするように改善
- 保守性の向上:

  - 箇所でロジックを管理し、変更時の影響範囲を最小化

- すべてのテスト、リンティング、型チェックが正常に通過していることを確認する。

### コメント

- 各ファイルの冒頭には日本語のコメントで仕様を記述する。

出力例

```ts
/**
 * 2点間のユークリッド距離を計算する
 **/
type Point = { x: number; y: number };
export function distance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
```

### テスト

- 各機能に対しては必ずユニットテストを実装(テストは Vitest を使用。describe/it 構文を使用。describe は日本語で記述)
- コードを追加で修正したとき、`pnpm run test` がパスすることを常に確認する。

```ts
function add(a: number, b: number) {
  return a + b;
}
test("1+2=3", () => {
  expect(add(1, 2)).toBe(3);
});
```

- vitest で実装と同じディレクトリにテスト用のファイルを作成してユニットテストを書く。
- テストコードは必ず別ファイルに記述して
  出力例

```ts
export function distance(a: Point, b: Point): number {...}
if (import.meta.vitest) {
  const {test, expect} = import.meta.vitest;
  test("ユークリッド距離を計算する", () => {
    const result = distance({x: 0, y: 0}, {x: 3, y: 4});
    expect(distance(result)).toBe(5)
  });
}
```

- **コードスタイル**: ESLint + Prettier で統一
- **ドキュメント**: 関数やコンポーネントには JSDoc コメントを必ず追加
- 規約: ハードコードは絶対にしないでください。環境変数や設定ファイルを使用して、柔軟に対応できるようにします。

## 参考リンク

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Hono Documentation](https://hono.dev/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Auth0 Documentation](https://auth0.com/docs/)
