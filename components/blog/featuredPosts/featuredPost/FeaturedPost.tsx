import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";

import type { Post } from "types";

import styles from "./featuredPost.module.scss";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

type FeaturedPostProps = {
  readonly post: Post;
};

export const FeaturedPost = memo<FeaturedPostProps>(({ post }) => {
  const imageVariants = {
    hover: {
      scale: 1.05,
    },
  };

  return (
    <Link href={"/blog/" + post.slug} passHref>
      <motion.a className={styles.post} whileHover="hover">
        <motion.div className={styles.image} variants={imageVariants}>
          <Image src={post.image} alt={post.title} width={1200} height={880} />
        </motion.div>
        <div className={styles.info}>
          <time className={styles.time}>{dayjs(post.publishedAt, "DD-MM-YYYY").format("MMMM Do, YYYY")}</time>•
          <span className={styles.timeToRead}>{Math.round(post.timeToRead)} minutes read</span>
        </div>
        <h3 className={styles.title}>{post.title}</h3>
      </motion.a>
    </Link>
  );
});

FeaturedPost.displayName = "FeaturedPost";
