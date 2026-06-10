import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the public interest form.
 *
 * Uses the shared publishable (anon) key — the same one the other apps in the
 * monorepo use. The interest_submissions table has RLS enabled with an
 * insert-only policy for the anon role, so this client can add leads but
 * cannot read, update, or delete them. Imported only by the /api/interest
 * route handler (server-side); never shipped to the browser.
 */
type DynamicRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type DynamicTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: DynamicRelationship[];
};

type DynamicFunction = {
  Args: Record<string, unknown> | never;
  Returns: unknown;
};

type DynamicSchema = {
  Tables: Record<string, DynamicTable>;
  Views: Record<string, DynamicTable>;
  Functions: Record<string, DynamicFunction>;
};

type DynamicDatabase = Record<string, DynamicSchema>;
type InterestSupabaseClient = ReturnType<typeof createClient<DynamicDatabase, string, string>>;

let writeClient: InterestSupabaseClient | undefined;

export function createInterestClient(): InterestSupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const schema = process.env.NEXT_PUBLIC_SUPABASE_DB_SCHEMA?.trim() || "public";

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment (Vercel → Settings → Environment Variables).",
    );
  }

  if (!writeClient) {
    writeClient = createClient<DynamicDatabase, string, string>(url, key, {
      ...(schema === "public" ? {} : { db: { schema } }),
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return writeClient!;
}
