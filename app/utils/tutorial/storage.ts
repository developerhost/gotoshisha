/**
 * チュートリアル表示履歴の管理 (ネイティブ専用)
 */
import * as SecureStore from 'expo-secure-store';

const TUTORIAL_COMPLETED_KEY = 'tutorial_completed';

/**
 * チュートリアルが完了済みかどうかを確認する
 */
export const isTutorialCompleted = async (): Promise<boolean> => {
  try {
    const value = await SecureStore.getItemAsync(TUTORIAL_COMPLETED_KEY);
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
    await SecureStore.setItemAsync(TUTORIAL_COMPLETED_KEY, 'true');
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
    await SecureStore.deleteItemAsync(TUTORIAL_COMPLETED_KEY);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to reset tutorial status:', error);
  }
};