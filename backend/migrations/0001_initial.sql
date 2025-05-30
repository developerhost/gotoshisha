-- Cloudflare D1用の初期マイグレーション
-- 作成日: 2025-05-29

-- ユーザーテーブル
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 投稿テーブル
CREATE TABLE posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    imageUrl TEXT,
    latitude REAL,
    longitude REAL,
    address TEXT,
    isPublic INTEGER DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    authorId TEXT NOT NULL,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);

-- いいねテーブル
CREATE TABLE likes (
    id TEXT PRIMARY KEY,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId TEXT NOT NULL,
    postId TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(userId, postId)
);

-- コメントテーブル
CREATE TABLE comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId TEXT NOT NULL,
    postId TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- タグテーブル
CREATE TABLE tags (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    color TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 投稿とタグの中間テーブル
CREATE TABLE post_tags (
    id TEXT PRIMARY KEY,
    postId TEXT NOT NULL,
    tagId TEXT NOT NULL,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(postId, tagId)
);

-- インデックスの作成
CREATE INDEX idx_posts_authorId ON posts(authorId);
CREATE INDEX idx_posts_createdAt ON posts(createdAt);
CREATE INDEX idx_posts_location ON posts(latitude, longitude);
CREATE INDEX idx_likes_userId ON likes(userId);
CREATE INDEX idx_likes_postId ON likes(postId);
CREATE INDEX idx_comments_userId ON comments(userId);
CREATE INDEX idx_comments_postId ON comments(postId);
CREATE INDEX idx_post_tags_postId ON post_tags(postId);
CREATE INDEX idx_post_tags_tagId ON post_tags(tagId);
