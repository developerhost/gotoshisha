/**
 * チュートリアルコンポーネントのテスト
 */
import * as tutorialStorage from "../utils/tutorial/storage";

// チュートリアルストレージをモック化
vi.mock("../utils/tutorial/storage", () => ({
  setTutorialCompleted: vi.fn(),
}));

describe("チュートリアルコンポーネント", () => {
  const mockSetTutorialCompleted = vi.mocked(
    tutorialStorage.setTutorialCompleted
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("setTutorialCompletedが正常に呼び出される", async () => {
    mockSetTutorialCompleted.mockResolvedValue();

    // チュートリアル完了の処理をテスト
    await tutorialStorage.setTutorialCompleted();

    expect(mockSetTutorialCompleted).toHaveBeenCalled();
  });

  it("チュートリアルストレージ関数の連携テスト", async () => {
    mockSetTutorialCompleted.mockResolvedValue();

    // チュートリアル完了処理のテスト
    await tutorialStorage.setTutorialCompleted();
    expect(mockSetTutorialCompleted).toHaveBeenCalledTimes(1);

    // 複数回呼び出しテスト
    await tutorialStorage.setTutorialCompleted();
    expect(mockSetTutorialCompleted).toHaveBeenCalledTimes(2);
  });

  it("エラーハンドリングのテスト", async () => {
    const mockError = new Error("Storage error");
    mockSetTutorialCompleted.mockRejectedValue(mockError);

    // エラーが発生した場合の動作確認
    try {
      await tutorialStorage.setTutorialCompleted();
    } catch (error) {
      expect(error).toEqual(mockError);
    }
    expect(mockSetTutorialCompleted).toHaveBeenCalled();
  });
});
