-- 年表データテーブル
CREATE TABLE IF NOT EXISTS timelines (
  id TEXT PRIMARY KEY,                           -- nanoid（21文字）
  name TEXT NOT NULL,                            -- ユーザー名
  answers TEXT NOT NULL,                         -- 回答データ（JSON文字列）
  created_at TEXT DEFAULT (datetime('now'))       -- 作成日時
);
