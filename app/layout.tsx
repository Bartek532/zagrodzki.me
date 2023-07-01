import { Layout } from "components/layout/Layout";
import { AppProviders } from "providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {/* <AnalyticsWrapper /> */}
    </body>
  </html>;
}
