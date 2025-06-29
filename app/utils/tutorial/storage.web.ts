/**
 * チュートリアル表示履歴の管理 (Web専用)
 */

const TUTORIAL_COMPLETED_KEY = 'tutorial_completed';

/**
 * チュートリアルが完了済みかどうかを確認する
 */
export const isTutorialCompleted = async (): Promise<boolean> => {
  try {
    const value = localStorage.getItem(TUTORIAL_COMPLETED_KEY);
    return value === 'true';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to check tutorial status:', error);
    return false;
  }
};

/**
 * チュートリアル完了状態を保存する
 */
export const setTutorialCompleted = async (): Promise<void> => {
  try {
    localStorage.setItem(TUTORIAL_COMPLETED_KEY, 'true');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save tutorial status:', error);
  }
};

/**
 * チュートリアル完了状態をリセットする（デバッグ用）
 */
export const resetTutorialStatus = async (): Promise<void> => {
  try {
    localStorage.removeItem(TUTORIAL_COMPLETED_KEY);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to reset tutorial status:', error);
  }
};