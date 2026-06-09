import "server-only";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Infragrid <noreply@infragrid.ai>";
const REPLY_TO = "hello@infragrid.ai";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ConfirmationInput = {
  email: string;
  firstName: string;
};

/**
 * Send the "we received your request" confirmation via Resend.
 *
 * Best-effort and never throws: the lead is already saved by the time this runs,
 * so a mail failure (missing key, Resend down, unverified domain) must not break
 * the user's submission. Returns true on a 2xx send, false otherwise.
 *
 * Requires RESEND_API_KEY in the environment and the infragrid.ai domain to be
 * verified in Resend (so noreply@infragrid.ai can send).
 */
export async function sendInterestConfirmation({
  email,
  firstName,
}: ConfirmationInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping interest confirmation email.");
    return false;
  }

  const name = firstName.trim() || "there";
  const safeName = escapeHtml(name);
  const subject = "We received your request — Infragrid";

  const text = `Hi ${name},

Thanks for reaching out to Infragrid. Your message is in, and a member of our team will get back to you shortly.

If anything's urgent in the meantime, just reply to this email or write to hello@infragrid.ai.

— The Infragrid team`;

  const html = `<div style="background:#f6f5f0;padding:32px 16px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e3e3dc;border-radius:6px;padding:32px;">
    <p style="margin:0 0 18px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#2f6b45;font-weight:600;">Infragrid</p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#1a1a1a;font-weight:600;">We&rsquo;ve received your request.</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#33332e;">Hi ${safeName},</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#33332e;">Thanks for reaching out to Infragrid. Your message is in, and a member of our team will get back to you shortly.</p>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#33332e;">If anything&rsquo;s urgent in the meantime, just reply to this email or write to <a href="mailto:hello@infragrid.ai" style="color:#2f6b45;text-decoration:underline;">hello@infragrid.ai</a>.</p>
    <p style="margin:0;font-size:15px;line-height:1.6;color:#33332e;">&mdash; The Infragrid team</p>
  </div>
  <p style="max-width:480px;margin:16px auto 0;font-size:12px;color:#9a9a90;text-align:center;">Infragrid &middot; On-prem, read-only, slice-scoped.</p>
</div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend confirmation failed:", res.status, detail.slice(0, 500));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend confirmation error:", err);
    return false;
  }
}
