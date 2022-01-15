import styles from "./latestPostTile.module.scss";
import { memo } from "react";
import type { Post } from "types";
import Arrow from "public/svg/right-top-arrow.svg";
import { motion } from "framer-motion";
import Link from "next/link";

type LatestPostTileProps = {
  readonly post: Post;
};

export const LatestPostTile = memo<LatestPostTileProps>(({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <motion.a className={styles.link} whileHover="hover">
        <article className={styles.article}>
          <div className={styles.info}>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.description}>{post.excerpt}</p>

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
          <motion.div className={styles.image} style={{ backgroundImage: `url(${post.image})` }}></motion.div>
        </article>
      </motion.a>
    </Link>
  );
});

LatestPostTile.displayName = "LatestPostTile";
