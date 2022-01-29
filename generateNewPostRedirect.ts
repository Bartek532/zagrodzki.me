import fs from "fs";
import path from "path";

import { getNewestPosts } from "./lib/posts";

function run() {
  const [{ slug }] = getNewestPosts();

  const nextConfig = fs.readFileSync(path.join(__dirname, "next.config.js"), "utf8");

  const nextConfigWithNewPostRedirect = nextConfig.replace(/THE_NEWEST_POST_SLUG_HERE/g, slug);

  fs.writeFileSync(path.join(__dirname, "next.config.js"), nextConfigWithNewPostRedirect);
}

run();
