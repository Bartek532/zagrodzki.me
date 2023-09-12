import clsx from "clsx";

import { Analytics } from "components/common/analytics/Analytics";
import { Layout } from "components/layout/Layout";
import { walsheim, mono, kenfolg } from "lib/fonts";
import { DEFAULT_METADATA } from "lib/metadata";
import { AppProviders } from "providers/AppProviders";
import "styles/globals.scss";

export const metadata = DEFAULT_METADATA;

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
