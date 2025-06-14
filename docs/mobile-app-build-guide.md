# GoToShisha モバイルアプリ ビルド＆実機確認ガイド

このドキュメントでは、GoToShisha アプリを iOS と Android の実機でテストするための手順を説明します。

## 目次

1. [事前準備](#事前準備)
2. [iOS 実機ビルド手順](#ios実機ビルド手順)
3. [Android 実機ビルド手順](#android実機ビルド手順)
4. [トラブルシューティング](#トラブルシューティング)

## 事前準備

### 必要なツール

- **Node.js** (v18 以上)
- **pnpm** パッケージマネージャー
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** (`npm install -g eas-cli`)
- **Git**

### アカウント要件

- **Expo アカウント**: https://expo.dev でアカウント作成
- **Apple Developer アカウント** (iOS 向け): 年額$99
- **Google Play Console アカウント** (Android 向け): 初回$25

### 初期セットアップ

```bash
# プロジェクトのクローン
git clone [repository-url]
cd gotoshisha

# 依存関係のインストール
pnpm install

# Expoアカウントにログイン
expo login

# EASアカウントにログイン
eas login

# EASプロジェクトの初期化
eas build:configure
```

## iOS 実機ビルド手順

### 1. Apple Developer 設定

1. [Apple Developer Portal](https://developer.apple.com)にログイン
2. Certificates, Identifiers & Profiles セクションへ移動
3. App ID を作成:
   - **Bundle ID**: `com.dirtyman69.exporeactnativemapsdemo`
   - **Capabilities**: Push Notifications, Sign in with Apple (必要に応じて)

### 2. 開発用ビルド（Development Build）

```bash
# 開発用ビルド作成
eas build --platform ios --profile development

# または、ローカルでビルド（Xcodeが必要）
eas build --platform ios --profile development --local
```

### 3. TestFlight での配布（本番テスト用）

```bash
# 本番ビルド作成
eas build --platform ios --profile production

# App Store Connectへのアップロード
eas submit --platform ios
```

### 4. 実機へのインストール

#### 開発ビルドの場合：

1. ビルド完了後、Expo ダッシュボードからビルドをダウンロード
2. デバイスを Mac に接続
3. Xcode を開き、Window → Devices and Simulators
4. .ipa ファイルをデバイスにドラッグ＆ドロップ

#### TestFlight の場合：

1. App Store Connect で TestFlight を設定
2. テスターを招待
3. TestFlight アプリから招待を受諾してインストール

### 5. 実機でのデバッグ

```bash
# 開発サーバー起動
pnpm start

# QRコードをExpo Goアプリでスキャン
# または、開発ビルドの場合は直接アプリを起動
```

## Android 実機ビルド手順

### 1. 署名キーの生成

```bash
# EASで自動生成（推奨）
eas credentials

# または手動で生成
keytool -genkey -v -keystore gotoshisha.keystore -alias gotoshisha -keyalg RSA -keysize 2048 -validity 10000
```

### 2. 開発用ビルド（Development Build）

```bash
# APKビルド（すべてのデバイス対応）
eas build --platform android --profile development

# AABビルド（Google Play用）
eas build --platform android --profile production
```

### 3. 実機へのインストール

#### APK の場合：

1. ビルド完了後、Expo ダッシュボードから APK をダウンロード
2. 以下のいずれかの方法でインストール：

**方法 1: adb コマンド**

```bash
# USBデバッグを有効化した端末を接続
adb install gotoshisha.apk
```

**方法 2: ファイル転送**

1. APK ファイルを端末に転送（メール、Google Drive 等）
2. 端末の設定 → セキュリティ → 提供元不明のアプリを許可
3. ファイルマネージャーから APK をタップしてインストール

**方法 3: QR コード経由**

```bash
# Expo CLIでQRコードを生成
expo publish
# 表示されたQRコードをExpo Goアプリでスキャン
```

### 4. Google Play での配布

```bash
# AABファイルをビルド
eas build --platform android --profile production

# Google Play Consoleへのアップロード
eas submit --platform android
```

### 5. 実機でのデバッグ

```bash
# 開発サーバー起動
pnpm start

# Android端末でExpo Goアプリを開き、QRコードをスキャン
# または開発ビルドの場合はアプリを直接起動
```

## ビルド設定ファイル

### eas.json

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": false
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Auth0 設定の注意点

実機ビルド時は、Auth0 のコールバック URL に以下を追加する必要があります：

### iOS

```
gotoshisha://redirect
com.dirtyman69.exporeactnativemapsdemo://redirect
```

### Android

```
gotoshisha://redirect
com.dirtyman69.exporeactnativemapsdemo://redirect
https://auth.expo.io/@dirtyman69/exporeactnativemapsdemo/redirect
```

## よくある注意点

### iOS

- **証明書の有効期限**: 開発証明書は 1 年で期限切れになります
- **デバイス登録**: 開発ビルドは登録されたデバイスでのみ動作します
- **バンドル ID**: app.json の bundleIdentifier と一致させる必要があります

### Android

- **最小 API レベル**: Android 6.0 (API 23)以上が必要
- **64 ビット対応**: Google Play は 64 ビット対応が必須です
- **ProGuard**: 本番ビルドでは難読化が有効になります

## トラブルシューティング

### ビルドエラー

**「ビルドがタイムアウトしました」**

```bash
# ローカルビルドを試す
eas build --platform [ios/android] --local
```

**「証明書が見つかりません」**

```bash
# 証明書をリセット
eas credentials --platform ios
```

### 実機での問題

**「アプリがクラッシュする」**

```bash
# ログを確認
# iOS
xcrun simctl spawn booted log stream --level debug | grep gotoshisha

# Android
adb logcat | grep gotoshisha
```

**「ネットワーク接続エラー」**

- 開発サーバーの IP アドレスが正しいか確認
- ファイアウォール設定を確認
- 実機と開発マシンが同じネットワークにあるか確認

### デバッグツール

**React Native Debugger**

```bash
# インストール
brew install react-native-debugger

# 起動
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

**Flipper**

```bash
# インストール
brew install flipper

# React Native設定
npx react-native-flipper
```

## 本番リリース前チェックリスト

- [ ] すべての環境変数が本番用に設定されている
- [ ] API エンドポイントが本番 URL を指している
- [ ] Auth0 の本番設定が完了している
- [ ] アプリアイコンとスプラッシュスクリーンが設定されている
- [ ] バージョン番号が更新されている
- [ ] プライバシーポリシーと利用規約の URL が設定されている
- [ ] アプリストアの説明文とスクリーンショットが準備されている
- [ ] クラッシュレポートツール（Sentry 等）が設定されている

## 参考リンク

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Android Developer Documentation](https://developer.android.com/docs)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
