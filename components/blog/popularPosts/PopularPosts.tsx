import { memo } from "react";
import Link from "next/link";

import type { Post } from "types";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./popularPosts.module.scss";

type PopularPostsProps = {
  readonly posts: Post[];
};

export const PopularPosts = memo<PopularPostsProps>(({ posts }) => {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>popular posts</h2>
      <ul className={styles.posts}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.post}>
            <span className={styles.icon}>
              <Arrow />
            </span>
            <Link href={`/blog/${post.slug}`}>
              <a target="blank">{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
});

PopularPosts.displayName = "PopularPosts";
