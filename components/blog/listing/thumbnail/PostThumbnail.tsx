import { motion } from "framer-motion";
import Link from "next/link";
import { memo } from "react";

import { Skeleton } from "components/common/skeleton/Skeleton";
import { allCategories } from "data/categories";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./postThumbnail.module.scss";

import type { Post } from "types";

interface PostThumbnailProps {
  readonly post: Post;
}

export const PostThumbnail = memo<PostThumbnailProps>(({ post }) => (
  <Link href={`/blog/${post.slug}`}>
    <motion.article className={styles.post} layout>
      <motion.h2 className={styles.title} layoutId={`title-container-${post.slug}`}>
        {post.title}
      </motion.h2>
      <motion.p className={styles.excerpt} layoutId={`excerpt-container-${post.slug}`}>
        {post.excerpt}
      </motion.p>
      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <span className={styles.category}>
            {allCategories.find((c) => c.slug === post.category)?.name}
          </span>
          •<span className={styles.time}>{Math.round(post.timeToRead)} minutes</span>
        </div>
        <div className={styles.more}>
          Read more
          <span className={styles.arrow}>
            <Arrow />
          </span>
        </div>
      </div>
    </motion.article>
  </Link>
));

export const PostThumbnailSkeleton = () => <Skeleton h={17} />;

PostThumbnail.displayName = "PostThumbnail";
