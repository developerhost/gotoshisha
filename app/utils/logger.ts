/**
 * アプリケーション全体で使用するロガー設定
 */
import { logger } from "react-native-logs";

// 開発環境と本番環境で異なるログレベルを設定
const logLevel = __DEV__ ? "debug" : "error";

// ロガーインスタンスを作成
const log = logger.createLogger({
  severity: logLevel,
  transport: __DEV__ ? logger.chromeConsoleTransport : [],
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
});

// 各ログレベルのメソッドをエクスポート
export const Logger = {
  debug: (msg: string, ...args: unknown[]) => log.debug(msg, ...args),
  info: (msg: string, ...args: unknown[]) => log.info(msg, ...args),
  warn: (msg: string, ...args: unknown[]) => log.warn(msg, ...args),
  error: (msg: string, ...args: unknown[]) => log.error(msg, ...args),
};

// デフォルトエクスポート
export default Logger;