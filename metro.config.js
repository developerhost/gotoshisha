const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// テストファイルとテスト関連の依存関係を除外
config.resolver.blockList = [
  // テストファイルを除外
  /.*\.test\.(js|jsx|ts|tsx)$/,
  /.*\.spec\.(js|jsx|ts|tsx)$/,
  /__tests__\/.*/,
  
  // vitestとchaiを除外
  /node_modules[/\\]vitest[/\\].*/,
  /node_modules[/\\]chai[/\\].*/,
  /node_modules[/\\]@vitest[/\\].*/,
  
  // その他のテスト関連ライブラリを除外
  /node_modules[/\\]@testing-library[/\\].*/,
  /node_modules[/\\]jest[/\\].*/,
];

module.exports = config;