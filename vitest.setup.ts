import { beforeEach, vi } from "vitest";

// Define global mocks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).__DEV__ = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).jest = vi;

// Mock React Native modules
vi.mock("react-native", () => ({
  Platform: {
    OS: "ios",
    select: vi.fn((obj) => obj.ios),
  },
  Dimensions: {
    get: vi.fn(() => ({ width: 375, height: 812 })),
  },
  StyleSheet: {
    create: vi.fn((styles) => styles),
  },
  View: "View",
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
  ScrollView: "ScrollView",
}));

// Mock Expo modules
vi.mock("expo-constants", () => ({
  default: {
    statusBarHeight: 44,
  },
}));

vi.mock("expo-router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    replace: vi.fn(),
  })),
  useLocalSearchParams: vi.fn(() => ({})),
  Link: "Link",
  Stack: {
    Screen: "Screen",
  },
}));

vi.mock("react-native-maps", () => ({
  default: "MapView",
  Marker: "Marker",
  PROVIDER_GOOGLE: "google",
}));

// Clear all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});
