// Posts a Slack alert when a new lead lands in `public.interest_submissions`
// (the public website /contact form). One table covers all three cases, keyed
// by `segment`:
//   • lab            → a buyer (lab / model builder) wants data
//   • data_provider  → a seller (data provider) is offering data
//   • general        → a general contact / inquiry
//
// Wired to a DB trigger (pg_net) on interest_submissions INSERT — mirror the
// exchange's notify-* functions. Auth is the shared x-webhook-secret header.
// Reuses SLACK_WEBHOOK_URL; everything needed is already in the inserted row,
// so no service-role lookup is required.

const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL") ?? "";
const WEBHOOK_SECRET =
  Deno.env.get("INTEREST_WEBHOOK_SECRET") ??
  Deno.env.get("RFP_WEBHOOK_SECRET") ??
  "";

type Segment = "lab" | "data_provider" | "general";

type InterestRecord = {
  id: string;
  created_at: string | null;
  segment: Segment;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  organization: string | null;
  role: string | null;
  country: string | null;
  data_types: string[] | null;
  storage_locations: string[] | null;
  referral_source: string | null;
  message: string | null;
  source: string | null;
};

const SEGMENT_META: Record<Segment, { emoji: string; label: string; side: string }> = {
  lab: { emoji: "🧪", label: "Lab / model builder interested", side: "Buyer" },
  data_provider: { emoji: "📦", label: "Data provider interested", side: "Seller" },
  general: { emoji: "✉️", label: "New contact inquiry", side: "Contact" },
};

function list(values: string[] | null): string | null {
  if (!values || values.length === 0) return null;
  return values.join(", ");
}

Deno.serve(async (req) => {
  if (!SLACK_WEBHOOK_URL) {
    return new Response(JSON.stringify({ error: "SLACK_WEBHOOK_URL not set" }), { status: 500 });
  }
  if (WEBHOOK_SECRET && req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const rec: InterestRecord | undefined = body?.record;
  if (!rec?.id) {
    return new Response(JSON.stringify({ error: "no record" }), { status: 400 });
  }

  const meta = SEGMENT_META[rec.segment] ?? SEGMENT_META.general;
  const name = [rec.first_name, rec.last_name].filter(Boolean).join(" ") || "Someone";
  const who = [name, rec.organization].filter(Boolean).join(" · ");

  // Segment-aware data line: labs want data, providers offer it.
  const dataLabel = rec.segment === "data_provider" ? "Data offered" : "Data wanted";

  const fields = [
    rec.email && `*Email:* ${rec.email}`,
    rec.role && `*Title:* ${rec.role}`,
    rec.organization && `*Organization:* ${rec.organization}`,
    rec.country && `*Country:* ${rec.country}`,
    list(rec.data_types) && `*${dataLabel}:* ${list(rec.data_types)}`,
    list(rec.storage_locations) && `*Storage:* ${list(rec.storage_locations)}`,
    rec.referral_source && `*Heard via:* ${rec.referral_source}`,
  ].filter(Boolean) as string[];

  const blocks: unknown[] = [
    {
      type: "header",
      text: { type: "plain_text", text: `${meta.emoji} ${meta.label}`, emoji: true },
    },
    {
      type: "section",
      text: { type: "mrkdwn", text: `*${meta.side}:* ${who || name}` },
    },
  ];
  if (fields.length) {
    blocks.push({ type: "section", fields: fields.map((t) => ({ type: "mrkdwn", text: t })) });
  }
  if (rec.message) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Message:*\n${rec.message.slice(0, 2800)}` },
    });
  }
  blocks.push({
    type: "context",
    elements: [
      {
        type: "mrkdwn",
        text: [`Source: ${rec.source ?? "website"}`, rec.email && `Reply: ${rec.email}`]
          .filter(Boolean)
          .join("  ·  "),
      },
    ],
  });

  const summary = `${meta.label}: ${who || name}${rec.email ? ` (${rec.email})` : ""}`;

  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: summary, blocks }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: await res.text() }), { status: 502 });
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
