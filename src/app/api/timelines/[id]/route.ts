import { NextRequest, NextResponse } from "next/server";
import { getTimelineById } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const timeline = await getTimelineById(id);

    if (!timeline) {
      return NextResponse.json({ error: "見つかりませんでした" }, { status: 404 });
    }

    return NextResponse.json(timeline);
  } catch (err) {
    console.error("年表の取得に失敗しました:", err);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}
