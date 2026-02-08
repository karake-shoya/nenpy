import { createClient } from "@supabase/supabase-js";

function getRequiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    const message = `${name} is not set. Add it to .env.local.`;

    if (process.env.NODE_ENV === "development") {
      throw new Error(message);
    }

    throw new Error(message);
  }

  return value;
}

export function createSupabaseClient() {
  const supabaseUrl = getRequiredEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const supabaseAnonKey = getRequiredEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
