import { memo } from "react";
import Link from "next/link";

import type { Post } from "types";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./latestPostTile.module.scss";

type LatestPostTileProps = {
  readonly post: Post;
};

export const LatestPostTile = memo<LatestPostTileProps>(({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a className={styles.link}>
        <article className={styles.article}>
          <div className={styles.info}>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.description}>{post.excerpt}</p>

            <div className={styles.additional}>
              <div className={styles.timeToRead}>{Math.round(post.timeToRead)} minutes read</div>
              <div className={styles.more}>
                Read more
                <span className={styles.arrow}>
                  <Arrow />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.image} style={{ backgroundImage: `url(${post.image})` }}></div>
        </article>
      </a>
    </Link>
  );
});

LatestPostTile.displayName = "LatestPostTile";
