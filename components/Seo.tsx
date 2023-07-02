import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { memo } from "react";

import {
  HOST,
  SITE_TITLE_TEMPLATE,
  SITE_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE_URL,
} from "utils/consts";

import type { Author } from "types";

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly author?: Author;
  readonly type?: "website" | "article";
  readonly imageUrl?: string;
  readonly publishedAt?: string;
}

export const Seo = memo<SeoProps>(
  ({
    title,
    description = DEFAULT_DESCRIPTION,
    imageUrl = DEFAULT_IMAGE_URL,
    author,
    type = "website",
    publishedAt,
  }) => {
    const { asPath } = useRouter();
    const canonical = `${HOST}${asPath}`.trim().replace(/\/$/, "");

    return (
      <>
        <NextSeo
          title={title ? SITE_TITLE_TEMPLATE.replace("%s", title) : SITE_TITLE}
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
            images: [
              {
                width: 1200,
                height: 880,
                alt: title,
                url: `${HOST}${imageUrl}`,
              },
            ],
            ...(type === "article"
              ? { article: { publishedTime: publishedAt, authors: [author!] } }
              : {}),
          }}
        />
        {type === "article" ? (
          <ArticleJsonLd
            url={canonical}
            title={title || ""}
            description={description}
            datePublished={publishedAt!}
            dateModified={publishedAt}
            authorName={author!}
            publisherName="Bartosz Zagrodzki"
            publisherLogo="/regular-android-icon-192x192.png"
            images={[`${HOST}${imageUrl}`]}
          />
        ) : null}
        <Head>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Bartosz Zagrodzki &raquo; Posts feed"
            href={`${HOST}/feed.xml`}
          />
          <link
            rel="alternate"
            type="application/json"
            title="Bartosz Zagrodzki &raquo; Posts feed"
            href={`${HOST}/feed.json`}
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/regular-apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/regular-apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/regular-apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/regular-apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/regular-apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/regular-apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/regular-apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/regular-apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/regular-apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/regular-android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#F7F1F3" />
          <meta
            name="msapplication-TileImage"
            content="/regular-ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#855B52" />
        </Head>
      </>
    );
  },
);

Seo.displayName = "Seo";
