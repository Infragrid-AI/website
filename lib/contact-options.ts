// Shared between the Sidebar nav dropdowns and the contact InterestForm so the
// domain list and segment slugs never drift apart.

export const DOMAIN_OPTIONS = [
  "Healthcare",
  "Video",
  "Audio & Speech",
  "Spatial & Physical",
  "Other Domains",
] as const;

export type DomainOption = (typeof DOMAIN_OPTIONS)[number];

/** The two audience nav items, their landing page, and contact-form tab. */
export const SEGMENT_NAV = [
  { label: "For model builders", segment: "lab", href: "/model-builders" },
  { label: "For data providers", segment: "data_provider", href: "/data-providers" },
] as const;

/** Build a deep link into /contact that pre-selects a tab and (optionally) a domain. */
export function contactHref(segment: string, domain?: string): string {
  const params = new URLSearchParams({ for: segment });
  if (domain) params.set("domain", domain);
  return `/contact?${params.toString()}`;
}
