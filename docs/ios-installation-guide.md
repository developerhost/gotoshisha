# iPhone実機インストール詳細ガイド

## 方法1: Expo Goアプリを使う（最も簡単）

### 手順：
1. iPhoneのApp Storeから「Expo Go」をインストール
2. プロジェクトディレクトリで開発サーバーを起動：
   ```bash
   pnpm start
   ```
3. 表示されたQRコードをiPhoneのカメラでスキャン
4. 「Expo Goで開く」をタップ

### 制限事項：
- カスタムネイティブコードは使用不可
- 一部のExpo SDKのみ利用可能
- 開発中のテストのみ（配布不可）

## 方法2: 開発ビルド（Development Build）を作成

### 必要なもの：
- Apple Developer Program（年額$99）への登録
- Mac（Xcodeが必要）

### 手順：

#### 1. EAS設定の初期化
```bash
# EASの初期化
eas build:configure

# iOSの開発プロファイルを選択
```

#### 2. デバイスの登録
```bash
# デバイスを登録
eas device:create

# QRコードが表示されるので、iPhoneでスキャン
# プロファイルをダウンロードしてインストール
```

#### 3. 開発ビルドの作成
```bash
# クラウドビルド
eas build --platform ios --profile development

# または、ローカルビルド（高速）
eas build --platform ios --profile development --local
```

#### 4. インストール方法

**方法A: OTA（Over The Air）インストール**
1. ビルド完了後、Expoダッシュボードでリンクを取得
2. iPhoneでリンクを開く
3. 「インストール」をタップ

**方法B: Xcodeを使用**
1. ビルドされた.ipaファイルをダウンロード
2. iPhoneをMacに接続
3. Xcodeを開く → Window → Devices and Simulators
4. 左側でiPhoneを選択
5. 「Installed Apps」セクションで「+」ボタンをクリック
6. .ipaファイルを選択

**方法C: Apple Configurator 2を使用**
1. Mac App Storeから「Apple Configurator 2」をインストール
2. iPhoneを接続
3. アプリをドラッグ＆ドロップ

## 方法3: TestFlight経由（最もプロフェッショナル）

### 手順：

#### 1. 本番ビルドの作成
```bash
eas build --platform ios --profile production
```

#### 2. App Store Connectへアップロード
```bash
eas submit --platform ios
```

#### 3. TestFlightの設定
1. [App Store Connect](https://appstoreconnect.apple.com)にログイン
2. 「マイApp」から該当アプリを選択
3. 「TestFlight」タブを選択
4. ビルドが処理されるまで待つ（通常15-30分）

#### 4. テスターの追加
- **内部テスター**：最大100名まで、審査不要
- **外部テスター**：最大10,000名まで、簡易審査あり

#### 5. インストール
1. iPhoneで「TestFlight」アプリをインストール
2. 招待メールのリンクをタップ
3. TestFlightでアプリをインストール

## 方法4: Ad Hoc配布（企業向け）

### 手順：

#### 1. Ad Hocプロファイルの作成
```bash
# eas.jsonに追加
{
  "build": {
    "adhoc": {
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  }
}
```

#### 2. ビルド
```bash
eas build --platform ios --profile adhoc
```

#### 3. 配布
- メール、Slack、社内ポータル等でリンクを共有
- デバイスは事前に登録が必要（最大100台）

## 簡易手順まとめ

### 今すぐテストしたい場合：
```bash
# 1. Expo Goを使う
pnpm start
# QRコードをスキャン
```

### 本格的にアプリとしてインストールしたい場合：
```bash
# 1. EAS CLIをインストール
npm install -g eas-cli

# 2. ログイン
eas login

# 3. プロジェクト設定
eas build:configure

# 4. デバイス登録
eas device:create

# 5. ビルド
eas build --platform ios --profile development

# 6. インストール
# ビルド完了後のリンクをiPhoneで開く
```

## トラブルシューティング

### 「信頼されていないデベロッパ」エラー
1. 設定 → 一般 → VPNとデバイス管理
2. デベロッパAPPの項目から該当の証明書を選択
3. 「信頼」をタップ

### インストールできない
- デバイスのUDIDが登録されているか確認
- プロビジョニングプロファイルが正しいか確認
- iOSバージョンが対応しているか確認

### ビルドエラー
```bash
# キャッシュクリア
eas build --clear-cache --platform ios

# ローカルでデバッグ
eas build --platform ios --local
```

## 推奨される開発フロー

1. **開発初期**: Expo Goで基本機能をテスト
2. **中期**: Development Buildで実機テスト
3. **リリース前**: TestFlightで広範囲テスト
4. **本番**: App Storeへ提出

これらの方法から、あなたの状況に最適なものを選んでください。最も簡単に始めるなら、まずExpo Goから試すことをお勧めします。