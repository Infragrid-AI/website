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
one the exchange notifiers use — so `SLACK_WEBHOOK_URL` and `RFP_WEBHOOK_SECRET`
are likely already set. If so, you can skip step 2.

1. **(If needed) create a Slack Incoming Webhook**
   - Slack → Apps → your app → **Incoming Webhooks** → Activate → **Add New
     Webhook to Workspace** → pick the channel → copy the
     `https://hooks.slack.com/services/…` URL.

2. **(If not already set) set function secrets**
   ```bash
   supabase secrets set SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXX/YYY/ZZZ" --project-ref yjfagnezvkprkutrhdcd
   # Reuses the shared RFP_WEBHOOK_SECRET; or set a dedicated one:
   supabase secrets set INTEREST_WEBHOOK_SECRET="d60ff9d89ac4e5526c29a4360a924316" --project-ref yjfagnezvkprkutrhdcd
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
   The trigger's `x-webhook-secret` must match the function's
   `INTEREST_WEBHOOK_SECRET` / `RFP_WEBHOOK_SECRET`.

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
