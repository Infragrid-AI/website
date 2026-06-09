import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Infragrid — RL transformation, one slice at a time",
  description:
    "We embed inside enterprise teams and ship agents that automate real work — one bounded slice at a time.",
};

// Real company logos in /public/logo. `height` optically balances the differing
// lockups (horizontal wordmarks vs stacked marks) so they read at one size.
const BUILDERS = [
  { name: "Palantir", src: "/logo/palantir.png", height: 30 },
  { name: "Amazon", src: "/logo/amazon.png", height: 34 },
  { name: "Mercor", src: "/logo/mercor.png", height: 30 },
  { name: "Microsoft", src: "/logo/microsoft.webp", height: 32 },
  { name: "a16z", src: "/logo/a16z.png", height: 54 },
  { name: "NVIDIA", src: "/logo/nvidia.svg", height: 50 },
  { name: "Wells Fargo", src: "/logo/wells-fargo.png", height: 54 },
  { name: "Santander", src: "/logo/santander.svg", height: 30 },
  { name: "BNP Paribas", src: "/logo/bnp-paribas.svg", height: 34 },
  { name: "Park Cities Asset Management", src: "/logo/park-cities.png", height: 42 },
];

function BuilderItem({
  name,
  src,
  height,
}: {
  name: string;
  src: string;
  height: number;
}) {
  return (
    <span className="builder">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="builder-logo"
        src={src}
        alt={name}
        style={{ "--logo-h": `${height}px` } as CSSProperties}
      />
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
                <BuilderItem
                  key={b.name}
                  name={b.name}
                  src={b.src}
                  height={b.height}
                />
              ))}
            </div>
            <div className="marquee-group" data-clone aria-hidden="true">
              {BUILDERS.map((b) => (
                <BuilderItem
                  key={`clone-${b.name}`}
                  name={b.name}
                  src={b.src}
                  height={b.height}
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
