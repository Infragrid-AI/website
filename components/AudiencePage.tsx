import Link from "next/link";
import type { ReactNode } from "react";
import { DOMAIN_OPTIONS, contactHref } from "@/lib/contact-options";
import { InfragridLogo } from "./InfragridLogo";

type Item = { title: string; body: string };

export type AudienceContent = {
  eyebrow: string;
  segment: "lab" | "data_provider";
  title: ReactNode;
  lede: string;
  pillsIntro: string;
  ctaPrimaryLabel: string;
  whyKicker: string;
  features: Item[];
  howKicker: string;
  steps: Item[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

const pad = (i: number) => String(i + 1).padStart(2, "0");

export function AudiencePage(c: AudienceContent) {
  return (
    <>
      {/* Hero */}
      <section className="hero audience-hero">
        <div className="audience-hero-text">
          <span className="eyebrow eyebrow-brand">{c.eyebrow}</span>
          <h1 className="h-display">{c.title}</h1>
          <p className="lede" style={{ maxWidth: "52ch" }}>
            {c.lede}
          </p>

          <p className="audience-pills-intro">{c.pillsIntro}</p>
          <nav className="pill-row" aria-label="Domains">
            {DOMAIN_OPTIONS.map((domain) => (
              <Link key={domain} href={contactHref(c.segment, domain)} className="pill">
                {domain}
              </Link>
            ))}
          </nav>

          <div className="audience-cta-row">
            <Link href={contactHref(c.segment)} className="btn-solid">
              {c.ctaPrimaryLabel} →
            </Link>
          </div>
        </div>

        {/* Decorative visual — swap for a real image when available. */}
        <div className="audience-visual" aria-hidden="true">
          <span className="audience-visual-mark">
            <InfragridLogo />
          </span>
        </div>
      </section>

      {/* Why */}
      <section className="section section-hairline content-wide">
        <span className="eyebrow eyebrow-brand">{c.whyKicker}</span>
        <div className="layers">
          {c.features.map((f, i) => (
            <div key={f.title} className="layer">
              <span className="num">{pad(i)}</span>
              <h3 className="h">{f.title}</h3>
              <p className="p">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section section-hairline content-wide">
        <span className="eyebrow eyebrow-brand">{c.howKicker}</span>
        <div className="steps">
          {c.steps.map((s, i) => (
            <div key={s.title} className="step">
              <span className="step-n">{pad(i)}</span>
              <h3 className="step-h">{s.title}</h3>
              <p className="step-p">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2 className="h">{c.ctaTitle}</h2>
        <p className="p">{c.ctaBody}</p>
        <div className="links">
          <Link href={contactHref(c.segment)}>{c.ctaButton} →</Link>
          <a href="mailto:hello@infragrid.ai">hello@infragrid.ai</a>
        </div>
      </section>
    </>
  );
}
