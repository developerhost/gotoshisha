/**
 * アプリケーション全体で使用するロガー設定
 * react-native-logsライブラリを使用した実装
 */

import { logger, consoleTransport } from "react-native-logs";

// react-native-logsの設定
const defaultConfig = {
  severity: __DEV__ ? "debug" : "error",
  transport: [consoleTransport],
  transportOptions: {
    colors: {
      info: "blueBright" as const,
      warn: "yellowBright" as const,
      error: "redBright" as const,
    },
  },
  async: true,
  dateFormat: "time" as const,
  printLevel: true,
  printDate: true,
  enabled: true,
};

// ロガーインスタンスを作成
const loggerInstance = logger.createLogger(defaultConfig);

// 各ログレベルのメソッドをエクスポート
export const Logger = {
  debug: loggerInstance.debug,
  info: loggerInstance.info,
  warn: loggerInstance.warn,
  error: loggerInstance.error,
};

// デフォルトエクスポート
export default Logger;
