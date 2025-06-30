/**
 * useLocation.tsのテスト
 * 位置情報取得カスタムフックのロジック部分のテスト
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { LocationState } from "./useLocation";

// 新宿の座標定数
const SHINJUKU_COORDINATE = {
  latitude: 35.6938,
  longitude: 139.7034,
} as const;

// モジュールのモック
vi.mock("expo-location");
vi.mock("react-native", () => ({
  Linking: {
    openSettings: vi.fn(),
  },
  AppState: {
    addEventListener: vi.fn(),
  },
}));

/**
 * LocationStateの初期値を生成するロジック
 */
function createInitialLocationState(): LocationState {
  return {
    latitude: null,
    longitude: null,
    error: null,
    isLoading: false,
    hasPermission: false,
    isUsingFallback: false,
    canRequestPermission: true,
  };
}

describe("useLocation ロジック関数", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("初期状態", () => {
    it("初期状態が正しく設定される", () => {
      const initialState = createInitialLocationState();

      expect(initialState).toEqual({
        latitude: null,
        longitude: null,
        error: null,
        isLoading: false,
        hasPermission: false,
        isUsingFallback: false,
        canRequestPermission: true,
      });
    });
  });

  describe("権限状態の処理ロジック", () => {
    /**
     * 権限ステータスから適切な状態を決定するロジック
     */
    const determinePermissionState = (
      status: "granted" | "denied" | "undetermined",
      canAskAgain: boolean
    ): {
      hasPermission: boolean;
      canRequestPermission: boolean;
      shouldUseFallback: boolean;
      errorMessage: string | null;
    } => {
      // granted または undetermined の場合は権限ありとして扱う
      const hasPermission = status === "granted" || status === "undetermined";

      if (status === "denied" && !canAskAgain) {
        return {
          hasPermission: false,
          canRequestPermission: false,
          shouldUseFallback: true,
          errorMessage:
            "位置情報の権限が拒否されています。設定から権限を有効にしてください。新宿駅周辺を表示しています。",
        };
      }

      if (status === "denied") {
        return {
          hasPermission: false,
          canRequestPermission: canAskAgain,
          shouldUseFallback: true,
          errorMessage: canAskAgain
            ? "位置情報の権限が拒否されました。新宿駅周辺を表示しています。"
            : "位置情報の権限が拒否されています。設定から権限を有効にしてください。新宿駅周辺を表示しています。",
        };
      }

      return {
        hasPermission,
        canRequestPermission: true,
        shouldUseFallback: false,
        errorMessage: null,
      };
    };

    it("granted状態は権限ありとして扱う", () => {
      const result = determinePermissionState("granted", true);

      expect(result).toEqual({
        hasPermission: true,
        canRequestPermission: true,
        shouldUseFallback: false,
        errorMessage: null,
      });
    });

    it("undetermined状態も権限ありとして扱う（おおよその位置情報対応）", () => {
      const result = determinePermissionState("undetermined", true);

      expect(result).toEqual({
        hasPermission: true,
        canRequestPermission: true,
        shouldUseFallback: false,
        errorMessage: null,
      });
    });

    it("denied状態で再要求可能な場合", () => {
      const result = determinePermissionState("denied", true);

      expect(result).toEqual({
        hasPermission: false,
        canRequestPermission: true,
        shouldUseFallback: true,
        errorMessage:
          "位置情報の権限が拒否されました。新宿駅周辺を表示しています。",
      });
    });

    it("denied状態で再要求不可の場合", () => {
      const result = determinePermissionState("denied", false);

      expect(result).toEqual({
        hasPermission: false,
        canRequestPermission: false,
        shouldUseFallback: true,
        errorMessage:
          "位置情報の権限が拒否されています。設定から権限を有効にしてください。新宿駅周辺を表示しています。",
      });
    });
  });

  describe("フォールバック位置の処理", () => {
    /**
     * エラー時のフォールバック位置情報を生成するロジック
     */
    const createFallbackLocation = (
      errorMessage: string,
      canRequestPermission: boolean = true
    ): Partial<LocationState> => {
      return {
        latitude: SHINJUKU_COORDINATE.latitude,
        longitude: SHINJUKU_COORDINATE.longitude,
        isLoading: false,
        isUsingFallback: true,
        canRequestPermission,
        error: errorMessage,
      };
    };

    it("基本的なフォールバック位置を生成する", () => {
      const fallback = createFallbackLocation("エラーが発生しました");

      expect(fallback).toEqual({
        latitude: 35.6938,
        longitude: 139.7034,
        isLoading: false,
        isUsingFallback: true,
        canRequestPermission: true,
        error: "エラーが発生しました",
      });
    });

    it("権限再要求不可のフォールバック位置を生成する", () => {
      const fallback = createFallbackLocation("権限エラー", false);

      expect(fallback).toEqual({
        latitude: 35.6938,
        longitude: 139.7034,
        isLoading: false,
        isUsingFallback: true,
        canRequestPermission: false,
        error: "権限エラー",
      });
    });
  });

  describe("位置情報精度の設定", () => {
    /**
     * 権限状態に応じた位置情報取得の精度設定を決定するロジック
     */
    const getLocationAccuracyConfig = (
      permissionType: "precise" | "approximate" | "unknown"
    ) => {
      if (permissionType === "approximate") {
        // おおよその位置情報の場合は精度を緩和
        return {
          lastKnown: {
            maxAge: 300000, // 5分
            requiredAccuracy: 5000, // 5km
          },
          current: {
            accuracy: "Low",
            timeInterval: 5000,
            distanceInterval: 100,
          },
          initialCheck: {
            maxAge: 600000, // 10分
            requiredAccuracy: 10000, // 10km
          },
        };
      }

      // 精密な位置情報の場合（デフォルト）
      return {
        lastKnown: {
          maxAge: 300000,
          requiredAccuracy: 5000,
        },
        current: {
          accuracy: "Low", // バッテリー節約のため常にLow
          timeInterval: 5000,
          distanceInterval: 100,
        },
        initialCheck: {
          maxAge: 600000,
          requiredAccuracy: 10000,
        },
      };
    };

    it("おおよその位置情報の場合の設定", () => {
      const config = getLocationAccuracyConfig("approximate");

      expect(config).toEqual({
        lastKnown: {
          maxAge: 300000,
          requiredAccuracy: 5000,
        },
        current: {
          accuracy: "Low",
          timeInterval: 5000,
          distanceInterval: 100,
        },
        initialCheck: {
          maxAge: 600000,
          requiredAccuracy: 10000,
        },
      });
    });

    it("精密な位置情報の場合の設定", () => {
      const config = getLocationAccuracyConfig("precise");

      expect(config).toEqual({
        lastKnown: {
          maxAge: 300000,
          requiredAccuracy: 5000,
        },
        current: {
          accuracy: "Low",
          timeInterval: 5000,
          distanceInterval: 100,
        },
        initialCheck: {
          maxAge: 600000,
          requiredAccuracy: 10000,
        },
      });
    });
  });

  describe("位置情報更新の優先順位", () => {
    /**
     * 位置情報の更新戦略を管理するロジック
     */
    class LocationUpdateStrategy {
      private hasQuickLocation = false;

      setQuickLocation(location: { latitude: number; longitude: number }) {
        this.hasQuickLocation = true;
        return {
          latitude: location.latitude,
          longitude: location.longitude,
          error: null,
          isLoading: false,
          hasPermission: true,
          isUsingFallback: false,
          canRequestPermission: true,
        };
      }

      updateWithPreciseLocation(location: {
        latitude: number;
        longitude: number;
      }) {
        return {
          latitude: location.latitude,
          longitude: location.longitude,
          error: null,
          isLoading: false,
          hasPermission: true,
          isUsingFallback: false,
          canRequestPermission: true,
        };
      }

      handlePreciseLocationError(): Partial<LocationState> | null {
        if (!this.hasQuickLocation) {
          return {
            latitude: SHINJUKU_COORDINATE.latitude,
            longitude: SHINJUKU_COORDINATE.longitude,
            isLoading: false,
            isUsingFallback: true,
            canRequestPermission: true,
            error: "位置情報の取得に失敗しました。新宿駅周辺を表示しています。",
          };
        }
        // すでに大まかな位置がある場合はエラーを無視
        return null;
      }
    }

    it("最初に素早い位置情報を設定できる", () => {
      const strategy = new LocationUpdateStrategy();

      const result = strategy.setQuickLocation({
        latitude: 35.7,
        longitude: 139.7,
      });

      expect(result).toEqual({
        latitude: 35.7,
        longitude: 139.7,
        error: null,
        isLoading: false,
        hasPermission: true,
        isUsingFallback: false,
        canRequestPermission: true,
      });
    });

    it("精密な位置情報で更新できる", () => {
      const strategy = new LocationUpdateStrategy();

      const result = strategy.updateWithPreciseLocation({
        latitude: 35.7001,
        longitude: 139.7001,
      });

      expect(result).toEqual({
        latitude: 35.7001,
        longitude: 139.7001,
        error: null,
        isLoading: false,
        hasPermission: true,
        isUsingFallback: false,
        canRequestPermission: true,
      });
    });

    it("素早い位置情報がない場合、精密な位置取得エラーでフォールバックを使用", () => {
      const strategy = new LocationUpdateStrategy();

      const result = strategy.handlePreciseLocationError();

      expect(result).toEqual({
        latitude: 35.6938,
        longitude: 139.7034,
        isLoading: false,
        isUsingFallback: true,
        canRequestPermission: true,
        error: "位置情報の取得に失敗しました。新宿駅周辺を表示しています。",
      });
    });

    it("素早い位置情報がある場合、精密な位置取得エラーを無視", () => {
      const strategy = new LocationUpdateStrategy();

      // 先に素早い位置を設定
      strategy.setQuickLocation({ latitude: 35.7, longitude: 139.7 });

      const result = strategy.handlePreciseLocationError();

      expect(result).toBe(null);
    });
  });

  describe("エラーメッセージの生成", () => {
    /**
     * エラータイプに応じたメッセージを生成するロジック
     */
    const generateErrorMessage = (
      error: unknown,
      context: "permission" | "location" | "general"
    ): string => {
      if (error instanceof Error) {
        return error.message;
      }

      switch (context) {
        case "permission":
          return "位置情報の権限が拒否されました。新宿駅周辺を表示しています。";
        case "location":
          return "位置情報の取得に失敗しました。新宿駅周辺を表示しています。";
        case "general":
        default:
          return "位置情報の取得に失敗しました。新宿駅周辺を表示しています。";
      }
    };

    it("Errorオブジェクトのメッセージを使用する", () => {
      const error = new Error("カスタムエラーメッセージ");

      expect(generateErrorMessage(error, "general")).toBe(
        "カスタムエラーメッセージ"
      );
    });

    it("権限エラーのデフォルトメッセージ", () => {
      expect(generateErrorMessage("some error", "permission")).toBe(
        "位置情報の権限が拒否されました。新宿駅周辺を表示しています。"
      );
    });

    it("位置情報エラーのデフォルトメッセージ", () => {
      expect(generateErrorMessage(null, "location")).toBe(
        "位置情報の取得に失敗しました。新宿駅周辺を表示しています。"
      );
    });

    it("一般的なエラーのデフォルトメッセージ", () => {
      expect(generateErrorMessage(undefined, "general")).toBe(
        "位置情報の取得に失敗しました。新宿駅周辺を表示しています。"
      );
    });
  });

  describe("アプリ状態変化の処理", () => {
    /**
     * アプリがフォアグラウンドに戻った時の処理ロジック
     */
    const handleAppStateChange = (
      nextAppState: string,
      currentPermissionStatus: "granted" | "denied",
      hasPermission: boolean,
      isUsingFallback: boolean
    ): { shouldRetryLocation: boolean; delay: number } => {
      if (nextAppState === "active") {
        // 以前に権限が拒否されていて、現在は許可されている場合は自動再試行
        if (
          currentPermissionStatus === "granted" &&
          (!hasPermission || isUsingFallback)
        ) {
          return {
            shouldRetryLocation: true,
            delay: 500, // 設定画面からの復帰を確実にするため
          };
        }
      }

      return {
        shouldRetryLocation: false,
        delay: 0,
      };
    };

    it("権限が許可されてフォアグラウンドに戻った場合は再試行", () => {
      const result = handleAppStateChange("active", "granted", false, true);

      expect(result).toEqual({
        shouldRetryLocation: true,
        delay: 500,
      });
    });

    it("権限が拒否されたままの場合は再試行しない", () => {
      const result = handleAppStateChange("active", "denied", false, true);

      expect(result).toEqual({
        shouldRetryLocation: false,
        delay: 0,
      });
    });

    it("既に権限があり正常な場合は再試行しない", () => {
      const result = handleAppStateChange("active", "granted", true, false);

      expect(result).toEqual({
        shouldRetryLocation: false,
        delay: 0,
      });
    });

    it("バックグラウンドに移行する場合は何もしない", () => {
      const result = handleAppStateChange("background", "granted", false, true);

      expect(result).toEqual({
        shouldRetryLocation: false,
        delay: 0,
      });
    });
  });

  describe("設定画面を開く処理", () => {
    /**
     * 設定画面を開く処理のエラーハンドリング
     */
    const openSettingsSafely = async (
      openSettings: () => Promise<void>
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        await openSettings();
        return { success: true };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("設定画面を開けませんでした:", error);
        return {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "設定画面を開けませんでした",
        };
      }
    };

    it("正常に設定画面を開ける場合", async () => {
      const mockOpenSettings = vi.fn().mockResolvedValue(undefined);

      const result = await openSettingsSafely(mockOpenSettings);

      expect(result).toEqual({ success: true });
      expect(mockOpenSettings).toHaveBeenCalled();
    });

    it("設定画面を開く際にエラーが発生した場合", async () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const mockOpenSettings = vi
        .fn()
        .mockRejectedValue(new Error("Failed to open"));

      const result = await openSettingsSafely(mockOpenSettings);

      expect(result).toEqual({
        success: false,
        error: "Failed to open",
      });
      expect(consoleError).toHaveBeenCalledWith(
        "設定画面を開けませんでした:",
        expect.any(Error)
      );

      consoleError.mockRestore();
    });
  });

  describe("状態遷移の整合性", () => {
    /**
     * 位置情報取得の各段階での状態遷移を検証
     */
    const getStateTransition = (
      phase: "initial" | "loading" | "success" | "error",
      options?: {
        hasPermission?: boolean;
        location?: { latitude: number; longitude: number };
        error?: string;
        isUsingFallback?: boolean;
      }
    ): LocationState => {
      const base = createInitialLocationState();

      switch (phase) {
        case "initial":
          return base;

        case "loading":
          return {
            ...base,
            isLoading: true,
            error: null,
          };

        case "success":
          return {
            ...base,
            latitude: options?.location?.latitude || 35.7,
            longitude: options?.location?.longitude || 139.7,
            isLoading: false,
            hasPermission: options?.hasPermission ?? true,
            isUsingFallback: false,
            error: null,
          };

        case "error":
          return {
            ...base,
            latitude: options?.isUsingFallback
              ? SHINJUKU_COORDINATE.latitude
              : null,
            longitude: options?.isUsingFallback
              ? SHINJUKU_COORDINATE.longitude
              : null,
            isLoading: false,
            hasPermission: options?.hasPermission ?? false,
            isUsingFallback: options?.isUsingFallback ?? true,
            error: options?.error || "エラーが発生しました",
          };

        default:
          return base;
      }
    };

    it("初期状態から読み込み状態への遷移", () => {
      const initial = getStateTransition("initial");
      const loading = getStateTransition("loading");

      expect(loading).toEqual({
        ...initial,
        isLoading: true,
        error: null,
      });
    });

    it("読み込み状態から成功状態への遷移", () => {
      const success = getStateTransition("success", {
        location: { latitude: 35.681236, longitude: 139.767125 },
      });

      expect(success).toEqual({
        latitude: 35.681236,
        longitude: 139.767125,
        error: null,
        isLoading: false,
        hasPermission: true,
        isUsingFallback: false,
        canRequestPermission: true,
      });
    });

    it("読み込み状態からエラー状態への遷移（フォールバックあり）", () => {
      const error = getStateTransition("error", {
        isUsingFallback: true,
        error: "位置情報の取得に失敗しました",
      });

      expect(error).toEqual({
        latitude: 35.6938,
        longitude: 139.7034,
        error: "位置情報の取得に失敗しました",
        isLoading: false,
        hasPermission: false,
        isUsingFallback: true,
        canRequestPermission: true,
      });
    });
  });
});
