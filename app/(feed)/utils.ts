import dayjs from "dayjs";
import { Feed } from "feed";

import { getPublishedPosts } from "@/lib/posts";
import { DEFAULT_DESCRIPTION, HOST, SITE_TITLE } from "@/utils/consts";

export const getFeed = () => {
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
      rss: `${HOST}/feed.xml`,
      json: `${HOST}/feed.json`,
    },
    language: "en",
    author: {
      name: SITE_TITLE,
      link: HOST,
    },
  });

  posts.forEach(({ slug, title, excerpt, image, author, publishedAt, modifiedAt }) => {
    feed.addItem({
      title,
      id: `${HOST}/blog/${slug}`,
      description: excerpt,
      link: `${HOST}/blog/${slug}`,
      image: `${HOST}/${image}`,
      author: [{ name: author }],
      date: new Date(dayjs(modifiedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
      published: new Date(dayjs(publishedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
    });
  });

  return feed;
};
