"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import styles from "./featuredPost.module.scss";

import type { Post } from "types";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const imageVariants = {
  hover: {
    scale: 1.05,
  },
};

interface FeaturedPostProps {
  readonly post: Post;
}

export const FeaturedPost = memo<FeaturedPostProps>(({ post }) => (
  <Link href={`/blog/${post.slug}`}>
    <motion.div className={styles.post} whileHover="hover">
      <motion.div className={styles.image} variants={imageVariants}>
        <Image src={post.image} alt={post.title} width={1200} height={880} />
      </motion.div>
      <div className={styles.info}>
        <time className={styles.time}>
          {dayjs(post.publishedAt, "DD-MM-YYYY").format("MMMM Do, YYYY")}
        </time>
        •<span className={styles.timeToRead}>{Math.round(post.timeToRead)} minutes read</span>
      </div>
      <h3 className={styles.title}>{post.title}</h3>
    </motion.div>
  </Link>
));

FeaturedPost.displayName = "FeaturedPost";
