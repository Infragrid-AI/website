import type { Metadata } from "next";
import { AudiencePage, type AudienceContent } from "@/components/AudiencePage";

const title = "Infragrid | For data providers";
const description =
  "Turn the operational data and expert work you've already done into upside. Infragrid delicenses it into privacy-safe datasets and RL environments — your IP retained, fully audited.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/data-providers" },
  openGraph: { title, description, url: "/data-providers", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const content: AudienceContent = {
  eyebrow: "For data providers",
  segment: "data_provider",
  title: (
    <>
      Turn work you&apos;ve <em>already done</em> into upside.
    </>
  ),
  lede: "Infragrid delicenses your operational data and expert workflows into privacy-safe datasets and reinforcement-learning environments for AI labs — new revenue, your IP retained, with a full audit trail. Select your domain to learn more.",
  pillsIntro: "We partner across domains. Select one to start.",
  ctaPrimaryLabel: "Become a data partner",
  whyKicker: "Why partner with Infragrid",
  features: [
    {
      title: "You keep ownership",
      body: "You license limited rights for defined AI-training use. You are never selling or transferring ownership of your data or content.",
    },
    {
      title: "Privacy by default",
      body: "Automated PII removal, differential-privacy synthesis, and quality assurance are applied before anything leaves your environment — each bundle ships with a privacy certificate.",
    },
    {
      title: "On-prem and audited",
      body: "Processing runs in your environment with an immutable log of every extraction and export. Reversibility and control stay on your side.",
    },
    {
      title: "Incremental revenue",
      body: "Aggregated across labs and use cases, your data earns repeat inclusion and ongoing revenue share — without standing up an internal AI business unit.",
    },
  ],
  howKicker: "How it works",
  steps: [
    {
      title: "Discover",
      body: "We assess your data, workflows, and rights to identify high-value AI-training applications across current and future model needs.",
    },
    {
      title: "Anonymize",
      body: "We delicense and anonymize in your environment — PII removal and DP synthesis — producing privacy-certified datasets and RL environments.",
    },
    {
      title: "Monetize",
      body: "Your bundles are matched to qualified labs under clear licensing, and you receive transparent, recurring revenue share.",
    },
  ],
  ctaTitle: "Unlock revenue from your data.",
  ctaBody:
    "Tell us what operational data or expert work you have. We'll show you what it's worth to AI labs — privately.",
  ctaButton: "Become a data partner",
};

export default function DataProvidersPage() {
  return <AudiencePage {...content} />;
}
