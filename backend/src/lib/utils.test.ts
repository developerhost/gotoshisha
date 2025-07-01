/**
 * utils.tsのテスト
 */

import { describe, expect, it } from "vitest";
import type { ValidationError } from "@/types";
import {
  calculatePagination,
  chunk,
  createErrorResponse,
  createPaginatedResponse,
  createSuccessResponse,
  normalizePaginationParams,
  removeUndefined,
  safeJsonParse,
  slugify,
  unique,
} from "./utils";

describe("utils", () => {
  describe("createSuccessResponse", () => {
    it("データのみでレスポンスを作成できる", () => {
      const data = { id: 1, name: "Test" };
      const result = createSuccessResponse(data);

      expect(result).toEqual({
        success: true,
        data,
        message: undefined,
      });
    });

    it("データとメッセージでレスポンスを作成できる", () => {
      const data = { id: 1, name: "Test" };
      const message = "Success message";
      const result = createSuccessResponse(data, message);

      expect(result).toEqual({
        success: true,
        data,
        message,
      });
    });

    it("nullデータでもレスポンスを作成できる", () => {
      const result = createSuccessResponse(null);

      expect(result).toEqual({
        success: true,
        data: null,
        message: undefined,
      });
    });

    it("配列データでレスポンスを作成できる", () => {
      const data = [1, 2, 3];
      const result = createSuccessResponse(data);

      expect(result).toEqual({
        success: true,
        data,
        message: undefined,
      });
    });
  });

  describe("createErrorResponse", () => {
    it("エラーメッセージのみでレスポンスを作成できる", () => {
      const error = "Something went wrong";
      const result = createErrorResponse(error);

      expect(result).toEqual({
        success: false,
        error,
      });
    });

    it("エラーメッセージと詳細でレスポンスを作成できる", () => {
      const error = "Validation failed";
      const details: ValidationError[] = [
        { field: "email", message: "Invalid email format" },
        { field: "name", message: "Name is required" },
      ];
      const result = createErrorResponse(error, details);

      expect(result).toEqual({
        success: false,
        error,
        details,
      });
    });

    it("空の詳細配列を渡してもdetailsは含まれる", () => {
      const error = "Error message";
      const details: ValidationError[] = [];
      const result = createErrorResponse(error, details);

      expect(result).toEqual({
        success: false,
        error,
        details,
      });
    });
  });

  describe("calculatePagination", () => {
    it("基本的なページネーション情報を計算できる", () => {
      const result = calculatePagination(2, 10, 50);

      expect(result).toEqual({
        page: 2,
        limit: 10,
        total: 50,
        totalPages: 5,
        hasNext: true,
        hasPrev: true,
      });
    });

    it("最初のページを正しく計算できる", () => {
      const result = calculatePagination(1, 10, 50);

      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 50,
        totalPages: 5,
        hasNext: true,
        hasPrev: false,
      });
    });

    it("最後のページを正しく計算できる", () => {
      const result = calculatePagination(5, 10, 50);

      expect(result).toEqual({
        page: 5,
        limit: 10,
        total: 50,
        totalPages: 5,
        hasNext: false,
        hasPrev: true,
      });
    });

    it("1ページのみの場合を正しく計算できる", () => {
      const result = calculatePagination(1, 10, 5);

      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 5,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
    });

    it("アイテムが0個の場合を正しく計算できる", () => {
      const result = calculatePagination(1, 10, 0);

      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      });
    });

    it("端数があるページ数を正しく計算できる", () => {
      const result = calculatePagination(3, 10, 25);

      expect(result).toEqual({
        page: 3,
        limit: 10,
        total: 25,
        totalPages: 3,
        hasNext: false,
        hasPrev: true,
      });
    });
  });

  describe("normalizePaginationParams", () => {
    it("デフォルト値を適用できる", () => {
      const result = normalizePaginationParams({});

      expect(result).toEqual({
        page: 1,
        limit: 10,
        skip: 0,
      });
    });

    it("有効な値をそのまま使用できる", () => {
      const result = normalizePaginationParams({ page: 3, limit: 20 });

      expect(result).toEqual({
        page: 3,
        limit: 20,
        skip: 40,
      });
    });

    it("ページ番号の最小値を1に制限できる", () => {
      const result = normalizePaginationParams({ page: -5, limit: 10 });

      expect(result).toEqual({
        page: 1,
        limit: 10,
        skip: 0,
      });
    });

    it("リミットの最大値を100に制限できる", () => {
      const result = normalizePaginationParams({ page: 1, limit: 200 });

      expect(result).toEqual({
        page: 1,
        limit: 100,
        skip: 0,
      });
    });

    it("リミットの最小値を1に制限できる", () => {
      const result = normalizePaginationParams({ page: 1, limit: -10 });

      expect(result).toEqual({
        page: 1,
        limit: 1,
        skip: 0,
      });
    });

    it("skipを正しく計算できる", () => {
      const result = normalizePaginationParams({ page: 5, limit: 15 });

      expect(result).toEqual({
        page: 5,
        limit: 15,
        skip: 60,
      });
    });

    it("undefinedの値をデフォルトに置き換えできる", () => {
      const result = normalizePaginationParams({
        page: undefined,
        limit: undefined,
      });

      expect(result).toEqual({
        page: 1,
        limit: 10,
        skip: 0,
      });
    });
  });

  describe("createPaginatedResponse", () => {
    it("ページネーション付きレスポンスを作成できる", () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = createPaginatedResponse(data, 2, 10, 30);

      expect(result).toEqual({
        data,
        pagination: {
          page: 2,
          limit: 10,
          total: 30,
          totalPages: 3,
          hasNext: true,
          hasPrev: true,
        },
      });
    });

    it("空の配列でレスポンスを作成できる", () => {
      const data: unknown[] = [];
      const result = createPaginatedResponse(data, 1, 10, 0);

      expect(result).toEqual({
        data,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      });
    });
  });

  describe("slugify", () => {
    it("基本的な文字列をスラッグ化できる", () => {
      const result = slugify("Hello World");
      expect(result).toBe("hello-world");
    });

    it("特殊文字を削除できる", () => {
      const result = slugify("Hello! @World# $Test%");
      expect(result).toBe("hello-world-test");
    });

    it("連続するスペースをハイフンに変換できる", () => {
      const result = slugify("Hello   World    Test");
      expect(result).toBe("hello-world-test");
    });

    it("アンダースコアをハイフンに変換できる", () => {
      const result = slugify("hello_world_test");
      expect(result).toBe("hello-world-test");
    });

    it("既存のハイフンを統合できる", () => {
      const result = slugify("hello--world---test");
      expect(result).toBe("hello-world-test");
    });

    it("先頭と末尾のハイフンを削除できる", () => {
      const result = slugify("-hello world-");
      expect(result).toBe("hello-world");
    });

    it("前後の空白を削除できる", () => {
      const result = slugify("  hello world  ");
      expect(result).toBe("hello-world");
    });

    it("空文字列を処理できる", () => {
      const result = slugify("");
      expect(result).toBe("");
    });

    it("特殊文字のみの文字列を処理できる", () => {
      const result = slugify("!@#$%^&*()");
      expect(result).toBe("");
    });

    it("日本語の文字列を処理できる", () => {
      const result = slugify("こんにちは 世界");
      // 日本語文字は \w に含まれないため、特殊文字として除去される
      expect(result).toBe("");
    });
  });

  describe("safeJsonParse", () => {
    it("有効なJSONを正しくパースできる", () => {
      const jsonString = '{"name": "test", "value": 123}';
      const result = safeJsonParse(jsonString, {});

      expect(result).toEqual({ name: "test", value: 123 });
    });

    it("無効なJSONの場合フォールバック値を返す", () => {
      const invalidJson = '{"name": "test", invalid}';
      const fallback = { default: true };
      const result = safeJsonParse(invalidJson, fallback);

      expect(result).toEqual(fallback);
    });

    it("空文字列の場合フォールバック値を返す", () => {
      const fallback = { empty: true };
      const result = safeJsonParse("", fallback);

      expect(result).toEqual(fallback);
    });

    it("配列のJSONを正しくパースできる", () => {
      const jsonString = '[1, 2, 3, "test"]';
      const result = safeJsonParse(jsonString, []);

      expect(result).toEqual([1, 2, 3, "test"]);
    });

    it("プリミティブ値をパースできる", () => {
      expect(safeJsonParse("123", 0)).toBe(123);
      expect(safeJsonParse("true", false)).toBe(true);
      expect(safeJsonParse('"hello"', "")).toBe("hello");
      expect(safeJsonParse("null", {})).toBe(null);
    });

    it("ネストしたオブジェクトを正しくパースできる", () => {
      const jsonString =
        '{"user": {"name": "test", "settings": {"theme": "dark"}}}';
      const result = safeJsonParse(jsonString, {});

      expect(result).toEqual({
        user: {
          name: "test",
          settings: { theme: "dark" },
        },
      });
    });
  });

  describe("chunk", () => {
    it("配列を指定サイズに分割できる", () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const result = chunk(array, 3);

      expect(result).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it("配列が余った場合も正しく分割できる", () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = chunk(array, 3);

      expect(result).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8],
      ]);
    });

    it("空の配列を処理できる", () => {
      const array: number[] = [];
      const result = chunk(array, 3);

      expect(result).toEqual([]);
    });

    it("サイズが1の場合を処理できる", () => {
      const array = [1, 2, 3];
      const result = chunk(array, 1);

      expect(result).toEqual([[1], [2], [3]]);
    });

    it("配列のサイズより大きなチャンクサイズを処理できる", () => {
      const array = [1, 2, 3];
      const result = chunk(array, 5);

      expect(result).toEqual([[1, 2, 3]]);
    });

    it("文字列の配列も処理できる", () => {
      const array = ["a", "b", "c", "d", "e"];
      const result = chunk(array, 2);

      expect(result).toEqual([["a", "b"], ["c", "d"], ["e"]]);
    });

    it("オブジェクトの配列も処理できる", () => {
      const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const result = chunk(array, 2);

      expect(result).toEqual([
        [{ id: 1 }, { id: 2 }],
        [{ id: 3 }, { id: 4 }],
      ]);
    });
  });

  describe("unique", () => {
    it("重複した数値を除去できる", () => {
      const array = [1, 2, 2, 3, 3, 3, 4];
      const result = unique(array);

      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("重複した文字列を除去できる", () => {
      const array = ["a", "b", "b", "c", "a"];
      const result = unique(array);

      expect(result).toEqual(["a", "b", "c"]);
    });

    it("重複がない配列をそのまま返す", () => {
      const array = [1, 2, 3, 4];
      const result = unique(array);

      expect(result).toEqual([1, 2, 3, 4]);
    });

    it("空の配列を処理できる", () => {
      const array: number[] = [];
      const result = unique(array);

      expect(result).toEqual([]);
    });

    it("すべて同じ値の配列を処理できる", () => {
      const array = [1, 1, 1, 1];
      const result = unique(array);

      expect(result).toEqual([1]);
    });

    it("混合型の配列を処理できる", () => {
      const array = [1, "1", 1, "1", true, true];
      const result = unique(array);

      expect(result).toEqual([1, "1", true]);
    });

    it("undefined とnullを含む配列を処理できる", () => {
      const array = [1, null, undefined, 1, null, undefined];
      const result = unique(array);

      expect(result).toEqual([1, null, undefined]);
    });
  });

  describe("removeUndefined", () => {
    it("undefinedの値を除去できる", () => {
      const obj = {
        a: 1,
        b: undefined,
        c: "test",
        d: undefined,
      };
      const result = removeUndefined(obj);

      expect(result).toEqual({
        a: 1,
        c: "test",
      });
    });

    it("すべてundefinedの場合空オブジェクトを返す", () => {
      const obj = {
        a: undefined,
        b: undefined,
      };
      const result = removeUndefined(obj);

      expect(result).toEqual({});
    });

    it("undefinedがない場合すべてのプロパティを保持する", () => {
      const obj = {
        a: 1,
        b: "test",
        c: null,
        d: false,
        e: 0,
      };
      const result = removeUndefined(obj);

      expect(result).toEqual(obj);
    });

    it("nullやfalse、0は保持される", () => {
      const obj = {
        a: null,
        b: false,
        c: 0,
        d: "",
        e: undefined,
      };
      const result = removeUndefined(obj);

      expect(result).toEqual({
        a: null,
        b: false,
        c: 0,
        d: "",
      });
    });

    it("空のオブジェクトを処理できる", () => {
      const obj = {};
      const result = removeUndefined(obj);

      expect(result).toEqual({});
    });

    it("ネストしたオブジェクトのundefinedは除去されない（浅いコピー）", () => {
      const obj = {
        a: 1,
        b: undefined,
        c: {
          nested: undefined,
          value: "test",
        },
      };
      const result = removeUndefined(obj);

      expect(result).toEqual({
        a: 1,
        c: {
          nested: undefined,
          value: "test",
        },
      });
    });

    it("配列のプロパティも保持される", () => {
      const obj = {
        a: [1, 2, undefined, 3],
        b: undefined,
        c: [],
      };
      const result = removeUndefined(obj);

      expect(result).toEqual({
        a: [1, 2, undefined, 3],
        c: [],
      });
    });
  });
});
