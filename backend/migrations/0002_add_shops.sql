-- シーシャ店舗関連テーブル作成マイグレーション
-- 作成日: 2025-06-28

-- シーシャ店舗テーブル
CREATE TABLE shops (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    nearestStation TEXT,
    stationWalkTime INTEGER,
    openingHours TEXT,
    holidays TEXT,
    budgetMin INTEGER,
    budgetMax INTEGER,
    seatingCount INTEGER,
    seatingTypes TEXT,
    reservation TEXT,
    privateBooking INTEGER DEFAULT 0,
    wifi INTEGER DEFAULT 0,
    powerOutlet INTEGER DEFAULT 0,
    smokingPolicy TEXT,
    parkingInfo TEXT,
    timeLimit TEXT,
    hookahBrand TEXT,
    flavorCount INTEGER,
    photos TEXT,
    websiteUrl TEXT,
    googleMapUrl TEXT,
    snsLinks TEXT,
    latitude REAL,
    longitude REAL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- フレーバーマスタテーブル
CREATE TABLE flavors (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- 雰囲気マスタテーブル
CREATE TABLE atmospheres (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- ホビーマスタテーブル
CREATE TABLE hobbies (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- 支払い方法マスタテーブル
CREATE TABLE payment_methods (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- イベントマスタテーブル
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    schedule TEXT
);

-- 店舗⇔フレーバー中間テーブル
CREATE TABLE shop_flavors (
    shopId TEXT NOT NULL,
    flavorId TEXT NOT NULL,
    PRIMARY KEY (shopId, flavorId),
    FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (flavorId) REFERENCES flavors(id) ON DELETE CASCADE
);

-- 店舗⇔雰囲気中間テーブル
CREATE TABLE shop_atmospheres (
    shopId TEXT NOT NULL,
    atmosphereId TEXT NOT NULL,
    PRIMARY KEY (shopId, atmosphereId),
    FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (atmosphereId) REFERENCES atmospheres(id) ON DELETE CASCADE
);

-- 店舗⇔ホビー中間テーブル
CREATE TABLE shop_hobbies (
    shopId TEXT NOT NULL,
    hobbyId TEXT NOT NULL,
    PRIMARY KEY (shopId, hobbyId),
    FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (hobbyId) REFERENCES hobbies(id) ON DELETE CASCADE
);

-- 店舗⇔支払い方法中間テーブル
CREATE TABLE shop_payment_methods (
    shopId TEXT NOT NULL,
    paymentMethodId TEXT NOT NULL,
    PRIMARY KEY (shopId, paymentMethodId),
    FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (paymentMethodId) REFERENCES payment_methods(id) ON DELETE CASCADE
);

-- 店舗⇔イベント中間テーブル
CREATE TABLE shop_events (
    shopId TEXT NOT NULL,
    eventId TEXT NOT NULL,
    PRIMARY KEY (shopId, eventId),
    FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE
);

-- レビューテーブル
CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    shopId TEXT NOT NULL,
    userId TEXT,
    ratingTaste REAL,
    ratingAtmosphere REAL,
    ratingService REAL,
    ratingValue REAL,
    comment TEXT,
    tags TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shopId) REFERENCES shops(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

-- インデックスの作成
CREATE INDEX idx_shops_location ON shops(latitude, longitude);
CREATE INDEX idx_shops_createdAt ON shops(createdAt);
CREATE INDEX idx_shops_name ON shops(name);
CREATE INDEX idx_reviews_shopId ON reviews(shopId);
CREATE INDEX idx_reviews_userId ON reviews(userId);
CREATE INDEX idx_reviews_createdAt ON reviews(createdAt);
CREATE INDEX idx_shop_flavors_shopId ON shop_flavors(shopId);
CREATE INDEX idx_shop_flavors_flavorId ON shop_flavors(flavorId);
CREATE INDEX idx_shop_atmospheres_shopId ON shop_atmospheres(shopId);
CREATE INDEX idx_shop_atmospheres_atmosphereId ON shop_atmospheres(atmosphereId);
CREATE INDEX idx_shop_hobbies_shopId ON shop_hobbies(shopId);
CREATE INDEX idx_shop_hobbies_hobbyId ON shop_hobbies(hobbyId);
CREATE INDEX idx_shop_payment_methods_shopId ON shop_payment_methods(shopId);
CREATE INDEX idx_shop_payment_methods_paymentMethodId ON shop_payment_methods(paymentMethodId);
CREATE INDEX idx_shop_events_shopId ON shop_events(shopId);
CREATE INDEX idx_shop_events_eventId ON shop_events(eventId);