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

export const metadata: Metadata = {
  title: "Infragrid — RL transformation, one slice at a time",
  description:
    "Infragrid is an RL transformation firm. Agents embedded in enterprise operations, one slice at a time.",
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
