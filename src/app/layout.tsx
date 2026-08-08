import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { AppShell } from "@/components/layout/AppShell";
import { SITE } from "@/content/site";

/**
 * Inter is the only face the whole site needs, and it is self-hosted by
 * `next/font` at build time: no runtime request to Google, no render-blocking
 * stylesheet, and `display: swap` so text is never invisible while it loads.
 *
 * It is also load-bearing rather than decorative — see the note on
 * `--font-display` in `globals.css`. Two more families used to be loaded here,
 * Sora and JetBrains Mono, on every route; after the design change nothing
 * rendered either of them except the 404 page, so both were pure download cost.
 *
 * Courier Prime is still loaded, but only on the home route that uses it.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  // No `images` here: `opengraph-image.tsx` is a file convention, so Next emits
  // the `og:image` and `twitter:image` tags for it automatically. Listing one
  // here as well would ship both, and the previous entry pointed at `/og.svg` —
  // a file that no longer exists, and an SVG, which most social platforms refuse
  // to render even when it does.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // Matches the top of the page — the hero gradient's first stop — so the
  // browser chrome does not band against it on mobile.
  themeColor: "#030508",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="grain min-h-svh antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
