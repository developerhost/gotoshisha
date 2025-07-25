/**
 * テスト環境用のロガーモック
 */

// テスト環境では、実際のconsoleメソッドをそのまま使用する
export const Logger = {
  debug: vi.fn((...args: unknown[]) => {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }),
  info: vi.fn((...args: unknown[]) => {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.info(...args);
    }
  }),
  warn: vi.fn((...args: unknown[]) => {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.warn(...args);
    }
  }),
  error: vi.fn((...args: unknown[]) => {
    if (process.env.NODE_ENV === 'test' && process.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.error(...args);
    }
  }),
};

export default Logger;