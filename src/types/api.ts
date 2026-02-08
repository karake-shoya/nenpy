export type HealthResponse = {
  status: "ok";
};

export type SupabasePingResponse = {
  ok: boolean;
  hasSession: boolean;
  error?: string;
};
