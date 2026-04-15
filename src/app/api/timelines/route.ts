import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import type { Answer } from "@/lib/types";

export const runtime = "nodejs";

// POST /api/timelines - 年表を保存してIDを返す
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, answers } = body as { name: string; answers: Answer[] };

    if (!name || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "nameとanswersは必須です" }, { status: 400 });
    }

    const id = nanoid();
    const db = await getDB();

    await db
      .prepare("INSERT INTO timelines (id, name, answers) VALUES (?, ?, ?)")
      .bind(id, name, JSON.stringify(answers))
      .run();

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("年表の保存に失敗しました:", err);
    return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
  }
}
