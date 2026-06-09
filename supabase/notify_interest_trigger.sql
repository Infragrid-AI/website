-- ════════════════════════════════════════════════════════════════════════
-- Slack notify trigger for website interest / contact submissions
--
-- Fires on every INSERT into public.interest_submissions and POSTs the new row
-- to the notify-interest Edge Function (which formats it and posts to Slack).
-- Mirrors the exchange's notify_*_slack() triggers (pg_net HTTP POST) — no
-- dashboard Database Webhook needed.
--
-- SECURITY: the x-webhook-secret is NOT hardcoded here. It is read at runtime
-- from Supabase Vault, so the secret never lives in source control or git
-- history. See step (1) below to create/rotate it.
--
-- Depends on:
--   • pg_net        (HTTP from Postgres — already enabled in the shared project)
--   • supabase_vault (encrypted secrets — enabled by default on Supabase)
--   • interest_submissions table (supabase/interest_submissions.sql)
-- Run this in the shared Supabase project (yjfagnezvkprkutrhdcd).
-- ════════════════════════════════════════════════════════════════════════

-- (1) Create (or rotate) the secret — run ONCE, manually, with a fresh value.
--     Generate one with:  openssl rand -hex 16
--     This value must equal the function's INTEREST_WEBHOOK_SECRET env var.
--
--     -- first time:
--     select vault.create_secret('<paste-fresh-secret>', 'interest_webhook_secret');
--     -- to rotate later:
--     select vault.update_secret(
--       (select id from vault.secrets where name = 'interest_webhook_secret'),
--       '<paste-new-secret>'
--     );

-- (2) Trigger function — reads the secret from Vault at call time.
create or replace function public.notify_interest_slack()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  webhook_secret text;
begin
  -- Slack notification is best-effort: it must NEVER abort the user's insert.
  -- Any failure in here (pg_net not enabled, vault secret missing, permissions)
  -- is swallowed so the form submission still succeeds. Without this guard, a
  -- broken notify path returns "something went wrong saving your details" to the
  -- user even though the lead is otherwise valid.
  begin
    select decrypted_secret
      into webhook_secret
      from vault.decrypted_secrets
     where name = 'interest_webhook_secret'
     limit 1;

    perform net.http_post(
      url := 'https://yjfagnezvkprkutrhdcd.supabase.co/functions/v1/notify-interest',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-webhook-secret', coalesce(webhook_secret, '')
      ),
      body := jsonb_build_object(
        'type', 'INSERT',
        'table', 'interest_submissions',
        'record', to_jsonb(new)
      )
    );
  exception
    when others then
      raise warning 'notify_interest_slack failed (insert still committed): %', sqlerrm;
  end;

  return new;
end;
$$;

-- (3) Trigger.
drop trigger if exists interest_slack_notify on public.interest_submissions;
create trigger interest_slack_notify
  after insert on public.interest_submissions
  for each row execute function public.notify_interest_slack();
