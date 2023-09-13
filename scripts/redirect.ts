import path from "path";

import { getNewestPosts } from "../lib/posts";

async function run() {
  const [post] = getNewestPosts();

  if (!post) return;

  const nextConfigFile = Bun.file(path.join(__dirname, "../next.config.mjs"));
  const nextConfig = await nextConfigFile.text();

  const nextConfigWithNewPostRedirect = nextConfig.replace(/THE_NEWEST_POST_SLUG_HERE/g, post.slug);

  await Bun.write(path.join(__dirname, "../next.config.mjs"), nextConfigWithNewPostRedirect);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
