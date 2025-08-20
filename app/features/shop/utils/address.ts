/**
 * 住所関連のユーティリティ関数
 */

/**
 * 住所を都道府県＋市区町村まででフォーマットする
 * @param address - フル住所文字列
 * @returns フォーマットされた住所
 */
export const formatAddress = (address: string): string => {
  // 日本の住所パターンにマッチする正規表現
  const match = address.match(/^(.+?[都道府県])(.+?[市区町村])/);
  if (match) {
    return match[1] + match[2];
  }

  // 基本的なパターンマッチに失敗した場合、最初の区切りまでを取得
  const parts = address.split(/\s|　/);
  if (parts.length > 0) {
    return parts[0];
  }

  return address;
};
