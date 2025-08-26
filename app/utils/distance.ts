/**
 * 2点間の距離計算ユーティリティ
 */

/**
 * 2点間のハーバーサイン距離（キロメートル）を計算する
 * @param lat1 緯度1
 * @param lon1 経度1
 * @param lat2 緯度2
 * @param lon2 経度2
 * @returns キロメートル単位の距離
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // 地球の半径（キロメートル）
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 度をラジアンに変換する
 * @param degrees 度
 * @returns ラジアン
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * 現在位置から最も近い店舗を見つける
 * @param userLat ユーザーの緯度
 * @param userLon ユーザーの経度
 * @param shops 店舗リスト
 * @returns 最も近い店舗、またはnull
 */
export function findNearestShop<
  T extends { latitude?: number | null; longitude?: number | null }
>(userLat: number, userLon: number, shops: T[]): T | null {
  if (shops.length === 0) return null;

  let nearestShop = null;
  let minDistance = Infinity;

  for (const shop of shops) {
    if (shop.latitude == null || shop.longitude == null) continue;

    const distance = calculateDistance(
      userLat,
      userLon,
      shop.latitude,
      shop.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestShop = shop;
    }
  }

  return nearestShop;
}
