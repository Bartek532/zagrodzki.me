import { memo } from "react";

import styles from "./featuredPosts.module.scss";
import { FeaturedPost } from "./post/FeaturedPost";

import type { Post } from "types";

interface FeaturedPostsProps {
  readonly posts: Post[];
}

export const FeaturedPosts = memo<FeaturedPostsProps>(({ posts }) => (
  <section className={styles.posts}>
    <h2 className={styles.title}>Check my other posts 📚</h2>

    <div className={styles.wrapper}>
      {posts.map((featuredPost) => (
        <FeaturedPost post={featuredPost} key={featuredPost.slug} />
      ))}
    </div>
  </section>
));

FeaturedPosts.displayName = "FeaturedPosts";
