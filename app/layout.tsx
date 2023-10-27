import clsx from "clsx";
import localFont from "next/font/local";

import { Analytics } from "components/common/analytics/Analytics";
import { Layout } from "components/layout/Layout";
import { DEFAULT_METADATA, DEFAULT_VIEWPORT } from "lib/metadata";
import { AppProviders } from "providers/AppProviders";

import "../styles/globals.scss";

export const metadata = DEFAULT_METADATA;
export const viewport = DEFAULT_VIEWPORT;

const walsheim = localFont({
  src: [
    {
      path: "../public/fonts/GT-Walsheim-Black.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/GT-Walsheim-Bold.woff2",
      weight: "bold",
    },
    {
      path: "../public/fonts/GT-Walsheim-Medium.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/GT-Walsheim-Regular.woff2",
      weight: "normal",
    },
  ],
  display: "swap",
  variable: "--font-walsheim",
});

const mono = localFont({
  src: "../public/fonts/LeagueMono-Regular.woff2",
  display: "swap",
  variable: "--font-mono",
});

const kenfolg = localFont({
  src: "../public/fonts/Kenfolg.otf",
  display: "swap",
  variable: "--font-kenfolg",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-EN"
      dir="ltr"
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#"
      itemType="http://schema.org/WebPage"
      className={clsx(walsheim.variable, mono.variable, kenfolg.variable)}
    >
      <body>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
