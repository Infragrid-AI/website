import type { Metadata } from "next";
import Link from "next/link";

const title = "Infragrid | Platform";
const description =
  "Infrastructure for shipping agents on real enterprise work — deployed in your environment, on your tools, scoped to one slice at a time.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/platform" },
  openGraph: { title, description, url: "/platform", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const layers = [
  {
    num: "Layer 01",
    title: "Slice mapping.",
    body: "Before anything moves, we sit down with you and define the slice — its scope, the tools it touched, the artifacts it produced. You confirm. Nothing happens on the platform until you do.",
  },
  {
    num: "Layer 02",
    title: "Connectors.",
    body: "Read-only connectors to the tools the slice actually touched. Partner-owned credentials, official APIs, scope confirmed up front. No discovery beyond scope. No writes to source systems. Every read is logged.",
  },
  {
    num: "Layer 03",
    title: "Agent deployment.",
    body: "Forward-deployed engineers embed inside your team and ship a working agent that automates the underlying pattern of the slice. New work flowing into the slice goes through the agent.",
  },
  {
    num: "Layer 04",
    title: "Operations & audit.",
    body: "On-prem deployment. Immutable audit log of every extraction, every action, every export. Reversibility stays inside your environment. If your security team wants to look, everything they need is already there.",
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <span className="eyebrow">Platform</span>
        <h1 className="h-display">
          RL transformation <em>for the enterprise.</em>
        </h1>
        <p className="lede" style={{ maxWidth: "56ch" }}>
          Infrastructure for shipping agents on real enterprise work —
          deployed in your environment, on your tools, scoped to one slice at a
          time.
        </p>
      </section>

      {/* Platform layers */}
      {layers.map(({ num, title, body }) => (
        <section key={num} className="section section-hairline">
          <div className="content">
            <span className="eyebrow eyebrow-brand">{num}</span>
            <h2 className="h-section">{title}</h2>
            <p className="prose">{body}</p>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="cta-band">
        <h2 className="h">Get agents shipped. Fast.</h2>
        <p className="p">
          And turn the work your organization has already done into upside on
          top of it.
        </p>
        <div className="links">
          <Link href="/contact">Get in touch →</Link>
          <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>
        </div>
      </section>
    </>
  );
}
