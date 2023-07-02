import { Analytics } from "components/common/analytics/Analytics";
import { Layout } from "components/layout/Layout";
import { AppProviders } from "providers/AppProviders";

import "../styles/globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-EN"
      dir="ltr"
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#"
      itemType="http://schema.org/WebPage"
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
