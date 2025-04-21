import { useThemeColor } from "./useThemeColor";
import { Colors } from "@/constants/Colors";

// useColorSchemeフックをモック
jest.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

// モックをインポート
import { useColorScheme } from "@/hooks/useColorScheme";

describe("useThemeColor", () => {
  // 各テスト後にモックをリセット
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("ライトモード", () => {
    beforeEach(() => {
      // useColorSchemeが'light'を返すようにモック
      (useColorScheme as jest.Mock).mockReturnValue("light");
    });

    it("propsに色が指定されていない場合、Colorsから色を取得する", () => {
      const colorName = "text";
      const result = useThemeColor({}, colorName);

      expect(result).toBe(Colors.light.text);
      expect(useColorScheme).toHaveBeenCalled();
    });

    it("propsに色が指定されている場合、propsの色を使用する", () => {
      const props = { light: "#custom-light" };
      const colorName = "text";
      const result = useThemeColor(props, colorName);

      expect(result).toBe("#custom-light");
      expect(useColorScheme).toHaveBeenCalled();
    });
  });

  describe("ダークモード", () => {
    beforeEach(() => {
      // useColorSchemeが'dark'を返すようにモック
      (useColorScheme as jest.Mock).mockReturnValue("dark");
    });

    it("propsに色が指定されていない場合、Colorsから色を取得する", () => {
      const colorName = "text";
      const result = useThemeColor({}, colorName);

      expect(result).toBe(Colors.dark.text);
      expect(useColorScheme).toHaveBeenCalled();
    });

    it("propsに色が指定されている場合、propsの色を使用する", () => {
      const props = { dark: "#custom-dark" };
      const colorName = "text";
      const result = useThemeColor(props, colorName);

      expect(result).toBe("#custom-dark");
      expect(useColorScheme).toHaveBeenCalled();
    });
  });

  describe("テーマがnullの場合", () => {
    beforeEach(() => {
      // useColorSchemeがnullを返すようにモック
      (useColorScheme as jest.Mock).mockReturnValue(null);
    });

    it("デフォルトでlightテーマの色を使用する", () => {
      const colorName = "text";
      const result = useThemeColor({}, colorName);

      expect(result).toBe(Colors.light.text);
      expect(useColorScheme).toHaveBeenCalled();
    });

    it("propsにlight用の色が指定されている場合、その色を使用する", () => {
      const props = { light: "#custom-light-fallback" };
      const colorName = "text";
      const result = useThemeColor(props, colorName);

      expect(result).toBe("#custom-light-fallback");
      expect(useColorScheme).toHaveBeenCalled();
    });
  });
});
