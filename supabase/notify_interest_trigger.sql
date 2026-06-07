-- ════════════════════════════════════════════════════════════════════════
-- Slack notify trigger for website interest / contact submissions
--
-- Fires on every INSERT into public.interest_submissions and POSTs the new row
-- to the notify-interest Edge Function (which formats it and posts to Slack).
-- Mirrors the exchange's notify_*_slack() triggers (pg_net HTTP POST with the
-- x-webhook-secret header) — no dashboard Database Webhook needed.
--
-- The x-webhook-secret below must match the notify-interest function's
-- INTEREST_WEBHOOK_SECRET (or RFP_WEBHOOK_SECRET, which it falls back to). The
-- value here reuses the same shared secret the exchange notify triggers use.
--
-- Depends on: pg_net extension (already enabled in the shared project),
-- interest_submissions table (supabase/interest_submissions.sql).
-- Run this in the shared Supabase project (yjfagnezvkprkutrhdcd).
-- ════════════════════════════════════════════════════════════════════════

create or replace function public.notify_interest_slack()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform net.http_post(
    url := 'https://yjfagnezvkprkutrhdcd.supabase.co/functions/v1/notify-interest',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'd60ff9d89ac4e5526c29a4360a924316'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'interest_submissions',
      'record', to_jsonb(new)
    )
  );
  return new;
end;
$$;

drop trigger if exists interest_slack_notify on public.interest_submissions;
create trigger interest_slack_notify
  after insert on public.interest_submissions
  for each row execute function public.notify_interest_slack();
