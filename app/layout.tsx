import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Lets every other URL field below (canonical, OG image) be written relative.
  metadataBase: new URL(site.url),
  title: {
    // Brand first: the query we care about most is the brand name itself.
    default: "Kapital Grants — Non-dilutive Capital for Founders",
    template: `%s | ${site.name}`,
  },
  description:
    "Kapital Grants routes founders through grants, accelerators, and a vetted network of VCs and family offices. Non-dilutive capital to start, institutional capital to scale.",
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Opts into full-size image thumbnails and untruncated snippets, which
      // Google otherwise caps conservatively.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Kapital Grants — Non-dilutive Capital for Founders",
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kapital Grants — Non-dilutive Capital for Founders",
    description: site.description,
  },
  // Belt-and-braces alongside the public/google…html file: Search Console
  // accepts either, and the meta tag survives a host that stops serving
  // loose static files.
  verification: {
    google: "google67ac1efd18109122.html",
  },
};

/**
 * Organization + WebSite structured data. This is the highest-leverage part of
 * ranking for the brand name itself: it tells Google that "Kapital Grants" is
 * an entity, which name variants refer to it, and which URL is its home.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: ["KapitalGrants", "Kapital Grants Newsletter"],
      url: site.url,
      logo: `${site.url}/icon.svg`,
      email: site.email,
      description: site.description,
      slogan: site.tagline,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: browser extensions (password managers, RPA
    // tools, dark-mode addons) inject attributes onto <html> before React
    // hydrates, which React reports as a mismatch. This ignores attribute
    // diffs on this element only, not on the tree below it.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
