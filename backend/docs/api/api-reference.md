# API リファレンス

## 概要

Gotoshisha アプリケーションの REST API リファレンスです。すべての API は JSON 形式でデータを送受信します。

## ベース URL

```
# 開発環境
http://localhost:8787

# 本番環境
https://shisha-up.shisha-up.workers.dev
```

## 認証

認証が必要なエンドポイントには、HTTP ヘッダーに Bearer トークンを含める必要があります：

```
Authorization: Bearer <your-jwt-token>
```

## エラーレスポンス

エラーが発生した場合、以下の形式でレスポンスが返されます：

```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

### HTTP ステータスコード

- `200` - 成功
- `201` - 作成成功
- `400` - リクエストエラー
- `401` - 認証エラー
- `403` - 認可エラー
- `404` - リソースが見つからない
- `409` - 競合エラー
- `500` - サーバー内部エラー

## ヘルスチェック

### サービス稼働確認

サービスとデータベースの稼働状態を確認します。

```
GET /health
```

#### レスポンス例

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "environment": "production",
    "database": "connected"
  }
}
```

## 店舗 API

### 店舗一覧取得

店舗の一覧を取得します。位置情報、キーワード、各種条件でフィルタリングできます。

```
GET /api/shops
```

#### クエリパラメータ

| パラメータ       | 型      | 必須 | デフォルト | 説明                                                        |
| ---------------- | ------- | ---- | ---------- | ----------------------------------------------------------- |
| `page`           | number  | ✕    | 1          | ページ番号                                                  |
| `limit`          | number  | ✕    | 20         | 取得件数（最大 100）                                        |
| `search`         | string  | ✕    | -          | キーワード検索（店舗名、住所、最寄り駅）                    |
| `latitude`       | number  | ✕    | -          | 緯度（位置情報検索用）                                      |
| `longitude`      | number  | ✕    | -          | 経度（位置情報検索用）                                      |
| `radius`         | number  | ✕    | -          | 検索半径（km）                                              |
| `budgetMin`      | number  | ✕    | -          | 予算下限（円）                                              |
| `budgetMax`      | number  | ✕    | -          | 予算上限（円）                                              |
| `wifi`           | boolean | ✕    | -          | Wi-Fi 有無                                                  |
| `powerOutlet`    | boolean | ✕    | -          | 電源コンセント有無                                          |
| `privateBooking` | boolean | ✕    | -          | 貸切可否                                                    |
| `reservation`    | string  | ✕    | -          | 予約可否（`REQUIRED`/`RECOMMENDED`/`NOT_REQUIRED`）         |
| `smokingPolicy`  | string  | ✕    | -          | 喫煙ポリシー（`SMOKING_ALLOWED`/`SEPARATED`/`NON_SMOKING`） |
| `sortBy`         | string  | ✕    | createdAt  | ソート項目                                                  |
| `sortOrder`      | string  | ✕    | desc       | ソート順（`asc`/`desc`）                                    |

#### レスポンス例

