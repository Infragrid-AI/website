import type { Metadata } from "next";
import { InterestForm } from "@/components/InterestForm";

const title = "Infragrid | Contact";
const description =
  "Talk to Infragrid about scoping a slice, on-prem deployment, or security and compliance review.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const team = [
  {
    role: "Cofounder",
    name: "Ashwin Kodibagkar",
    bio: "ex Mercor, Microsoft, Amazon.",
    email: "ashwin@infragrid.ai",
  },
  {
    role: "Cofounder",
    name: "Ephraim Sun",
    bio: "ex Palantir, Forge, Amazon.",
    email: "ephraim@infragrid.ai",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1 className="h-display">Get in touch.</h1>
        <p className="lede" style={{ maxWidth: "50ch" }}>
          For slice scoping, on-prem deployment, or security and compliance
          review.
        </p>
        <p style={{ marginTop: 42, fontSize: "1.2rem" }}>
          <a className="underlined-link" href="mailto:hello@infragrid.ai">
            hello@infragrid.ai
          </a>
        </p>
      </section>

      {/* Interest form */}
      <section className="section section-hairline content-wide">
        <span className="eyebrow eyebrow-brand">Register interest</span>
        <h2 className="h-section">Tell us who you are.</h2>
        <p className="prose" style={{ marginBottom: 8 }}>
          Labs, data providers, and everyone in between. Fill out the form and
          we&apos;ll reach out.
        </p>
        <div style={{ maxWidth: 760, marginTop: 32 }}>
          <InterestForm />
        </div>
      </section>

      {/* Team */}
      <section className="section section-hairline content-wide">
        <span className="eyebrow eyebrow-brand">The team</span>

        <div className="team">
          {team.map(({ role, name, bio, email }) => (
            <div key={email} className="member">
              <div className="role">{role}</div>
              <h3 className="name">{name}</h3>
              <p className="bio">{bio}</p>
              <p
                className="bio"
                style={{
                  marginTop: 12,
                  fontSize: "0.9rem",
                  color: "var(--fg-muted)",
                }}
              >
                <a className="underlined-link" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
