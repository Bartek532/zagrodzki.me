import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-EN" dir="ltr">
        <Head>
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GT-Walsheim-Black.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GT-Walsheim-Bold.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GT-Walsheim-Medium.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/GT-Walsheim-Regular.woff2"
          />
          <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/fonts/Kenfolg.otf" />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script defer src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`} />
          <script
            defer
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}', {
              page_path: window.location.pathname
            });
          `.trim(),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
