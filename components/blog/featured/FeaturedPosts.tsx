import { memo } from "react";

import styles from "./featuredPosts.module.scss";
import { FeaturedPost } from "./post/FeaturedPost";

import type { Post } from "types";

interface FeaturedPostsProps {
  readonly posts: Post[];
  readonly actualPostSlug: string;
}

export const FeaturedPosts = memo<FeaturedPostsProps>(({ posts, actualPostSlug }) => {
  const featuredPosts = posts.filter((post) => post.slug !== actualPostSlug).slice(0, 3);

  return (
    <section className={styles.posts}>
      <h2 className={styles.title}>Check my other posts 📚</h2>

      <div className={styles.wrapper}>
        {featuredPosts.map((featuredPost) => (
          <FeaturedPost post={featuredPost} key={featuredPost.slug} />
        ))}
      </div>
    </section>
  );
});

FeaturedPosts.displayName = "FeaturedPosts";
