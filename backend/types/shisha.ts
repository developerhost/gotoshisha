/**
 * シーシャ関連の型定義
 * SQLiteではenumがサポートされていないため、文字列リテラル型で定義
 */

// 予約可否の型
export type ReservationPolicy = "REQUIRED" | "RECOMMENDED" | "NOT_REQUIRED";

// 喫煙ポリシーの型
export type SmokingPolicy = "SMOKING_ALLOWED" | "SEPARATED" | "NON_SMOKING";

// 予約可否の日本語マッピング
export const RESERVATION_POLICY_LABELS: Record<ReservationPolicy, string> = {
  REQUIRED: "必須",
  RECOMMENDED: "推奨",
  NOT_REQUIRED: "不要",
};

// 喫煙ポリシーの日本語マッピング
export const SMOKING_POLICY_LABELS: Record<SmokingPolicy, string> = {
  SMOKING_ALLOWED: "完全喫煙可",
  SEPARATED: "分煙",
  NON_SMOKING: "禁煙",
};

// バリデーション用の定数配列
export const RESERVATION_POLICIES: ReservationPolicy[] = [
  "REQUIRED",
  "RECOMMENDED",
  "NOT_REQUIRED",
];
export const SMOKING_POLICIES: SmokingPolicy[] = [
  "SMOKING_ALLOWED",
  "SEPARATED",
  "NON_SMOKING",
];
