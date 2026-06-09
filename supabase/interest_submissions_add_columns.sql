-- ════════════════════════════════════════════════════════════════════════
-- Migration: add the newer interest_submissions columns to deployments that
-- predate them.
--
-- The canonical schema (supabase/interest_submissions.sql) is `create table if
-- not exists`, so it is a no-op against an already-existing table and does NOT
-- add columns. Older deployments of the shared project (yjfagnezvkprkutrhdcd)
-- are missing the data-provider / multi-select fields, which makes the website
-- form insert fail with:
--   PGRST204 "Could not find the 'country' column of 'interest_submissions'..."
--
-- This patch is idempotent — safe to run repeatedly. Run it in the shared
-- Supabase project (SQL editor, or psql "$SUPABASE_DB_URL" -f <this file>).
-- ════════════════════════════════════════════════════════════════════════

alter table public.interest_submissions
  add column if not exists country           text,    -- data providers
  add column if not exists data_types        text[],  -- lab: wanted · provider: offered
  add column if not exists storage_locations text[],  -- data providers: where data lives
  add column if not exists referral_source   text;    -- "How did you hear about us?"

-- Tell PostgREST to refresh its schema cache so the new columns are accepted
-- immediately (Supabase usually reloads on DDL, but this makes it deterministic).
notify pgrst, 'reload schema';
