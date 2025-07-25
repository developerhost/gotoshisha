/**
 * Web版用のreact-native-mapsモック
 */

import React from "react";

// Web版では動作しないダミーコンポーネント
const MapView = ({ children }) => {
  return React.createElement(
    "div",
    { style: { flex: 1, backgroundColor: "#e0e0e0" } },
    children
  );
};

const Marker = () => {
  return React.createElement("div", {});
};

// 定数のモック
const PROVIDER_DEFAULT = "default";
const PROVIDER_GOOGLE = "google";

// TypeScript用のRegion型のダミー定義
// ランタイムでは使用されないが、TypeScriptの型チェックで必要
export const Region = {};

export default MapView;
export { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE };
