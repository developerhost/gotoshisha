/**
 * 写真データ関連のユーティリティ関数
 */

/**
 * 写真データをパースして配列形式に変換する
 * @param photos - JSON形式または文字列の写真データ
 * @returns 写真URLの配列
 */
export const parsePhotos = (photos: string | undefined): string[] => {
  if (!photos) return [];

  try {
    const parsed = JSON.parse(photos);
    if (Array.isArray(parsed)) {
      return parsed.filter((url) => typeof url === "string");
    }
    if (typeof parsed === "string") {
      return [parsed];
    }
  } catch {
    // JSON解析に失敗した場合、文字列として扱う
    if (typeof photos === "string" && photos.trim()) {
      return [photos];
    }
  }

  return [];
};
