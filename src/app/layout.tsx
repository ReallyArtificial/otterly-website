import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

/* Inter for body — superior optical spacing at 14–18px reading sizes.
   Variable font for best performance. */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Geist Mono stays for code and technical text — it has the right personality */
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "otterly · Ollama for Claude",
  description:
    "Stop paying twice for the same brain. otterly turns your Claude Code subscription into a local, OpenAI-compatible API. No keys. No per-token bill. Just localhost.",
  icons: { icon: "/favicon.svg" },
  /* Theme color for browser chrome — matches cream palette */
  other: {
    "theme-color": "#f8f5ed",
  },
  openGraph: {
    title: "otterly · Ollama for Claude",
    description:
      "Stop paying twice for the same brain. otterly turns your Claude Code subscription into a local, OpenAI-compatible API.",
    type: "website",
    siteName: "otterly",
  },
  twitter: {
    card: "summary_large_image",
    title: "otterly · Ollama for Claude",
    description:
      "Stop paying twice for the same brain. otterly turns your Claude Code subscription into a local, OpenAI-compatible API.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      {/* viewport-fit=cover for notched devices */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
