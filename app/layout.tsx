import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title:
    "Kapital Grants | Non-dilutive capital to start. Institutional capital to scale.",
  description:
    "Kapital Grants is a deal-flow engine for founders. We route you through grants, accelerators, and our vetted network of VCs and family offices.",
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
      <body>{children}</body>
    </html>
  );
}
