-- D1用マイグレーション: ユーザーテーブルにbio列を追加
-- 作成日: 2025-06-27

-- bioフィールドをusersテーブルに追加
ALTER TABLE users ADD COLUMN bio TEXT;
