import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Answer } from "./types";

export async function getDB() {
  const ctx = await getCloudflareContext({ async: true });
  return (ctx.env as { DB: D1Database }).DB;
}

// 年表データをIDで取得する共通関数
export async function getTimelineById(id: string) {
  const db = await getDB();
  const row = await db
    .prepare("SELECT id, name, answers, created_at FROM timelines WHERE id = ?")
    .bind(id)
    .first<{ id: string; name: string; answers: string; created_at: string }>();

  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    answers: JSON.parse(row.answers) as Answer[],
    createdAt: row.created_at,
  };
}
