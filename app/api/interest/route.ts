import { NextResponse } from "next/server";
import { createInterestClient } from "@/lib/supabase/interest";
import { sendInterestConfirmation } from "@/lib/resend";

export const runtime = "nodejs";

const SEGMENTS = ["lab", "data_provider", "general"] as const;
type Segment = (typeof SEGMENTS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Normalize a checkbox-group value (array of strings) into a clean, bounded list. */
function clipList(value: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim().slice(0, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success.
  if (clip(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const segment = clip(body.segment, 32) as Segment;
  const firstName = clip(body.firstName, 200);
  const lastName = clip(body.lastName, 200);
  const email = clip(body.email, 320);
  const organization = clip(body.organization, 200);
  const role = clip(body.role, 200);
  const country = clip(body.country, 100);
  const dataTypes = clipList(body.dataTypes, 20, 100);
  const storageLocations = clipList(body.storageLocations, 20, 100);
  const referralSource = clip(body.referralSource, 100);
  const message = clip(body.message, 4000);

  if (!SEGMENTS.includes(segment)) {
    return NextResponse.json({ error: "Please choose who you are." }, { status: 400 });
  }
  if (!firstName) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Please tell us a little about what you need." }, { status: 400 });
  }

  try {
    const supabase = createInterestClient();
    const { error } = await supabase.from("interest_submissions").insert({
      segment,
      first_name: firstName,
      last_name: lastName || null,
      email,
      organization: organization || null,
      role: role || null,
      country: country || null,
      data_types: dataTypes.length ? dataTypes : null,
      storage_locations: storageLocations.length ? storageLocations : null,
      referral_source: referralSource || null,
      message,
      source: "website_contact",
      metadata: {
        user_agent: request.headers.get("user-agent"),
        referer: request.headers.get("referer"),
      },
    });

    if (error) {
      // PostgrestError fields are non-enumerable, so a bare object log prints
      // "{}". Pull the useful parts out explicitly so failures are diagnosable.
      console.error("interest_submissions insert failed:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        { error: "Something went wrong saving your details. Please email hello@infragrid.ai." },
        { status: 500 },
      );
    }

    // Lead is saved — send the confirmation email. Best-effort: awaited so it
    // runs to completion on serverless (no fire-and-forget freeze), but it never
    // throws, so a mail failure can't turn a successful submission into an error.
    await sendInterestConfirmation({ email, firstName });
  } catch (err) {
    console.error("interest route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please email hello@infragrid.ai." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
