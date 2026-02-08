import { NextResponse } from "next/server";

import type { HealthResponse } from "@/types/api";

export async function GET() {
  const body: HealthResponse = { status: "ok" };

  return NextResponse.json(body);
}
