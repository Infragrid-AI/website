-- Interest / contact submissions captured by the public website form
-- (app/contact). Written via app/api/interest/route.ts using the shared
-- publishable (anon) key. RLS is enabled with an INSERT-only policy for the
-- anon/authenticated roles and NO select/update/delete policies — so the
-- form can write leads but nothing public can read them back. Reads happen
-- through the Supabase dashboard / an admin tool. Run this in the shared
-- Supabase project.

create table if not exists public.interest_submissions (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  segment            text not null check (segment in ('lab', 'data_provider', 'general')),
  first_name         text not null,
  last_name          text,
  email              text not null,
  organization       text,
  role               text,     -- title
  country            text,     -- data providers
  -- Multi-select fields (Protégé-style "check all that apply").
  data_types         text[],   -- lab: data wanted · provider: data offered
  storage_locations  text[],   -- data providers: where the data lives
  referral_source    text,     -- "How did you hear about us?"
  message            text not null,
  source             text not null default 'website_contact',
  metadata           jsonb,
  -- Outreach tracking — for the team to manage follow-ups later.
  status             text not null default 'new' check (status in ('new', 'contacted', 'archived')),
  notes              text
);

create index if not exists interest_submissions_created_at_idx
  on public.interest_submissions (created_at desc);
create index if not exists interest_submissions_segment_idx
  on public.interest_submissions (segment);

alter table public.interest_submissions enable row level security;

-- Insert-only: the public form (anon key) can add a lead, but cannot read,
-- update, or delete. No select policy = no public reads. Status/notes are
-- managed from the dashboard or an admin tool.
drop policy if exists "interest_submissions_anon_insert" on public.interest_submissions;
create policy "interest_submissions_anon_insert"
  on public.interest_submissions
  for insert
  to anon, authenticated
  with check (true);
