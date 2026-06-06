import type { Metadata } from "next";
import { AudiencePage, type AudienceContent } from "@/components/AudiencePage";

const title = "Infragrid | For model builders";
const description =
  "Anonymized operational datasets and reinforcement-learning environments drawn from real enterprise work — privacy-certified, domain-specific, ready to train on.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/model-builders" },
  openGraph: { title, description, url: "/model-builders", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const content: AudienceContent = {
  eyebrow: "For model builders",
  segment: "lab",
  title: (
    <>
      Real-world data and <em>RL environments</em> for frontier models.
    </>
  ),
  lede: "Infragrid turns real enterprise operations into anonymized datasets and reinforcement-learning environments — high-signal, domain-specific, and privacy-certified. Select a domain below to tell us what you're training.",
  pillsIntro: "We work across domains. Select one to register interest.",
  ctaPrimaryLabel: "Get data access",
  whyKicker: "Why Infragrid",
  features: [
    {
      title: "Real operational signal",
      body: "Not scraped text. Datasets and trajectories drawn from the actual work enterprises do — the tasks, tools, and decisions models struggle to learn from public data.",
    },
    {
      title: "RL environments, not just corpora",
      body: "Executable environments with real tools and reward signal, so you can train and evaluate agents on tasks that mirror production work, not static benchmarks.",
    },
    {
      title: "Privacy-certified by default",
      body: "Every bundle ships with a privacy certificate: differential-privacy synthesis and PII removal applied up front, so you can train without inheriting compliance risk.",
    },
    {
      title: "Domain coverage that compounds",
      body: "Healthcare, finance, support, and more — aggregated across providers so datasets deepen over time and span the verticals your roadmap needs.",
    },
  ],
  howKicker: "How it works",
  steps: [
    {
      title: "Scope",
      body: "Tell us the domain, task types, and scale you need. We map it to available bundles and environments — or source new ones from partners.",
    },
    {
      title: "Access",
      body: "Receive privacy-certified datasets and RL environments under clear licensing, delivered to your environment with provenance and an audit trail.",
    },
    {
      title: "Train",
      body: "Train, fine-tune, and evaluate on real operational signal. Come back for deeper coverage as your models and tasks evolve.",
    },
  ],
  ctaTitle: "Train on real work.",
  ctaBody:
    "Tell us what you're building and the domains you need. We'll line up the data and environments to match.",
  ctaButton: "Get data access",
};

export default function ModelBuildersPage() {
  return <AudiencePage {...content} />;
}
