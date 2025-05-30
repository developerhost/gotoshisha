import { determineLogLevels } from "./db";

describe("determineLogLevels", () => {
  it("開発環境の場合、全てのログレベルを返すこと", () => {
    const result = determineLogLevels("development");
    expect(result).toEqual(["query", "info", "warn", "error"]);
  });

  it("本番環境の場合、エラーログのみを返すこと", () => {
    const result = determineLogLevels("production");
    expect(result).toEqual(["error"]);
  });

  it("未定義の環境の場合、エラーログのみを返すこと", () => {
    const result = determineLogLevels("staging");
    expect(result).toEqual(["error"]);
  });

  it("空文字の場合、エラーログのみを返すこと", () => {
    const result = determineLogLevels("");
    expect(result).toEqual(["error"]);
  });

  it("大文字小文字が異なる場合、エラーログのみを返すこと", () => {
    const result = determineLogLevels("DEVELOPMENT");
    expect(result).toEqual(["error"]);
  });
});
