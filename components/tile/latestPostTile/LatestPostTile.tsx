import { memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import type { Post } from "types";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./latestPostTile.module.scss";

type LatestPostTileProps = {
  readonly post: Post;
};

export const LatestPostTile = memo<LatestPostTileProps>(({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <motion.a className={styles.link} whileHover="hover">
        <article className={styles.article}>
          <div className={styles.info}>
            <motion.h2 layoutId={`title-container-${post.slug}`} className={styles.title}>
              {post.title}
            </motion.h2>
            <motion.p layoutId={`excerpt-container-${post.slug}`} className={styles.description}>
              {post.excerpt}
            </motion.p>

            <div className={styles.additional}>
              <div className={styles.timeToRead}>{post.timeToRead} minutes read</div>
              <div className={styles.more}>
                Read more
                <span className={styles.arrow}>
                  <Arrow />
                </span>
              </div>
            </div>
          </div>
          <motion.div
            className={styles.image}
            layoutId={`image-container-${post.slug}`}
            style={{ backgroundImage: `url(${post.image})` }}
          ></motion.div>
        </article>
      </motion.a>
    </Link>
  );
});

LatestPostTile.displayName = "LatestPostTile";
