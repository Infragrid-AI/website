-- ════════════════════════════════════════════════════════════════════════
-- Migration: reconcile a deployed interest_submissions table with the current
-- canonical schema (supabase/interest_submissions.sql).
--
-- The canonical schema is `create table if not exists`, so it is a no-op against
-- an already-existing table and never adds/changes columns. Older deployments of
-- the shared project (yjfagnezvkprkutrhdcd) are behind in two ways, both of
-- which make the website form insert fail with
--   PGRST204 "Could not find the 'X' column of 'interest_submissions' ...":
--
--   1. They predate the first_name / last_name split — the table had a single
--      `name` column instead. (Confirmed live: first_name & last_name absent,
--      `name` present.)
--   2. They predate the data-provider / multi-select fields (country, data_types,
--      storage_locations, referral_source).
--
-- This patch is idempotent — safe to run repeatedly. Run it in the shared
-- Supabase project (SQL editor, or  psql "$SUPABASE_DB_URL" -f <this file>).
-- ════════════════════════════════════════════════════════════════════════

-- (1) Add every column the app writes that may be missing.
alter table public.interest_submissions
  add column if not exists first_name        text,
  add column if not exists last_name         text,
  add column if not exists country           text,    -- data providers
  add column if not exists data_types        text[],  -- lab: wanted · provider: offered
  add column if not exists storage_locations text[],  -- data providers: where data lives
  add column if not exists referral_source   text;    -- "How did you hear about us?"

-- (2) If a legacy single `name` column exists: copy it into first_name so no
--     existing lead names are lost, then make `name` optional so inserts that
--     only send first_name/last_name (as the form now does) never fail on it.
do $$
begin
  if exists (
    select 1 from information_schema.columns
     where table_schema = 'public'
       and table_name   = 'interest_submissions'
       and column_name  = 'name'
  ) then
    update public.interest_submissions
       set first_name = name
     where first_name is null
       and name is not null;

    execute 'alter table public.interest_submissions alter column name drop not null';
  end if;
end $$;

-- (3) Tell PostgREST to refresh its schema cache so the new columns are accepted
--     immediately (Supabase usually reloads on DDL, but make it deterministic).
notify pgrst, 'reload schema';
