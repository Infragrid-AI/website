# notify-interest

Posts a Slack alert whenever a new lead is submitted through the public website
`/contact` form, so the team sees interest in real time. A DB trigger on
`public.interest_submissions` INSERT calls this Edge Function (via `pg_net`),
which formats the row and posts to a Slack **Incoming Webhook**.

```
interest_submissions INSERT ─▶ pg_net trigger ─▶ notify-interest ─▶ Slack channel
```

One table, three message types (keyed by `segment`):

| segment         | meaning                          | header                          |
| --------------- | -------------------------------- | ------------------------------- |
| `lab`           | buyer (lab / model builder)      | 🧪 Lab / model builder interested |
| `data_provider` | seller (data provider)           | 📦 Data provider interested      |
| `general`       | general contact / inquiry        | ✉️ New contact inquiry           |

## Setup

This lives in the **shared** Supabase project (`yjfagnezvkprkutrhdcd`), the same
one the exchange notifiers use — so `SLACK_WEBHOOK_URL` may already be set.

> **Never commit the webhook secret.** It is stored in two places only — the
> function's env (`INTEREST_WEBHOOK_SECRET`) and Supabase **Vault** (read by the
> trigger). Generate it once with `openssl rand -hex 16` and keep it out of git.

1. **(If needed) create a Slack Incoming Webhook**
   - Slack → Apps → your app → **Incoming Webhooks** → Activate → **Add New
     Webhook to Workspace** → pick the channel → copy the
     `https://hooks.slack.com/services/…` URL.

2. **Set the secret in both places (use the SAME value):**
   ```bash
   SECRET="$(openssl rand -hex 16)"

   # a) function env (checked inside notify-interest)
   supabase secrets set SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXX/YYY/ZZZ" --project-ref yjfagnezvkprkutrhdcd
   supabase secrets set INTEREST_WEBHOOK_SECRET="$SECRET" --project-ref yjfagnezvkprkutrhdcd

   # b) Supabase Vault (read by the trigger) — run in the SQL editor:
   #    select vault.create_secret('<paste $SECRET here>', 'interest_webhook_secret');
   ```

3. **Deploy the function** (no JWT — the DB trigger calls it directly):
   ```bash
   supabase functions deploy notify-interest --no-verify-jwt --project-ref yjfagnezvkprkutrhdcd
   ```

4. **Create the trigger** (run once against the shared project):
   ```bash
   psql "$SUPABASE_DB_URL" -f supabase/notify_interest_trigger.sql
   # …or paste supabase/notify_interest_trigger.sql into the SQL editor.
   ```
   The function reads `INTEREST_WEBHOOK_SECRET` from its env; the trigger reads
   the matching value from Vault (`interest_webhook_secret`). They must be equal.

## Rotating the secret

If the secret is ever exposed (e.g. committed to git), rotate it — removing it
from files does **not** un-leak it:

```bash
NEW="$(openssl rand -hex 16)"
supabase secrets set INTEREST_WEBHOOK_SECRET="$NEW" --project-ref yjfagnezvkprkutrhdcd
# then in the SQL editor:
#   select vault.update_secret(
#     (select id from vault.secrets where name = 'interest_webhook_secret'), '<NEW>');
```

5. **Test:** submit the `/contact` form (or insert a test row into
   `interest_submissions`) → the alert should appear in your channel.

## Notes
- The Slack URL lives only in the function's secrets — never exposed to the
  browser. The form's existing insert flow (`app/api/interest/route.ts`) is
  unchanged; the trigger fires server-side after the row is written.
- The trigger is scoped to `interest_submissions`, so only website leads ping
  this channel.
- To alert on follow-up status changes too, add an `after update` trigger that
  fires `when (old.status is distinct from new.status)`.
