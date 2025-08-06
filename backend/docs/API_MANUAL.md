# Gotoshisha API マニュアル

## 概要

Gotoshisha API は、シーシャ店舗情報を管理する RESTful API です。Cloudflare Workers 上で動作し、D1 データベースを使用しています。

## ベース URL

- **開発環境**: `https://shisha-up.shisha-up.workers.dev`
- **本番環境**: `https://api.gotoshisha.app` (予定)

## 認証

現在、ほとんどの GET エンドポイントは認証不要です。POST/PUT/DELETE には認証が必要です。

## エンドポイント一覧

### システム関連

#### ヘルスチェック

```http
GET /health
```

**レスポンス例:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-08-04T10:14:10.801Z",
    "environment": "development",
    "database": "connected"
  }
}
```

#### API 情報

```http
GET /api
```

**レスポンス例:**

```json
{
  "success": true,
  "data": {
    "message": "Gotoshisha API",
    "version": "1.0.0",
    "environment": "development",
    "endpoints": {
      "health": "/health",
      "shops": "/api/shops",
      "profile": "/api/profile",
      "users": "/api/users",
      "posts": "/api/posts",
      "comments": "/api/comments",
      "tags": "/api/tags",
      "likes": "/api/likes"
    }
  }
}
```

### シーシャ店舗関連

#### 店舗一覧取得

```http
GET /api/shops
```

**クエリパラメータ:**

- `page` (optional): ページ番号 (デフォルト: 1)
- `limit` (optional): 1 ページあたりの件数 (デフォルト: 20, 最大: 100)
- `search` (optional): 検索キーワード (店舗名、住所、最寄り駅)
- `latitude` (optional): 緯度 (-90 ~ 90)
- `longitude` (optional): 経度 (-180 ~ 180)
- `radius` (optional): 検索半径 (km 単位)
- `budgetMin` (optional): 予算下限 (円)
- `budgetMax` (optional): 予算上限 (円)
- `wifi` (optional): Wi-Fi 有無 (true/false)
- `powerOutlet` (optional): 電源コンセント有無 (true/false)
- `privateBooking` (optional): 貸切可否 (true/false)
- `reservation` (optional): 予約の必要性 ("REQUIRED" | "RECOMMENDED" | "NOT_REQUIRED")
- `smokingPolicy` (optional): 喫煙ポリシー ("SMOKING_ALLOWED" | "SEPARATED" | "NON_SMOKING")
- `sortBy` (optional): ソート項目 ("createdAt" | "updatedAt" | "name" | "budgetMin")
- `sortOrder` (optional): ソート順 ("asc" | "desc")

**使用例:**

```bash
# 基本的な店舗一覧取得
curl "https://shisha-up.shisha-up.workers.dev/api/shops"

# ページネーション
curl "https://shisha-up.shisha-up.workers.dev/api/shops?page=1&limit=10"

# 位置情報で検索（渋谷駅周辺2km以内）
curl "https://shisha-up.shisha-up.workers.dev/api/shops?latitude=35.6598&longitude=139.7006&radius=2"

# Wi-Fiありの店舗のみ
curl "https://shisha-up.shisha-up.workers.dev/api/shops?wifi=true"

