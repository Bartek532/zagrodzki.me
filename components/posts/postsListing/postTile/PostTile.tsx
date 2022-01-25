import styles from "./postTile.module.scss";
import { memo } from "react";
import type { Post } from "types";
import Link from "next/link";
import Arrow from "public/svg/right-top-arrow.svg";

type PostTileProps = {
  readonly post: Post;
};

export const PostTile = memo<PostTileProps>(({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <article className={styles.post}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.info}>
            <div className={styles.mainInfo}>
              <span className={styles.category}>{post.category}</span>|
              <span className={styles.time}>{post.timeToRead} minutes</span>
            </div>
            <div className={styles.more}>
              Read more
              <span className={styles.arrow}>
                <Arrow />
              </span>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
});

PostTile.displayName = "PostTile";
