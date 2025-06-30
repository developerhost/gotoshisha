# チュートリアル機能の管理ガイド

## 概要

Gotoshisha アプリでは、初回起動時にアプリの使用方法を説明するチュートリアル機能を提供しています。このドキュメントでは、チュートリアルの状態確認とリセット方法について説明します。

## チュートリアル状態の仕組み

### 保存場所

- **ストレージ**:
  - ネイティブ: `expo-secure-store`
  - Web: `localStorage`
- **キー**: `tutorial_completed`
- **値**: `"true"` (完了済み) または `null/undefined` (未完了)

### 実装ファイル

- **ユーティリティ**:
  - ネイティブ: `app/utils/tutorial/storage.ts`
  - Web: `app/utils/tutorial/storage.web.ts`
- **コンポーネント**: `app/components/Tutorial.tsx`
- **統合**: `app/index.tsx`

## 状態確認方法

### 1. 開発者ツールでの確認

#### React Native Debugger

```javascript
// React Native Debugger のコンソールで実行
import * as SecureStore from "expo-secure-store";

// チュートリアル状態を確認
SecureStore.getItemAsync("tutorial_completed").then((value) => {
  console.log("Tutorial completed:", value);
});
```

#### Expo Dev Tools (Web)

```javascript
// ブラウザの開発者ツールで実行
localStorage.getItem("tutorial_completed");
```

### 2. アプリ内での確認

#### コンポーネント内で確認

```typescript
import { isTutorialCompleted } from "../utils/tutorial/storage";

const checkStatus = async () => {
  const completed = await isTutorialCompleted();
  console.log("チュートリアル完了済み:", completed);
};
```

#### デバッグ用ボタンの追加例

```typescript
import { isTutorialCompleted } from "./utils/tutorial/storage";

// 任意のコンポーネントに追加
const debugTutorialStatus = async () => {
  const status = await isTutorialCompleted();
  alert(`チュートリアル状態: ${status ? "完了済み" : "未完了"}`);
};

// JSX内
<TouchableOpacity onPress={debugTutorialStatus}>
  <Text>チュートリアル状態確認</Text>
</TouchableOpacity>;
```

## チュートリアルリセット方法

### 1. プログラムによるリセット

#### 単発リセット

```typescript
import { resetTutorialStatus } from "./utils/tutorial/storage";

const resetTutorial = async () => {
  await resetTutorialStatus();
  console.log("チュートリアルをリセットしました");
  // アプリを再起動するか、状態を更新
};
```

#### デバッグ用リセットボタンの追加例

```typescript
import { resetTutorialStatus } from "./utils/tutorial/storage";

const handleResetTutorial = async () => {
  await resetTutorialStatus();
  alert("チュートリアルをリセットしました。アプリを再起動してください。");
};

// JSX内
<TouchableOpacity onPress={handleResetTutorial}>
  <Text>チュートリアルリセット</Text>
</TouchableOpacity>;
```

### 2. 手動でのリセット

#### React Native Debugger

```javascript
import * as SecureStore from "expo-secure-store";

// チュートリアル状態をリセット
SecureStore.deleteItemAsync("tutorial_completed").then(() => {
  console.log("チュートリアルをリセットしました");
});
```

#### Expo Dev Tools (Web)

```javascript
// ブラウザの開発者ツールで実行
localStorage.removeItem("tutorial_completed");
```

#### ネイティブデバイス

- **iOS**: 設定 > 一般 > ストレージ > アプリを削除して再インストール
- **Android**: 設定 > アプリ > Gotoshisha > ストレージ > データを削除

### 3. 開発時の便利なリセット方法

#### Metro bundler でのリセット

```bash
# アプリをリロード + SecureStore クリア
# React Native Debugger で以下を実行
import * as SecureStore from 'expo-secure-store';
// 注意: SecureStore には clear() メソッドがないため、個別に削除する必要があります
SecureStore.deleteItemAsync('tutorial_completed')
```

#### Expo での完全リセット

```bash
# Expo キャッシュクリア
npx expo start --clear

# または
pnpm start:clear
```

## デバッグ用コンポーネントの作成

### `app/components/TutorialDebug.tsx`

```typescript
import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import {
  isTutorialCompleted,
  resetTutorialStatus,
  setTutorialCompleted,
} from "../utils/tutorial/storage";

export const TutorialDebug: React.FC = () => {
  const checkStatus = async () => {
    const completed = await isTutorialCompleted();
    Alert.alert("チュートリアル状態", completed ? "完了済み" : "未完了");
  };

  const resetTutorial = async () => {
    await resetTutorialStatus();
    Alert.alert("成功", "チュートリアルをリセットしました");
  };

  const completeTutorial = async () => {
    await setTutorialCompleted();
    Alert.alert("成功", "チュートリアルを完了状態にしました");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>チュートリアルデバッグ</Text>
      <TouchableOpacity style={styles.button} onPress={checkStatus}>
        <Text style={styles.buttonText}>状態確認</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetTutorial}>
        <Text style={styles.buttonText}>リセット</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={completeTutorial}>
        <Text style={styles.buttonText}>完了状態にする</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
```

### デバッグコンポーネントの使用方法

開発環境でのみ表示する場合：

```typescript
// app/index.tsx または任意のコンポーネント
import { TutorialDebug } from "./components/TutorialDebug";

// 開発環境でのみ表示
{
  __DEV__ && <TutorialDebug />;
}
```

## トラブルシューティング

### チュートリアルが表示されない

1. ストレージの値を確認: `tutorial_completed` が `"true"` になっていないか
   - ネイティブ: SecureStore.getItemAsync('tutorial_completed')
   - Web: localStorage.getItem('tutorial_completed')
2. 認証状態を確認: ログイン完了後に表示される
3. コンソールログでエラーをチェック

### チュートリアルが毎回表示される

1. `setTutorialCompleted()` が正常に呼ばれているか確認
2. ストレージの書き込み権限を確認
   - ネイティブ: SecureStore の権限
   - Web: localStorage の利用可能性
3. プラットフォーム別のストレージ動作を確認

### リセットが効かない

1. アプリの完全再起動を試す
2. ストレージの値が実際に削除されているか確認
   - ネイティブ: SecureStore.getItemAsync('tutorial_completed') が null を返すか
   - Web: localStorage.getItem('tutorial_completed') が null を返すか
3. キャッシュクリアを試す

## 注意点

- **本番環境**: デバッグ用のリセット機能は本番ビルドに含めないこと
- **テスト**: E2E テストではチュートリアル状態のリセットを忘れずに
- **プライバシー**: ユーザーがアプリを削除・再インストールした場合、チュートリアルは再表示される

## 関連ファイル

- `app/utils/tutorial/storage.ts` - チュートリアル状態管理（ネイティブ）
- `app/utils/tutorial/storage.web.ts` - チュートリアル状態管理（Web）
- `app/components/Tutorial.tsx` - チュートリアル画面
- `app/index.tsx` - チュートリアル表示制御
- `docs/tutorial-management.md` - このドキュメント