```json
{
  "success": true,
  "data": {
    "shops": [
      {
        "id": "shop_123",
        "name": "シーシャカフェ東京",
        "address": "東京都渋谷区渋谷1-1-1",
        "nearestStation": "渋谷駅",
        "stationWalkTime": 5,
        "latitude": 35.658584,
        "longitude": 139.701742,
        "budgetMin": 2000,
        "budgetMax": 4000,
        "wifi": true,
        "powerOutlet": true,
        "privateBooking": false,
        "reservation": "RECOMMENDED",
        "smokingPolicy": "SMOKING_ALLOWED",
        "reviewCount": 15,
        "flavors": [
          {
            "id": "flavor_1",
            "name": "ダブルアップル"
          }
        ],
        "atmospheres": [
          {
            "id": "atmosphere_1",
            "name": "カジュアル"
          }
        ],
        "distance": 1.2,
        "createdAt": "2024-01-01T12:00:00.000Z",
        "updatedAt": "2024-01-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

### 店舗詳細取得

特定の店舗の詳細情報を取得します。

```
GET /api/shops/{id}
```

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明    |
| ---------- | ------ | ---- | ------- |
| `id`       | string | ◯    | 店舗 ID |

#### レスポンス例

```json
{
  "success": true,
  "data": {
    "id": "shop_123",
    "name": "シーシャカフェ東京",
    "address": "東京都渋谷区渋谷1-1-1",
    "nearestStation": "渋谷駅",
    "stationWalkTime": 5,
    "openingHours": "11:00-23:00",
    "holidays": "年中無休",
    "budgetMin": 2000,
    "budgetMax": 4000,
    "seatingCount": 20,
    "seatingTypes": "ソファ席、カウンター席",
    "reservation": "RECOMMENDED",
    "privateBooking": false,
    "wifi": true,
    "powerOutlet": true,
    "smokingPolicy": "SMOKING_ALLOWED",
    "parkingInfo": "近隣にコインパーキングあり",
    "timeLimit": "3時間制",
    "hookahBrand": "Khalil Mamoon",
    "flavorCount": 50,
    "photos": ["https://example.com/photo1.jpg"],
    "websiteUrl": "https://example.com",
    "googleMapUrl": "https://maps.google.com/...",
    "snsLinks": {
      "instagram": "https://instagram.com/...",
      "twitter": "https://twitter.com/..."
    },
    "latitude": 35.658584,
    "longitude": 139.701742,
    "reviewCount": 15,
    "averageRating": {
      "taste": 4.2,
      "atmosphere": 4.5,
      "service": 4.0,
      "value": 3.8
    },
    "flavors": [
      {
        "id": "flavor_1",
        "name": "ダブルアップル"
      },
      {
        "id": "flavor_2",
        "name": "ミント"
      }
    ],
    "atmospheres": [
      {
        "id": "atmosphere_1",
        "name": "カジュアル"
      }
    ],
    "hobbies": [
      {
        "id": "hobby_1",
        "name": "読書"
      }
    ],
    "paymentMethods": [
      {
        "id": "payment_1",
        "name": "クレジットカード"
      },
      {
        "id": "payment_2",
        "name": "現金"
      }
    ],
    "events": [
      {
        "id": "event_1",
        "name": "ミュージックナイト",
        "description": "毎週金曜日はライブミュージック",
        "schedule": "毎週金曜日 20:00-"
      }
    ],
    "reviews": [
      {
        "id": "review_1",
        "ratingTaste": 4.0,
        "ratingAtmosphere": 5.0,
        "ratingService": 4.0,
        "ratingValue": 3.0,
        "comment": "雰囲気が良く、フレーバーも豊富でした。",
        "user": {
          "id": "user_1",
          "name": "田中太郎",
          "avatar": "https://example.com/avatar.jpg"
        },
        "createdAt": "2024-01-01T12:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 店舗作成

新しい店舗を作成します。

```
POST /api/shops
```

**認証必須**

#### リクエストボディ

```json
{
  "name": "シーシャカフェ新宿",
  "address": "東京都新宿区新宿1-1-1",
  "nearestStation": "新宿駅",
  "stationWalkTime": 3,
  "openingHours": "12:00-24:00",
  "holidays": "年中無休",
  "budgetMin": 1500,
  "budgetMax": 3500,
  "seatingCount": 15,
  "reservation": "NOT_REQUIRED",
  "wifi": true,
  "powerOutlet": false,
  "latitude": 35.689487,
  "longitude": 139.691711
}
```

#### レスポンス例

```json
{
  "success": true,
  "data": {
    "id": "shop_124",
    "name": "シーシャカフェ新宿",
    "address": "東京都新宿区新宿1-1-1",
    "nearestStation": "新宿駅",
    "stationWalkTime": 3,
    "latitude": 35.689487,
    "longitude": 139.691711,
    "reviewCount": 0,
    "flavors": [],
    "atmospheres": [],
    "hobbies": [],
    "paymentMethods": [],
    "events": [],
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 店舗更新

既存の店舗情報を更新します。

```
PUT /api/shops/{id}
```

**認証必須**

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明    |
| ---------- | ------ | ---- | ------- |
| `id`       | string | ◯    | 店舗 ID |

#### リクエストボディ

店舗作成と同様ですが、すべてのフィールドが任意です。

#### レスポンス例

店舗詳細取得と同様の形式で更新された店舗情報を返します。

### 店舗削除

店舗を削除します。

```
DELETE /api/shops/{id}
```

**認証必須**

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明    |
| ---------- | ------ | ---- | ------- |
| `id`       | string | ◯    | 店舗 ID |

#### レスポンス例

```json
{
  "success": true,
  "message": "店舗を削除しました"
}
```

### 店舗関連要素追加

店舗にフレーバー、雰囲気、ホビー、支払い方法、イベントを追加します。

```
POST /api/shops/{id}/relations
```

**認証必須**

#### パスパラメータ

| パラメータ | 型     | 必須 | 説明    |
| ---------- | ------ | ---- | ------- |
| `id`       | string | ◯    | 店舗 ID |

#### リクエストボディ

以下のいずれか一つのフィールドを指定：

```json
{
  "shopId": "shop_123",
  "flavorId": "flavor_1"
}
```

または

```json
{
  "shopId": "shop_123",
  "atmosphereId": "atmosphere_1"
}
```

#### レスポンス例

```json
{
  "success": true,
  "message": "関連要素を追加しました"
}
```

### 店舗関連要素削除

店舗から関連要素を削除します。

```
DELETE /api/shops/{id}/relations
```

**認証必須**

#### パスパラメータ・リクエストボディ

追加と同様の形式

#### レスポンス例

```json
{
  "success": true,
  "message": "関連要素を削除しました"
}
```

## プロフィール API

### プロフィール取得

ログインユーザーのプロフィール情報を取得します。

```
GET /api/profile
```

**認証必須**

#### レスポンス例

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "田中太郎",
    "bio": "シーシャ愛好家です",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### プロフィール更新

ログインユーザーのプロフィール情報を更新します。

```
PUT /api/profile
```

**認証必須**

#### リクエストボディ

```json
{
  "name": "田中次郎",
  "bio": "シーシャとコーヒーが好きです"
}
```

#### レスポンス例

プロフィール取得と同様の形式で更新されたプロフィール情報を返します。

## 位置情報検索の例

### 東京駅周辺の店舗検索

```bash
curl "https://your-worker.workers.dev/api/shops?latitude=35.681236&longitude=139.767125&radius=5"
```

### 新宿駅周辺で Wi-Fi 完備の店舗検索

```bash
curl "https://your-worker.workers.dev/api/shops?latitude=35.689487&longitude=139.691711&radius=3&wifi=true"
```

### 予算 2000 円以下でフリー Wi-Fi ありの店舗検索

```bash
curl "https://your-worker.workers.dev/api/shops?budgetMax=2000&wifi=true&limit=10"
```

## データ型定義

### Shop（店舗）

```typescript
interface Shop {
  id: string;
  name: string;
  address: string;
  nearestStation?: string;
  stationWalkTime?: number;
  openingHours?: string;
  holidays?: string;
  budgetMin?: number;
  budgetMax?: number;
  seatingCount?: number;
  seatingTypes?: string;
  reservation?: "REQUIRED" | "RECOMMENDED" | "NOT_REQUIRED";
  privateBooking: boolean;
  wifi: boolean;
  powerOutlet: boolean;
  smokingPolicy?: "SMOKING_ALLOWED" | "SEPARATED" | "NON_SMOKING";
  parkingInfo?: string;
  timeLimit?: string;
  hookahBrand?: string;
  flavorCount?: number;
  photos?: string[];
  websiteUrl?: string;
  googleMapUrl?: string;
  snsLinks?: Record<string, string>;
  latitude?: number;
  longitude?: number;
  reviewCount: number;
  distance?: number; // 位置情報検索時のみ
  flavors: Flavor[];
  atmospheres: Atmosphere[];
  hobbies: Hobby[];
  paymentMethods: PaymentMethod[];
  events: Event[];
  reviews?: Review[];
  averageRating?: {
    taste: number;
    atmosphere: number;
    service: number;
    value: number;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Flavor（フレーバー）

```typescript
interface Flavor {
  id: string;
  name: string;
}
```

### Atmosphere（雰囲気）

```typescript
interface Atmosphere {
  id: string;
  name: string;
}
```

### Review（レビュー）

```typescript
interface Review {
  id: string;
  ratingTaste?: number;
  ratingAtmosphere?: number;
  ratingService?: number;
  ratingValue?: number;
  comment?: string;
  tags?: string[];
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

## レート制限

現在レート制限は実装されていませんが、将来的に以下の制限を設ける予定です：

- 認証なし: 100 リクエスト/分
- 認証あり: 1000 リクエスト/分

## SDK とライブラリ

TypeScript/JavaScript 用の API クライアントライブラリは `app/api/` ディレクトリに実装されています：

- `app/api/baseApi.ts` - ベース API クライアント
- `app/api/shopsApi.ts` - 店舗 API ラッパー
- `app/features/shop/useShops.ts` - React フック（React Query）
