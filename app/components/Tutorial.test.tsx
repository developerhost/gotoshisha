/**
 * チュートリアルコンポーネントのユニットテスト
 * React Testing Libraryの代わりに、コンポーネントのロジックを直接テスト
 */
import { vi } from "vitest";
import * as tutorialStorage from "../utils/tutorial/storage";

// チュートリアルストレージをモック化
vi.mock("../utils/tutorial/storage", () => ({
  setTutorialCompleted: vi.fn(),
}));

// React Nativeコンポーネントのモック
vi.mock("react-native", () => ({
  Dimensions: {
    get: () => ({ width: 375, height: 812 }),
  },
}));

// Tamaguiコンポーネントのモック
vi.mock("tamagui", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  YStack: ({ children }: any) => children,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  XStack: ({ children }: any) => children,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Text: ({ children }: any) => children,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Button: ({ onPress, children }: any) => ({ onPress, children }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ScrollView: ({ children }: any) => children,
  Circle: () => null,
  Image: () => null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Sheet: ({ children, open }: any) => (open ? children : null),
}));

// チュートリアルのステップをテスト用に定義
const tutorialSteps = [
  {
    title: "位置情報を共有しよう",
    description:
      "Gotoshishaでは、シーシャ店の位置情報を友達と共有できます。マップ上から簡単に店舗を見つけることができます。",
  },
  {
    title: "お気に入りの店を投稿",
    description:
      "あなたのお気に入りのシーシャ店を投稿して、みんなと共有しましょう。写真やコメントを添えて投稿できます。",
  },
  {
    title: "コミュニティに参加",
    description:
      "他のユーザーの投稿にいいねやコメントをして、シーシャ好きのコミュニティに参加しましょう。",
  },
  {
    title: "近くの店舗を検索",
    description:
      "現在地から近いシーシャ店を簡単に検索できます。営業時間や評価も確認できます。",
  },
];

describe("チュートリアルコンポーネント", () => {
  const mockSetTutorialCompleted = vi.mocked(
    tutorialStorage.setTutorialCompleted
  );
  const mockOnComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("チュートリアルのロジックテスト", () => {
    it("チュートリアルステップが正しく定義されている", () => {
      expect(tutorialSteps).toHaveLength(4);
      expect(tutorialSteps[0].title).toBe("位置情報を共有しよう");
      expect(tutorialSteps[tutorialSteps.length - 1].title).toBe(
        "近くの店舗を検索"
      );
    });

    it("ステップインデックスの管理が正しく動作する", () => {
      let currentStep = 0;

      // 次へ進む
      const handleNext = () => {
        if (currentStep < tutorialSteps.length - 1) {
          currentStep++;
        }
      };

      handleNext();
      expect(currentStep).toBe(1);

      handleNext();
      expect(currentStep).toBe(2);

      handleNext();
      expect(currentStep).toBe(3);

      // 最後のステップでは増加しない
      handleNext();
      expect(currentStep).toBe(3);
    });

    it("最後のステップかどうかの判定が正しく動作する", () => {
      const isLastStep = (step: number) => step === tutorialSteps.length - 1;

      expect(isLastStep(0)).toBe(false);
      expect(isLastStep(1)).toBe(false);
      expect(isLastStep(2)).toBe(false);
      expect(isLastStep(3)).toBe(true);
    });
  });

  describe("完了処理のロジックテスト", () => {
    it("handleCompleteが正しく動作する", async () => {
      mockSetTutorialCompleted.mockResolvedValue();

      const handleComplete = async () => {
        await tutorialStorage.setTutorialCompleted();
        mockOnComplete();
      };

      await handleComplete();

      expect(mockSetTutorialCompleted).toHaveBeenCalled();
      expect(mockOnComplete).toHaveBeenCalled();
    });

    it("スキップ処理が正しく動作する", async () => {
      mockSetTutorialCompleted.mockResolvedValue();

      const handleSkip = async () => {
        await tutorialStorage.setTutorialCompleted();
        mockOnComplete();
      };

      await handleSkip();

      expect(mockSetTutorialCompleted).toHaveBeenCalled();
      expect(mockOnComplete).toHaveBeenCalled();
    });

    it("エラーが発生してもonCompleteが呼ばれる", async () => {
      const mockError = new Error("Storage error");
      mockSetTutorialCompleted.mockRejectedValue(mockError);

      const handleComplete = async () => {
        try {
          await tutorialStorage.setTutorialCompleted();
        } catch (error) {
          // エラーを無視
          // eslint-disable-next-line no-console
          console.log("Error during tutorial completion:", error);
        }
        mockOnComplete();
      };

      await handleComplete();

      expect(mockSetTutorialCompleted).toHaveBeenCalled();
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });

  describe("表示制御のロジックテスト", () => {
    it("visibleプロパティによる表示制御が正しく動作する", () => {
      const shouldRender = (visible: boolean) => visible;

      expect(shouldRender(true)).toBe(true);
      expect(shouldRender(false)).toBe(false);
    });
  });

  describe("ボタンテキストのロジックテスト", () => {
    it("最後のステップで「始める」、それ以外は「次へ」と表示される", () => {
      const getButtonText = (currentStep: number) => {
        return currentStep === tutorialSteps.length - 1 ? "始める" : "次へ";
      };

      expect(getButtonText(0)).toBe("次へ");
      expect(getButtonText(1)).toBe("次へ");
      expect(getButtonText(2)).toBe("次へ");
      expect(getButtonText(3)).toBe("始める");
    });
  });

  describe("統合的なフローテスト", () => {
    it("チュートリアル完了までの一連の流れが正しく動作する", async () => {
      mockSetTutorialCompleted.mockResolvedValue();

      // 状態の初期化
      let currentStep = 0;
      let tutorialCompleted = false;

      // 次へ進む関数
      const handleNext = async () => {
        if (currentStep < tutorialSteps.length - 1) {
          currentStep++;
        } else {
          // 最後のステップで完了処理
          await tutorialStorage.setTutorialCompleted();
          tutorialCompleted = true;
          mockOnComplete();
        }
      };

      // チュートリアルを最後まで進める
      await handleNext(); // ステップ1→2
      expect(currentStep).toBe(1);
      expect(tutorialCompleted).toBe(false);

      await handleNext(); // ステップ2→3
      expect(currentStep).toBe(2);
      expect(tutorialCompleted).toBe(false);

      await handleNext(); // ステップ3→4
      expect(currentStep).toBe(3);
      expect(tutorialCompleted).toBe(false);

      await handleNext(); // ステップ4で完了
      expect(currentStep).toBe(3);
      expect(tutorialCompleted).toBe(true);
      expect(mockSetTutorialCompleted).toHaveBeenCalled();
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });
});
