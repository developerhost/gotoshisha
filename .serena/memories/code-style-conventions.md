# コードスタイル・規約

## 言語・基本規約

- TypeScript 必須
- 日本語コメント（仕様説明）
- JSDoc コメント必須

## React/React Native 規約

- useEffect は極力使用禁止
  - 代わりに useSyncExternalStore、useRef を使用
  - 使用する場合は依存配列必須 + 理由をコメント
- Tamagui コンポーネントを極力使用
- package.json のライブラリを優先使用

## ファイル構成

- 各ファイル冒頭に日本語コメントで仕様記述
- vitest で実装と同じファイルにユニットテスト

## テスト

- Vitest 使用
- describe/it 構文、describe は日本語
- 全機能にユニットテスト必須
- コード修正時は`pnpm run test`が通ることを確認

## DRY 原則・保守性

- コード重複排除
- 実装の一貫性
- 変更影響範囲の最小化
- ハードコード禁止（環境変数・設定ファイル使用）

## コード品質チェック

- ESLint + Prettier
- TypeScript 型チェック必須
- lint + type-check + test が通ることを確認

## 例

```ts
/**
 * 2点間のユークリッド距離を計算する
 **/
type Point = { x: number; y: number };
export function distance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;
  test("ユークリッド距離を計算する", () => {
    const result = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
    expect(result).toBe(5);
  });
}
```
