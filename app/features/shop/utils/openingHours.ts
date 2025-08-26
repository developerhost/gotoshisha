/**
 * 営業時間関連のユーティリティ関数
 */

/**
 * 営業時間データをパースして表示用文字列に変換する
 * @param openingHours - JSON形式または文字列の営業時間データ
 * @returns 表示用の営業時間文字列
 */
export const parseOpeningHours = (openingHours: string | undefined): string => {
  if (!openingHours) return "営業時間不明";

  try {
    const hours = JSON.parse(openingHours);
    if (typeof hours === "string") {
      return hours;
    }
    // JSON形式の場合は文字列化
    return JSON.stringify(hours);
  } catch {
    // JSON解析に失敗した場合はそのまま表示
    return openingHours;
  }
};
