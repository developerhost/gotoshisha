/**
 * validation.tsのテスト
 */

import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  commentSchemas,
  commonSchemas,
  formatValidationErrors,
  likeSchemas,
  postSchemas,
  tagSchemas,
  userSchemas,
  validatePathParams,
  validateQueryParams,
  validateRequestBody,
} from "./validation";

describe("validation", () => {
  describe("commonSchemas", () => {
    describe("id", () => {
      it("有効なCUIDを受け入れる", () => {
        const validCuid = "cl9ebqhxk00008eqf00000000";
        expect(() => commonSchemas.id.parse(validCuid)).not.toThrow();
      });

      it("無効なIDを拒否する", () => {
        expect(() => commonSchemas.id.parse("invalid-id")).toThrow();
        expect(() => commonSchemas.id.parse("")).toThrow();
        expect(() => commonSchemas.id.parse(123)).toThrow();
      });
    });

    describe("email", () => {
      it("有効なメールアドレスを受け入れる", () => {
        const validEmails = [
          "test@example.com",
          "user.name@domain.co.jp",
          "user+tag@example.org",
        ];

        validEmails.forEach((email) => {
          expect(() => commonSchemas.email.parse(email)).not.toThrow();
        });
      });

      it("無効なメールアドレスを拒否する", () => {
        const invalidEmails = [
          "invalid-email",
          "@example.com",
          "test@",
          "test..test@example.com",
          "",
        ];

        invalidEmails.forEach((email) => {
          expect(() => commonSchemas.email.parse(email)).toThrow();
        });
      });
    });

    describe("url", () => {
      it("有効なURLを受け入れる", () => {
        const validUrls = [
          "https://example.com",
          "http://localhost:3000",
          "https://sub.domain.com/path?query=value",
        ];

        validUrls.forEach((url) => {
          expect(() => commonSchemas.url.parse(url)).not.toThrow();
        });
      });

      it("undefinedを受け入れる（optional）", () => {
        expect(() => commonSchemas.url.parse(undefined)).not.toThrow();
      });

      it("無効なURLを拒否する", () => {
        const invalidUrls = [
          "not-a-url",
          "://example.com", // プロトコルなし
          "http://", // ホストなし
          "example.com", // プロトコルなし
        ];

        invalidUrls.forEach((url) => {
          expect(() => commonSchemas.url.parse(url)).toThrow();
        });
      });

      it("空文字列を拒否する", () => {
        // 空文字列は無効なURLとして扱われる
        expect(() => commonSchemas.url.parse("")).toThrow();
      });
    });

    describe("latitude", () => {
      it("有効な緯度を受け入れる", () => {
        const validLatitudes = [-90, -45.5, 0, 45.5, 90];

        validLatitudes.forEach((lat) => {
          expect(() => commonSchemas.latitude.parse(lat)).not.toThrow();
        });
      });

      it("無効な緯度を拒否する", () => {
        const invalidLatitudes = [-91, 91, "45.5", null];

        invalidLatitudes.forEach((lat) => {
          expect(() => commonSchemas.latitude.parse(lat)).toThrow();
        });
      });
    });

    describe("longitude", () => {
      it("有効な経度を受け入れる", () => {
        const validLongitudes = [-180, -90.5, 0, 90.5, 180];

        validLongitudes.forEach((lng) => {
          expect(() => commonSchemas.longitude.parse(lng)).not.toThrow();
        });
      });

      it("無効な経度を拒否する", () => {
        const invalidLongitudes = [-181, 181, "90.5", null];

        invalidLongitudes.forEach((lng) => {
          expect(() => commonSchemas.longitude.parse(lng)).toThrow();
        });
      });
    });

    describe("pagination", () => {
      it("有効なページネーションパラメータを受け入れる", () => {
        const validPagination = { page: 1, limit: 10 };
        const result = commonSchemas.pagination.parse(validPagination);

        expect(result).toEqual(validPagination);
      });

      it("デフォルト値を適用する", () => {
        const result = commonSchemas.pagination.parse({});

        expect(result).toEqual({ page: 1, limit: 10 });
      });

      it("無効なページネーションパラメータを拒否する", () => {
        expect(() => commonSchemas.pagination.parse({ page: 0 })).toThrow();
        expect(() => commonSchemas.pagination.parse({ page: -1 })).toThrow();
        expect(() => commonSchemas.pagination.parse({ limit: 0 })).toThrow();
        expect(() => commonSchemas.pagination.parse({ limit: 101 })).toThrow();
      });
    });
  });

  describe("userSchemas", () => {
    describe("create", () => {
      it("有効なユーザー作成データを受け入れる", () => {
        const validData = {
          email: "test@example.com",
          name: "Test User",
          avatar: "https://example.com/avatar.jpg",
        };

        expect(() => userSchemas.create.parse(validData)).not.toThrow();
      });

      it("必須フィールドのメールアドレスのみでも受け入れる", () => {
        const minimalData = { email: "test@example.com" };

        expect(() => userSchemas.create.parse(minimalData)).not.toThrow();
      });

      it("無効なデータを拒否する", () => {
        expect(() => userSchemas.create.parse({})).toThrow(); // email必須
        expect(() => userSchemas.create.parse({ email: "invalid" })).toThrow();
        expect(() =>
          userSchemas.create.parse({
            email: "test@example.com",
            name: "a".repeat(101),
          })
        ).toThrow();
      });
    });

    describe("update", () => {
      it("有効な更新データを受け入れる", () => {
        const validData = {
          name: "Updated Name",
          avatar: "https://example.com/new-avatar.jpg",
        };

        expect(() => userSchemas.update.parse(validData)).not.toThrow();
      });

      it("空のオブジェクトを受け入れる", () => {
        expect(() => userSchemas.update.parse({})).not.toThrow();
      });
    });

    describe("params", () => {
      it("有効なIDパラメータを受け入れる", () => {
        const validParams = { id: "cl9ebqhxk00008eqf00000000" };

        expect(() => userSchemas.params.parse(validParams)).not.toThrow();
      });
    });
  });

  describe("postSchemas", () => {
    describe("create", () => {
      it("有効な投稿作成データを受け入れる", () => {
        const validData = {
          title: "Test Post",
          content: "This is a test post content",
          imageUrl: "https://example.com/image.jpg",
          latitude: 35.6762,
          longitude: 139.6503,
          address: "Tokyo, Japan",
          isPublic: true,
          tagIds: ["cl9ebqhxk00008eqf00000000"],
        };

        expect(() => postSchemas.create.parse(validData)).not.toThrow();
      });

      it("必須フィールドのタイトルのみでも受け入れる", () => {
        const minimalData = { title: "Test Post" };

        expect(() => postSchemas.create.parse(minimalData)).not.toThrow();
      });

      it("無効なデータを拒否する", () => {
        expect(() => postSchemas.create.parse({})).toThrow(); // title必須
        expect(() => postSchemas.create.parse({ title: "" })).toThrow();
        expect(() =>
          postSchemas.create.parse({
            title: "a".repeat(201),
          })
        ).toThrow();
        expect(() =>
          postSchemas.create.parse({
            title: "Test",
            content: "a".repeat(5001),
          })
        ).toThrow();
      });
    });

    describe("query", () => {
      it("有効なクエリパラメータを受け入れる", () => {
        const validQuery = {
          authorId: "cl9ebqhxk00008eqf00000000",
          isPublic: true,
          tagIds: ["cl9ebqhxk00008eqf00000000"],
          search: "test",
          latitude: 35.6762,
          longitude: 139.6503,
          radius: 10.5,
          page: 2,
          limit: 20,
        };

        expect(() => postSchemas.query.parse(validQuery)).not.toThrow();
      });

      it("デフォルト値を適用する", () => {
        const result = postSchemas.query.parse({});

        expect(result.page).toBe(1);
        expect(result.limit).toBe(10);
      });

      it("無効なクエリパラメータを拒否する", () => {
        expect(() =>
          postSchemas.query.parse({
            radius: 0, // 最小値0.1
          })
        ).toThrow();
        expect(() =>
          postSchemas.query.parse({
            radius: 101, // 最大値100
          })
        ).toThrow();
      });
    });
  });

  describe("commentSchemas", () => {
    describe("create", () => {
      it("有効なコメント作成データを受け入れる", () => {
        const validData = {
          content: "This is a test comment",
          postId: "cl9ebqhxk00008eqf00000000",
        };

        expect(() => commentSchemas.create.parse(validData)).not.toThrow();
      });

      it("無効なデータを拒否する", () => {
        expect(() => commentSchemas.create.parse({})).toThrow();
        expect(() =>
          commentSchemas.create.parse({
            content: "",
            postId: "cl9ebqhxk00008eqf00000000",
          })
        ).toThrow();
        expect(() =>
          commentSchemas.create.parse({
            content: "a".repeat(1001),
            postId: "cl9ebqhxk00008eqf00000000",
          })
        ).toThrow();
      });
    });
  });

  describe("tagSchemas", () => {
    describe("create", () => {
      it("有効なタグ作成データを受け入れる", () => {
        const validData = {
          name: "Test Tag",
          color: "#FF0000",
        };

        expect(() => tagSchemas.create.parse(validData)).not.toThrow();
      });

      it("名前のみでも受け入れる", () => {
        const minimalData = { name: "Test Tag" };

        expect(() => tagSchemas.create.parse(minimalData)).not.toThrow();
      });

      it("無効なカラーコードを拒否する", () => {
        expect(() =>
          tagSchemas.create.parse({
            name: "Test",
            color: "red",
          })
        ).toThrow();
        expect(() =>
          tagSchemas.create.parse({
            name: "Test",
            color: "#FF",
          })
        ).toThrow();
        expect(() =>
          tagSchemas.create.parse({
            name: "Test",
            color: "#GGGGGG",
          })
        ).toThrow();
      });

      it("有効なカラーコードを受け入れる", () => {
        const validColors = ["#FF0000", "#00ff00", "#0000FF", "#AbCdEf"];

        validColors.forEach((color) => {
          expect(() =>
            tagSchemas.create.parse({
              name: "Test",
              color,
            })
          ).not.toThrow();
        });
      });
    });
  });

  describe("likeSchemas", () => {
    describe("create", () => {
      it("有効ないいね作成データを受け入れる", () => {
        const validData = { postId: "cl9ebqhxk00008eqf00000000" };

        expect(() => likeSchemas.create.parse(validData)).not.toThrow();
      });
    });
  });

  describe("formatValidationErrors", () => {
    it("Zodエラーを適切にフォーマットする", () => {
      const schema = z.object({
        email: z.string().email(),
        name: z.string().min(1),
        nested: z.object({
          value: z.number(),
        }),
      });

      try {
        schema.parse({
          email: "invalid-email",
          name: "",
          nested: { value: "not-a-number" },
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formatted = formatValidationErrors(error);

          expect(formatted).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                field: expect.any(String),
                message: expect.any(String),
              }),
            ])
          );

          // フィールドパスが正しく結合されているかチェック
          const nestedError = formatted.find(
            (err) => err.field === "nested.value"
          );
          expect(nestedError).toBeDefined();
        }
      }
    });

    it("空のエラー配列を処理できる", () => {
      const error = new z.ZodError([]);
      const result = formatValidationErrors(error);

      expect(result).toEqual([]);
    });
  });

  describe("validateRequestBody", () => {
    it("有効なJSONボディを正しく検証する", async () => {
      const schema = z.object({ name: z.string() });
      const validBody = JSON.stringify({ name: "test" });

      const mockRequest = new Request("http://example.com", {
        method: "POST",
        body: validBody,
        headers: { "Content-Type": "application/json" },
      });

      const result = await validateRequestBody(mockRequest, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ name: "test" });
      }
    });

    it("無効なJSONボディでエラーを返す", async () => {
      const schema = z.object({ name: z.string() });
      const invalidBody = "invalid json";

      const mockRequest = new Request("http://example.com", {
        method: "POST",
        body: invalidBody,
        headers: { "Content-Type": "application/json" },
      });

      const result = await validateRequestBody(mockRequest, schema);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual([
          { field: "body", message: "無効なJSONです" },
        ]);
      }
    });

    it("スキーマ検証エラーを適切に処理する", async () => {
      const schema = z.object({ name: z.string().min(1) });
      const invalidData = JSON.stringify({ name: "" });

      const mockRequest = new Request("http://example.com", {
        method: "POST",
        body: invalidData,
        headers: { "Content-Type": "application/json" },
      });

      const result = await validateRequestBody(mockRequest, schema);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              field: "name",
              message: expect.any(String),
            }),
          ])
        );
      }
    });
  });

  describe("validateQueryParams", () => {
    it("有効なクエリパラメータを正しく検証する", () => {
      const schema = z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        active: z.boolean().default(true),
      });

      const url = new URL("http://example.com?page=2&limit=20&active=false");
      const result = validateQueryParams(url, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          page: 2,
          limit: 20,
          active: false,
        });
      }
    });

    it("配列パラメータを正しく処理する", () => {
      const schema = z.object({
        tags: z.array(z.string()),
      });

      const url = new URL("http://example.com?tags=tag1,tag2,tag3");
      const result = validateQueryParams(url, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.tags).toEqual(["tag1", "tag2", "tag3"]);
      }
    });

    it("数値変換を正しく行う", () => {
      const schema = z.object({
        count: z.number(),
        price: z.number(),
      });

      const url = new URL("http://example.com?count=5&price=19.99");
      const result = validateQueryParams(url, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          count: 5,
          price: 19.99,
        });
      }
    });

    it("ブール値変換を正しく行う", () => {
      const schema = z.object({
        active: z.boolean(),
        enabled: z.boolean(),
      });

      const url = new URL("http://example.com?active=true&enabled=false");
      const result = validateQueryParams(url, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          active: true,
          enabled: false,
        });
      }
    });

    it("文字列パラメータを正しく処理する", () => {
      const schema = z.object({
        name: z.string(),
        category: z.string(),
      });

      const url = new URL("http://example.com?name=test&category=tech");
      const result = validateQueryParams(url, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({
          name: "test",
          category: "tech",
        });
      }
    });

    it("スキーマ検証エラーを適切に処理する", () => {
      const schema = z.object({
        page: z.number().min(1),
      });

      const url = new URL("http://example.com?page=0");
      const result = validateQueryParams(url, schema);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              field: "page",
              message: expect.any(String),
            }),
          ])
        );
      }
    });
  });

  describe("validatePathParams", () => {
    it("有効なパスパラメータを正しく検証する", () => {
      const schema = z.object({
        id: z.string(),
        slug: z.string(),
      });

      const params = { id: "123", slug: "test-post" };
      const result = validatePathParams(params, schema);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(params);
      }
    });

    it("スキーマ検証エラーを適切に処理する", () => {
      const schema = z.object({
        id: z.string().cuid(),
      });

      const params = { id: "invalid-id" };
      const result = validatePathParams(params, schema);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              field: "id",
              message: expect.any(String),
            }),
          ])
        );
      }
    });

    it("不明なエラーを適切に処理する", () => {
      const schema = z.object({
        id: z.string(),
      });

      // 型エラーを引き起こすために無効な値を渡す
      const params = { id: 123 } as unknown as Record<string, string>;
      const result = validatePathParams(params, schema);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              field: expect.any(String),
              message: expect.any(String),
            }),
          ])
        );
      }
    });
  });
});
