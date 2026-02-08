"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { HealthResponse, SupabasePingResponse } from "@/types/api";

type ApiState<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
};

const initialHealthState: ApiState<HealthResponse> = {
  loading: false,
  data: null,
  error: null,
};

const initialPingState: ApiState<SupabasePingResponse> = {
  loading: false,
  data: null,
  error: null,
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const json = (await response.json()) as T & { error?: string };

  if (!response.ok) {
    throw new Error(json.error ?? `Request failed: ${response.status}`);
  }

  return json;
}

export function TemplateDashboard() {
  const [health, setHealth] = useState<ApiState<HealthResponse>>(initialHealthState);
  const [ping, setPing] = useState<ApiState<SupabasePingResponse>>(initialPingState);

  const runHealthCheck = async () => {
    setHealth({ loading: true, data: null, error: null });

    try {
      const data = await fetchJson<HealthResponse>("/api/health");
      setHealth({ loading: false, data, error: null });
    } catch (error) {
      setHealth({
        loading: false,
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const runSupabasePing = async () => {
    setPing({ loading: true, data: null, error: null });

    try {
      const data = await fetchJson<SupabasePingResponse>("/api/supabase/ping");
      setPing({ loading: false, data, error: null });
    } catch (error) {
      setPing({
        loading: false,
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <section className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">テンプレ起動できた</h1>
      <p className="text-sm text-muted-foreground">
        shadcn/ui と Supabase を含んだ Next.js テンプレートの最小動作確認ページです。
      </p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={runHealthCheck} disabled={health.loading}>
          {health.loading ? "Health確認中..." : "Health API を叩く"}
        </Button>
        <Button onClick={runSupabasePing} disabled={ping.loading} variant="secondary">
          {ping.loading ? "Ping確認中..." : "Supabase Ping を叩く"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border bg-muted/30 p-4">
          <h2 className="mb-2 text-sm font-medium">/api/health</h2>
          {health.error ? (
            <p className="text-sm text-destructive">error: {health.error}</p>
          ) : (
            <pre className="text-xs">{JSON.stringify(health.data, null, 2) || "未実行"}</pre>
          )}
        </article>

        <article className="rounded-lg border bg-muted/30 p-4">
          <h2 className="mb-2 text-sm font-medium">/api/supabase/ping</h2>
          {ping.error ? (
            <p className="text-sm text-destructive">error: {ping.error}</p>
          ) : (
            <pre className="text-xs">{JSON.stringify(ping.data, null, 2) || "未実行"}</pre>
          )}
        </article>
      </div>
    </section>
  );
}
