import fs from "fs";
import path from "path";

import { getNewestPosts } from "../lib/posts";

function run() {
  const [post] = getNewestPosts();

  if (!post) return;

  const nextConfig = fs.readFileSync(path.join(__dirname, "../next.config.ts"), "utf8");

  const nextConfigWithNewPostRedirect = nextConfig.replace(
    /REPLACE_THE_NEWEST_POST_SLUG/g,
    post.slug,
  );

  fs.writeFileSync(path.join(__dirname, "../next.config.ts"), nextConfigWithNewPostRedirect);
}

run();
