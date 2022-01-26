import Head from "next/head";
import { useRouter } from "next/router";
import { memo } from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";

import { HOST, SITE_TITLE_TEMPLATE, SITE_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE_URL } from "utils/consts";

type SeoProps = {
  readonly title?: string;
  readonly description?: string;
  readonly authors?: string[];
  readonly type?: "website" | "article";
  readonly imageUrl?: string;
  readonly publishedAt?: string;
};

export const Seo = memo<SeoProps>(
  ({
    title,
    description = DEFAULT_DESCRIPTION,
    imageUrl = DEFAULT_IMAGE_URL,
    authors,
    type = "website",
    publishedAt,
  }) => {
    const { asPath } = useRouter();
    const canonical = `${HOST}${asPath}`.trim().replace(/\/$/, "");

    return (
      <>
        <NextSeo
          titleTemplate={SITE_TITLE_TEMPLATE}
          title={title}
          defaultTitle={SITE_TITLE}
          description={description}
          canonical={canonical}
          robotsProps={{
            maxSnippet: -1,
            maxImagePreview: "large",
            maxVideoPreview: -1,
          }}
          openGraph={{
            type,
            url: canonical,
            locale: "en_EN",
            title,
            description,
            site_name: SITE_TITLE,
            images: [{ width: 1200, height: 880, alt: title, url: `${HOST}${imageUrl}` }],
            ...(type === "article" ? { article: { publishedTime: publishedAt, authors } } : {}),
          }}
        />
        {type === "article" ? (
          <ArticleJsonLd
            url={canonical}
            title={title || ""}
            description={description}
            datePublished={publishedAt as string}
            dateModified={publishedAt as string}
            authorName={authors as string[]}
            publisherName="Bartosz Zagrodzki"
            publisherLogo="/android-icon-192x192.png"
            images={[`${HOST}${imageUrl}`]}
          />
        ) : null}
        <Head>
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
      </>
    );
  },
);

Seo.displayName = "Seo";
