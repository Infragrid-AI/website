import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the public interest form.
 *
 * Uses the shared publishable (anon) key — the same one the other apps in the
 * monorepo use. The interest_submissions table has RLS enabled with an
 * insert-only policy for the anon role, so this client can add leads but
 * cannot read, update, or delete them. Imported only by the /api/interest
 * route handler (server-side); never shipped to the browser.
 */
let writeClient: SupabaseClient | undefined;

export function createInterestClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment (Vercel → Settings → Environment Variables).",
    );
  }

  if (!writeClient) {
    writeClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return writeClient;
}
