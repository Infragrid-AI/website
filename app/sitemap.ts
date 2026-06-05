import type { MetadataRoute } from "next";

const SITE_URL = "https://infragrid.ai";

// Static marketing routes. Keep in sync with the nav in components/Sidebar.tsx.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/platform", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
