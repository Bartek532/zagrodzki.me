import clsx from "clsx";
import { memo } from "react";

import { SuperLink } from "components/common/link/SuperLink";
import { Skeleton } from "components/common/skeleton/Skeleton";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./popularPosts.module.scss";

import type { Post } from "types";

interface PopularPostsProps {
  readonly posts: Post[];
}

export const PopularPosts = memo<PopularPostsProps>(({ posts }) => (
  <section className={styles.wrapper}>
    <h2 className={styles.title}>popular posts</h2>
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li key={post.slug} className={styles.post}>
          <span className={styles.icon}>
            <Arrow />
          </span>
          <SuperLink href={`/blog/${post.slug}`} target="blank">
            {post.title}
          </SuperLink>
        </li>
      ))}
    </ul>
  </section>
));

export const PopularPostsSkeleton = () => (
  <section className={styles.wrapper}>
    <Skeleton h={3} />
    <div className={clsx(styles.posts, styles.skeleton)}>
      {Array(7)
        .fill(null)
        .map((_, i) => (
          <Skeleton h={5} key={i} />
        ))}
    </div>
  </section>
);

PopularPosts.displayName = "PopularPosts";
