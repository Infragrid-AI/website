import type { Metadata } from "next";
import { EB_Garamond, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://infragrid.ai";
const TITLE = "Infragrid — RL transformation, one slice at a time";
const DESCRIPTION =
  "Infragrid is an RL transformation firm. Agents embedded in enterprise operations, one slice at a time.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Infragrid",
  keywords: [
    "Infragrid",
    "RL transformation",
    "reinforcement learning",
    "enterprise AI agents",
    "agentic automation",
    "on-prem AI",
  ],
  authors: [{ name: "Infragrid", url: SITE_URL }],
  alternates: { canonical: "/" },
  // opengraph-image.tsx / icon.tsx / apple-icon.tsx are picked up automatically
  // by Next and merged into the OG/Twitter image fields.
  openGraph: {
    type: "website",
    siteName: "Infragrid",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Organization structured data — helps Google build a Knowledge Panel / brand
// entity for the infragrid.ai domain.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Infragrid",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-512.png`,
  description: DESCRIPTION,
  email: "hello@infragrid.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <div className="site-shell">
          <Sidebar />
          <main className="page">{children}</main>
        </div>
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
