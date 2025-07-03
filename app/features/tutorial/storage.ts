/**
 * チュートリアル表示履歴の管理 (クロスプラットフォーム対応)
 */
import { StorageHelper } from "../../lib/storage";

const TUTORIAL_COMPLETED_KEY = "tutorial_completed";

/**
 * チュートリアルが完了済みかどうかを確認する
 */
export const isTutorialCompleted = async (): Promise<boolean> => {
  return await StorageHelper.getBoolean(TUTORIAL_COMPLETED_KEY);
};

/**
 * チュートリアル完了状態を保存する
 */
export const setTutorialCompleted = async (): Promise<void> => {
  await StorageHelper.setBoolean(TUTORIAL_COMPLETED_KEY, true);
};

/**
 * チュートリアル完了状態をリセットする（デバッグ用）
 */
export const resetTutorialStatus = async (): Promise<void> => {
  try {
    await StorageHelper.setBoolean(TUTORIAL_COMPLETED_KEY, false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to reset tutorial status:", error);
  }
};
