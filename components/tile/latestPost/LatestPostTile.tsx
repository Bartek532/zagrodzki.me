import Link from "next/link";
import { memo } from "react";

import { Image } from "components/common/image/Image";
import Arrow from "public/svg/right-top-arrow.svg";

import styles from "./latestPostTile.module.scss";

import type { Post } from "types";

interface LatestPostTileProps {
  readonly post: Post;
}

export const LatestPostTile = memo<LatestPostTileProps>(({ post }) => (
  <Link href={`/blog/${post.slug}`}>
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
      <div className={styles.image}>
        <Image
          src={post.image}
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
    </article>
  </Link>
));

LatestPostTile.displayName = "LatestPostTile";
