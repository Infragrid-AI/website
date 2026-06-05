import type { Metadata } from "next";

const title = "Infragrid | Privacy Policy";
const description =
  "How Infragrid handles data across the Infragrid Exchange (buyers) and Infragrid Partners (data providers).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/legal/privacy" },
  openGraph: { title, description, url: "/legal/privacy", type: "website" },
};

const EFFECTIVE = "Effective June 4, 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="hero">
        <h1 className="h-display">Privacy Policy</h1>
        <p className="lede" style={{ maxWidth: "60ch" }}>
          What we collect and how we use it across the Infragrid Exchange and Infragrid Partners.
        </p>
        <p className="muted" style={{ marginTop: 8 }}>{EFFECTIVE}</p>
      </section>

      <section className="section content">
        <div className="legal prose">
          <p>
            This Policy explains how Infragrid (&ldquo;we,&rdquo; &ldquo;us&rdquo;) handles
            information across the <strong>Infragrid Exchange</strong> (for researchers/buyers) and
            <strong> Infragrid Partners</strong> (for data providers). Infragrid acts as a data
            broker connecting buyers and providers.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Account &amp; profile.</strong> Name, work email, company, and (via Google
              sign-in) your basic Google profile and photo.
            </li>
            <li>
              <strong>Buyer activity.</strong> Datasets you view and the inquiries you submit —
              including your price offer, intended use, timeline, and questions.
            </li>
            <li>
              <strong>Provider content.</strong> Company details, dataset listings, and sample
              files you upload (and their metadata such as schema and size).
            </li>
            <li>
              <strong>Usage &amp; device data.</strong> Standard logs and analytics needed to
              operate and secure the services.
            </li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>To authenticate you and operate the Exchange and Partners apps.</li>
            <li>
              <strong>To broker deals</strong> — when a buyer submits an inquiry, we share the
              relevant details (including contact information and the offer) with our team and the
              provider that owns the dataset, so the relationship can be progressed and the sale
              closed.
            </li>
            <li>To send transactional messages (sign-in links, notifications).</li>
            <li>To maintain security, prevent abuse, and improve the services.</li>
          </ul>

          <h2>3. Sharing</h2>
          <ul>
            <li>
              <strong>Between buyers and providers.</strong> To facilitate a transaction we share
              an inquiry&rsquo;s buyer contact and offer with the owning provider. Provider listing
              details are shown to buyers, except internal fields (e.g. provenance notes and price
              estimates) which are never displayed to buyers.
            </li>
            <li>
              <strong>Service providers</strong> who process data on our behalf — e.g. Supabase
              (database/auth/storage), Vercel (hosting), Resend (email), Slack (internal
              notifications), and Google (sign-in).
            </li>
            <li>
              <strong>Legal &amp; safety</strong> — where required by law or to protect rights,
              users, and the services.
            </li>
          </ul>

          <h2>4. Datasets must be de-identified</h2>
          <p>
            Providers are solely responsible for ensuring datasets and samples they upload are
            properly anonymized / de-identified and lawful to share. Do not upload personal data you
            lack the right to share. We do not intend to host raw personal data through listings.
          </p>

          <h2>5. Retention</h2>
          <p>
            We retain account, listing, and inquiry information for as long as your account is
            active or as needed to provide the services, resolve disputes, and meet legal
            obligations.
          </p>

          <h2>6. Security</h2>
          <p>
            We use access controls, encryption in transit, and row-level security to protect data.
            No method of transmission or storage is completely secure, but we work to protect your
            information.
          </p>

          <h2>7. Your choices</h2>
          <p>
            You may request access to, correction of, or deletion of your account information by
            contacting us. Some information may be retained where required for legitimate business
            or legal purposes.
          </p>

          <h2>8. Changes</h2>
          <p>
            We may update this Policy; material changes are reflected by the effective date above.
          </p>

          <h2>9. Contact</h2>
          <p>
            Privacy questions? Email{" "}
            <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>.
          </p>
        </div>
      </section>
    </>
  );
}
