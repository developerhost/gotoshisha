-- 店舗の詳細情報を取得するクエリ
SELECT 
    s.id,
    s.name,
    s.address,
    s.nearestStation,
    s.budgetMin,
    s.budgetMax,
    s.wifi,
    s.powerOutlet,
    COUNT(DISTINCT sf.flavorId) as flavor_count_actual,
    GROUP_CONCAT(DISTINCT f.name) as available_flavors
FROM shops s
LEFT JOIN shop_flavors sf ON s.id = sf.shopId
LEFT JOIN flavors f ON sf.flavorId = f.id
GROUP BY s.id, s.name, s.address, s.nearestStation, s.budgetMin, s.budgetMax, s.wifi, s.powerOutlet
ORDER BY s.name;