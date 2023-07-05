import fs from "fs";

import dayjs from "dayjs";

import { Feed } from "feed";

import { getPublishedPosts } from "../lib/posts";
import { SITE_TITLE, DEFAULT_DESCRIPTION, ORIGIN } from "../utils/consts";

function run() {
  const posts = getPublishedPosts();
  const feed = new Feed({
    title: SITE_TITLE,
    link: ORIGIN,
    id: ORIGIN,
    description: DEFAULT_DESCRIPTION,
    image: `${ORIGIN}/regular-android-icon-192x192.png`,
    favicon: `${ORIGIN}/favicon.ico`,
    copyright: `${new Date().getFullYear()} ${SITE_TITLE}`,
    updated: new Date(),
    generator: SITE_TITLE,
    feedLinks: {
      rss: `${ORIGIN}/feed`,
    },
    language: "en",
    author: {
      name: SITE_TITLE,
      link: ORIGIN,
    },
  });

  posts.map(({ slug, title, excerpt, image, author, publishedAt }) => {
    feed.addItem({
      title,
      id: slug,
      description: excerpt,
      link: `${ORIGIN}/blog/${slug}`,
      image: `${ORIGIN}/${image}`,
      author: [{ name: author }],
      date: new Date(dayjs(publishedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
    });
  });

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
}

run();