# 検索キーワード
curl "https://shisha-up.shisha-up.workers.dev/api/shops?search=渋谷"
```

**成功レスポンス例:**

```json
{
  "success": true,
  "data": {
    "shops": [
      {
        "id": "shop001",
        "name": "シーシャカフェ 渋谷店",
        "address": "東京都渋谷区渋谷1-2-3 シーシャビル2F",
        "latitude": 35.6598,
        "longitude": 139.7006,
        "nearestStation": null,
        "stationWalkTime": null,
        "openingHours": null,
        "holidays": null,
        "budgetMin": null,
        "budgetMax": null,
        "seatingCount": null,
        "privateBooking": false,
        "wifi": false,
        "powerOutlet": false,
        "smokingPolicy": null,
        "createdAt": "2025-08-04T10:10:15.000Z",
        "updatedAt": "2025-08-04T10:10:15.000Z",
        "flavors": [],
        "atmospheres": [],
        "hobbies": [],
        "paymentMethods": [],
        "events": [],
        "reviewCount": 0
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3,
      "totalPages": 1
    }
  }
}
```

#### 店舗詳細取得

```http
GET /api/shops/{id}
```

**使用例:**

```bash
curl "https://shisha-up.shisha-up.workers.dev/api/shops/shop001"
```

**成功レスポンス例:**

```json
{
  "success": true,
  "data": {
    "id": "shop001",
    "name": "シーシャカフェ 渋谷店",
    "address": "東京都渋谷区渋谷1-2-3 シーシャビル2F",
    "latitude": 35.6598,
    "longitude": 139.7006,
    "nearestStation": null,
    "stationWalkTime": null,
    "openingHours": null,
    "holidays": null,
    "budgetMin": null,
    "budgetMax": null,
    "seatingCount": null,
    "privateBooking": false,
    "wifi": false,
    "powerOutlet": false,
    "smokingPolicy": null,
    "createdAt": "2025-08-04T10:10:15.000Z",
    "updatedAt": "2025-08-04T10:10:15.000Z",
    "flavors": [],
    "atmospheres": [],
    "hobbies": [],
    "paymentMethods": [],
    "events": [],
    "reviews": [],
    "reviewCount": 0,
    "averageRating": null
  }
}
```

#### 店舗作成 (認証必要)

```http
POST /api/shops
```

**リクエストボディ例:**

```json
{
  "name": "新しいシーシャ店",
  "address": "東京都新宿区新宿1-1-1",
  "latitude": 35.6896,
  "longitude": 139.7006,
  "nearestStation": "新宿駅",
  "stationWalkTime": 3,
  "budgetMin": 1000,
  "budgetMax": 3000,
  "wifi": true,
  "powerOutlet": true,
  "privateBooking": false
}
```

**使用例:**

```bash
curl -X POST "https://shisha-up.shisha-up.workers.dev/api/shops" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "新しいシーシャ店",
    "address": "東京都新宿区新宿1-1-1",
    "latitude": 35.6896,
    "longitude": 139.7006
  }'
```

#### 店舗更新 (認証必要)

```http
PUT /api/shops/{id}
```

#### 店舗削除 (認証必要)

```http
DELETE /api/shops/{id}
```

### デバッグ用エンドポイント

#### シンプルな店舗一覧取得（デバッグ用）

```http
GET /test/shops
```

**使用例:**

```bash
curl "https://shisha-up.shisha-up.workers.dev/test/shops"
```

**レスポンス例:**

```json
{
  "success": true,
  "data": [
    {
      "id": "shop001",
      "name": "シーシャカフェ 渋谷店",
      "address": "東京都渋谷区渋谷1-2-3 シーシャビル2F",
      "latitude": 35.6598,
      "longitude": 139.7006,
      "createdAt": "2025-08-04T10:10:15.000Z",
      "updatedAt": "2025-08-04T10:10:15.000Z"
    }
  ],
  "count": 3
}
```

## エラーレスポンス

すべてのエラーレスポンスは以下の形式で返されます：

```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

### よくあるエラー

- **400 Bad Request**: リクエストパラメータが不正
- **401 Unauthorized**: 認証が必要
- **404 Not Found**: リソースが見つからない
- **500 Internal Server Error**: サーバー内部エラー

## 使用例集

### curl を使った基本的な操作

```bash
# ヘルスチェック
curl "https://shisha-up.shisha-up.workers.dev/health"

# 全店舗取得
curl "https://shisha-up.shisha-up.workers.dev/api/shops"

# 特定店舗の詳細
curl "https://shisha-up.shisha-up.workers.dev/api/shops/shop001"

# 位置情報で検索
curl "https://shisha-up.shisha-up.workers.dev/api/shops?latitude=35.6598&longitude=139.7006&radius=5"

# 条件を組み合わせた検索
curl "https://shisha-up.shisha-up.workers.dev/api/shops?wifi=true&budgetMax=2000&limit=5"
```

### JavaScript/TypeScript での使用例

```typescript
// 店舗一覧取得
const response = await fetch(
  "https://shisha-up.shisha-up.workers.dev/api/shops?page=1&limit=10"
);
const data = await response.json();

if (data.success) {
  console.log("店舗一覧:", data.data.shops);
} else {
  console.error("エラー:", data.error);
}

// 位置情報で検索
const searchNearby = async (lat: number, lng: number, radius: number) => {
  const url = new URL("https://shisha-up.shisha-up.workers.dev/api/shops");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lng.toString());
  url.searchParams.set("radius", radius.toString());

  const response = await fetch(url.toString());
  return await response.json();
};
```

## レート制限

現在、特別なレート制限は設定されていませんが、過度なリクエストは避けてください。

## サポート

API に関する質問やバグ報告は、プロジェクトの Issue ページで受け付けています。

## 更新履歴

- **v1.0.0** (2025-08-04): 初版リリース
  - 基本的な店舗 CRUD 操作
  - 位置情報検索機能
  - ページネーション対応
