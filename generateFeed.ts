import fs from "fs";

import dayjs from "dayjs";
import { Feed } from "feed";

import type { Author } from "types";

import { getPublishedPosts } from "./lib/posts";
import { SITE_TITLE, DEFAULT_DESCRIPTION } from "./utils/consts";

function run() {
  const publicUrl = `https://${process.env.NEXT_PUBLIC_HOST ?? process.env.NEXT_PUBLIC_VERCEL_URL}`;

  const posts = getPublishedPosts();
  const feed = new Feed({
    title: SITE_TITLE,
    link: publicUrl,
    id: publicUrl,
    description: DEFAULT_DESCRIPTION,
    image: `${publicUrl}/regular-android-icon-192x192.png`,
    favicon: `${publicUrl}/favicon.ico`,
    copyright: `${new Date().getFullYear()} Bartosz Zagrodzki`,
    updated: new Date(),
    generator: SITE_TITLE,
    feedLinks: {
      rss: `${publicUrl}/feed`,
    },
    language: "en",
    author: {
      name: SITE_TITLE,
      link: publicUrl,
    },
  });

  posts.map(({ slug, title, excerpt, image, author, publishedAt }) => {
    feed.addItem({
      title,
      id: slug,
      description: excerpt,
      link: `${publicUrl}/blog/${slug}`,
      image: `${publicUrl}/${image}`,
      author: [{ name: author }],
      date: new Date(dayjs(publishedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
    });
  });

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
}

run();
