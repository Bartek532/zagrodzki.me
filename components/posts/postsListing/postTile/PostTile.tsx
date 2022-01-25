import styles from "./postTile.module.scss";
import { memo } from "react";
import type { Post } from "types";
import Link from "next/link";
import Arrow from "public/svg/right-top-arrow.svg";
import { motion } from "framer-motion";

type PostTileProps = {
  readonly post: Post;
};

export const PostTile = memo<PostTileProps>(({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <motion.article className={styles.post} layoutId={`post-container-${post.slug}`}>
          <motion.h2 className={styles.title} layoutId={`title-container-${post.slug}`}>
            {post.title}
          </motion.h2>
          <motion.p className={styles.excerpt} layoutId={`excerpt-container-${post.slug}`}>
            {post.excerpt}
          </motion.p>
          <div className={styles.info}>
            <div className={styles.mainInfo}>
              <span className={styles.category}>{post.category}</span>•
              <span className={styles.time}>{post.timeToRead} minutes</span>
            </div>
            <div className={styles.more}>
              Read more
              <span className={styles.arrow}>
                <Arrow />
              </span>
            </div>
          </div>
        </motion.article>
      </a>
    </Link>
  );
});

PostTile.displayName = "PostTile";
