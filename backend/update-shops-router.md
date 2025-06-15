# zod-prisma-types 導入手順

## 1. インストール

```bash
cd backend
pnpm add -D zod-prisma-types
```

## 2. Zod スキーマの生成

```bash
pnpm db:generate
```

これにより、`backend/src/generated/zod`ディレクトリに以下のスキーマが自動生成されます：

- モデルスキーマ（Shop, User, Post など）
- CreateInput スキーマ
- UpdateInput スキーマ
- WhereInput スキーマ
- OrderBy スキーマ
- Include スキーマ

## 3. 使用方法

### 既存のコードを更新する場合

`backend/src/index.ts`で以下のように変更：

```typescript
// 既存のインポートをコメントアウト
// import { shopsRouter } from '@/routes/shops';

// 新しいルーターをインポート
import { shopsRouterV2 } from "@/routes/shops-v2";

// ルーターの登録を更新
app.route("/api/shops", shopsRouterV2);
```

### 新しいバリデーションスキーマの利点

1. **型安全性の向上**: Prisma スキーマと完全に同期
2. **自動生成**: スキーマ変更時に自動で更新
3. **豊富な機能**:
   - WhereInput（複雑な検索条件）
   - OrderByInput（ソート）
   - Include/Select（リレーション制御）
4. **バリデーション**: 自動的に Prisma の制約を反映

### 作成したファイル

- `backend/src/lib/validation/shops-v2.ts`: 拡張されたバリデーションスキーマ
- `backend/src/routes/shops-v2.ts`: zod-prisma-types を使用した新しいルーター

## 4. 旧バージョンとの互換性

既存の API はそのまま動作します。段階的に移行することができます：

1. 新しいエンドポイントから`-v2`版を使用
2. テスト後、既存のコードを置き換え
3. 古いバリデーションファイルを削除

## 5. 今後の開発

新しい API エンドポイントを作成する際は、生成されたスキーマを使用：

```typescript
import { UserCreateInputSchema, PostWhereInputSchema } from "@/generated/zod";

// 自動的に型安全なバリデーション
const validatedData = UserCreateInputSchema.parse(requestBody);
```
