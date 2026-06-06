import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { BUILDER_LOGOS } from "@/lib/builder-logos";

// Raster logos that live in /public/builder-logos. Rendered as a colorizable
// silhouette (CSS mask), so they match the monochrome marks and hover-colorize.
const IMAGE_LOGOS: Record<string, string> = { Mercor: "mercor.png" };

function imageLogoSrc(name: string): string | null {
  const file = IMAGE_LOGOS[name];
  if (!file) return null;
  const onDisk = existsSync(join(process.cwd(), "public", "builder-logos", file));
  return onDisk ? `/builder-logos/${file}` : null;
}

export const metadata: Metadata = {
  title: "Infragrid — RL transformation, one slice at a time",
  description:
    "We embed inside enterprise teams and ship agents that automate real work — one bounded slice at a time.",
};

// Brand colors revealed on hover. Tweak any hex freely.
const BUILDERS = [
  { name: "Palantir", color: "#101820" },
  { name: "Amazon", color: "#FF9900" },
  { name: "Mercor", color: "#5B50E8" },
  { name: "Microsoft", color: "#0067B8" },
  { name: "a16z", color: "#1A1A1A" },
  { name: "NVIDIA", color: "#76B900" },
  { name: "Wells Fargo", color: "#D71E28" },
];

function BuilderItem({ name, color }: { name: string; color: string }) {
  const logo = BUILDER_LOGOS[name];
  const img = imageLogoSrc(name);
  return (
    <span className="builder" style={{ "--brand-color": color } as CSSProperties}>
      {logo ? (
        <svg
          className="builder-mark"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d={logo} fill="currentColor" />
        </svg>
      ) : img ? (
        <span
          className="builder-mark builder-mark-img"
          aria-hidden="true"
          style={{ "--logo-src": `url(${img})` } as CSSProperties}
        />
      ) : null}
      <span className="builder-name">{name}</span>
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1 className="h-display">
          RL transformation,
          <br />
          <em>one slice at a time.</em>
        </h1>
        <p className="lede" style={{ maxWidth: "56ch" }}>
          We embed inside enterprise teams and ship agents that automate real
          work — one bounded slice at a time.
        </p>
        <div style={{ marginTop: 32, display: "flex", gap: 28, flexWrap: "wrap" }}>
          <Link className="text-link" href="/platform">
            How we work <span aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" href="/contact">
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Built by engineers from */}
      <section className="builders section-hairline">
        <span className="eyebrow">Built by engineers from</span>
        <div
          className="marquee"
          role="img"
          aria-label={`Built by engineers from ${BUILDERS.map(
            (b) => b.name,
          ).join(", ")}`}
        >
          <div className="marquee-track">
            <div className="marquee-group">
              {BUILDERS.map((b) => (
                <BuilderItem key={b.name} name={b.name} color={b.color} />
              ))}
            </div>
            <div className="marquee-group" data-clone aria-hidden="true">
              {BUILDERS.map((b) => (
                <BuilderItem
                  key={`clone-${b.name}`}
                  name={b.name}
                  color={b.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The unit of work */}
      <section className="section section-hairline">
        <div className="content">
          <span className="eyebrow eyebrow-brand">The unit of work</span>
          <h2 className="h-section">A slice.</h2>
          <div className="prose">
            <p>
              One bounded body of work inside an enterprise — one engagement,
              one process, one workflow — that touches a coherent set of tools
              and produces real artifacts. You can name it. It has a clear start
              and end. We agent-ify one slice. Then the next.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section section-hairline content-wide">
        <span className="eyebrow eyebrow-brand">How we work</span>
        <h2 className="h-section">Embed. Map. Deploy.</h2>

        <div className="layers">
          <div className="layer">
            <span className="num">01</span>
            <h3 className="h">Embed</h3>
            <p className="p">
              Forward-deployed engineers sit inside your team for the duration
              of the slice.
            </p>
          </div>
          <div className="layer">
            <span className="num">02</span>
            <h3 className="h">Map</h3>
            <p className="p">
              We map every tool the slice actually touched — tickets, threads,
              repos, docs, decks, contracts.
            </p>
          </div>
          <div className="layer">
            <span className="num">03</span>
            <h3 className="h">Deploy</h3>
            <p className="p">
              We deploy a working agent that automates the underlying pattern.
              New work flowing into that slice goes through the agent.
            </p>
          </div>
          <div className="layer">
            <span className="num">04</span>
            <h3 className="h">Repeat</h3>
            <p className="p">
              Move to the next slice. Different engagement, different process.
              Same approach.
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section section-hairline">
        <div className="content">
          <span className="eyebrow">Built for security teams</span>
          <h2 className="h-section">
            On-prem. Read-only.
            <br />
            <em>Auditable.</em>
          </h2>
          <div className="prose">
            <p>
              The platform deploys inside your cloud or data center. Read-only
              on every source system. Slice-scoped extraction — no &ldquo;ingest
              everything.&rdquo; Every action is immutably logged.
            </p>
          </div>
          <Link className="text-link" href="/platform" style={{ marginTop: 6 }}>
            Platform breakdown <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2 className="h">Pick one slice.</h2>
        <p className="p">
          Tell us about one bounded body of work you&apos;d like to make
          agent-ready.
        </p>
        <div className="links">
          <Link href="/contact">Get in touch →</Link>
          <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>
        </div>
      </section>
    </>
  );
}
