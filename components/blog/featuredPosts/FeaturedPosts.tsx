import { memo } from "react";

import type { Post } from "types";

import { FeaturedPost } from "./featuredPost/FeaturedPost";
import styles from "./featuredPosts.module.scss";

type FeaturedPostsProps = {
  readonly posts: Post[];
  readonly actualPostSlug: string;
};

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
