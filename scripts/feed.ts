import fs from "fs";

import dayjs from "dayjs";

import { Feed } from "feed";

import { getPublishedPosts } from "../lib/posts";
import { SITE_TITLE, DEFAULT_DESCRIPTION, HOST } from "../utils/consts";

function run() {
  const posts = getPublishedPosts();
  const feed = new Feed({
    title: SITE_TITLE,
    link: HOST,
    id: HOST,
    description: DEFAULT_DESCRIPTION,
    image: `${HOST}/regular-android-icon-192x192.png`,
    favicon: `${HOST}/favicon.ico`,
    copyright: `${new Date().getFullYear()} ${SITE_TITLE}`,
    updated: new Date(),
    generator: SITE_TITLE,
    feedLinks: {
      rss: `${HOST}/feed`,
    },
    language: "en",
    author: {
      name: SITE_TITLE,
      link: HOST,
    },
  });

  posts.map(({ slug, title, excerpt, image, author, publishedAt, modifiedAt }) => {
    feed.addItem({
      title,
      id: slug,
      description: excerpt,
      link: `${HOST}/blog/${slug}`,
      image: `${HOST}/${image}`,
      author: [{ name: author }],
      date: new Date(dayjs(modifiedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
      published: new Date(dayjs(publishedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
    });
  });

  fs.writeFileSync("./public/feed.xml", feed.rss2());
  fs.writeFileSync("./public/feed.json", feed.json1());
}

run();
