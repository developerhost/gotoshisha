/**
 * テスト用のユーティリティ関数
 */

/**
 * 数値を2倍にする関数
 * @param num - 入力する数値
 * @returns 入力値の2倍
 */
export const double = (num: number): number => {
  return num * 2;
};

/**
 * 文字列を大文字に変換する関数
 * @param str - 入力する文字列
 * @returns 大文字に変換された文字列
 */
export const toUpperCase = (str: string): string => {
  return str.toUpperCase();
};

/**
 * 配列の合計を計算する関数
 * @param numbers - 数値の配列
 * @returns 配列の合計値
 */
export const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, num) => acc + num, 0);
};

/**
 * オブジェクトが空かどうかを判定する関数
 * @param obj - 判定するオブジェクト
 * @returns オブジェクトが空の場合true
 */
export const isEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};
