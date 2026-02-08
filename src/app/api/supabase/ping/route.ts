import { NextResponse } from "next/server";

import { createSupabaseClient } from "@/lib/supabase/client";
import type { SupabasePingResponse } from "@/types/api";

export async function GET() {
  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      const body: SupabasePingResponse = {
        ok: false,
        hasSession: false,
        error: error.message,
      };

      return NextResponse.json(body, { status: 500 });
    }

    const body: SupabasePingResponse = {
      ok: true,
      hasSession: Boolean(data.session),
    };

    return NextResponse.json(body);
  } catch (error) {
    const body: SupabasePingResponse = {
      ok: false,
      hasSession: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(body, { status: 500 });
  }
}
