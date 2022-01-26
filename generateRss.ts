import { getPublishedPosts } from "./lib/posts";
import RSS from "rss";
import dayjs from "dayjs";
import fs from "fs";
import { HOST, SITE_TITLE } from "./utils/consts";

async function run() {
  const posts = getPublishedPosts();
  const feed = new RSS({
    title: SITE_TITLE,
    site_url: HOST,
    feed_url: `${HOST}/rss.xml`,
    language: "en",
    webMaster: "Bartosz Zagrodzki",
    managingEditor: "Bartosz Zagrodzki",
    copyright: `${new Date().getFullYear()} Bartosz Zagrodzki`,
  });

  posts.map(({ slug, title, excerpt, category, authors, publishedAt }) => {
    feed.item({
      title,
      description: excerpt,
      url: `${HOST}/blog/${slug}`,
      categories: [category],
      author: authors.join(", "),
      date: new Date(dayjs(publishedAt, "DD-MM-YYYY").format("MM-DD-YYYY")),
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync("./public/feed.xml", rss);

  console.log("RSS generated!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
