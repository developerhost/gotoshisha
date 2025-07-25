/**
 * アプリケーション全体で使用するロガー設定
 * セキュアで軽量なカスタムロガー実装
 */

// ログレベルの定義
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  args: unknown[];
  timestamp: string;
}

// 開発環境でのみログを出力し、本番環境では機密情報の漏洩を防ぐ
const shouldLog = (level: LogLevel): boolean => {
  if (!__DEV__) {
    // 本番環境ではerrorレベルのみ許可（ただしコンソールには出力しない）
    return level === "error";
  }
  return true;
};

// 開発環境でのみコンソール出力を行う
const logToConsole = (entry: LogEntry): void => {
  if (!__DEV__) return;

  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;

  switch (entry.level) {
    case "debug":
      // eslint-disable-next-line no-console
      console.log(prefix, entry.message, ...entry.args);
      break;
    case "info":
      // eslint-disable-next-line no-console
      console.info(prefix, entry.message, ...entry.args);
      break;
    case "warn":
      // eslint-disable-next-line no-console
      console.warn(prefix, entry.message, ...entry.args);
      break;
    case "error":
      // eslint-disable-next-line no-console
      console.error(prefix, entry.message, ...entry.args);
      break;
  }
};

// ログエントリを作成
const createLogEntry = (
  level: LogLevel,
  message: string,
  args: unknown[]
): LogEntry => ({
  level,
  message,
  args,
  timestamp: new Date().toISOString(),
});

// ロガー関数の実装
const createLogger =
  (level: LogLevel) =>
  (message: string, ...args: unknown[]): void => {
    if (!shouldLog(level)) return;

    const entry = createLogEntry(level, message, args);
    logToConsole(entry);

    // 本番環境でのエラーログは別途処理可能（例：外部ログサービスへの送信）
    if (!__DEV__ && level === "error") {
      // TODO: 本番環境でのエラーログ処理（Sentry、Crashlytics等）
      // 現在は何もしない（機密情報の漏洩を防ぐため）
    }
  };

// 各ログレベルのメソッドをエクスポート
export const Logger = {
  debug: createLogger("debug"),
  info: createLogger("info"),
  warn: createLogger("warn"),
  error: createLogger("error"),
};

// デフォルトエクスポート
export default Logger;
