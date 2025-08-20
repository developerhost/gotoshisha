/**
 * 予算関連のユーティリティ関数
 */

/**
 * 予算範囲を表示用文字列にフォーマットする
 * @param budgetMin - 最小予算
 * @param budgetMax - 最大予算
 * @returns フォーマットされた予算文字列
 */
export const formatBudget = (
  budgetMin?: number,
  budgetMax?: number
): string => {
  if (budgetMin && budgetMax) {
    if (budgetMin === budgetMax) {
      return `¥${budgetMin.toLocaleString()}`;
    }
    return `¥${budgetMin.toLocaleString()} - ¥${budgetMax.toLocaleString()}`;
  }
  if (budgetMin) {
    return `¥${budgetMin.toLocaleString()}～`;
  }
  if (budgetMax) {
    return `～¥${budgetMax.toLocaleString()}`;
  }
  return "価格不明";
};
