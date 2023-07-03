import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import slugify from "slugify";

import Clip from "public/svg/link.svg";

import styles from "./heading.module.scss";

import type { HeadingVariant } from "types";


interface HeadingProps {
  readonly slug: string;
  readonly level: HeadingVariant;
  readonly url: string;
}

export const Heading = memo<HeadingProps>(({ level: Tag, slug, url }) => {
  const id = slugify(slug, { lower: true });

  return (
    <Tag id={id} className={clsx(styles.heading, styles[Tag])}>
      <Link
        href={`#${id}`}
        id={id}
        aria-hidden="true"
        tabIndex={-1}
        className={styles.link}
      >
        <span className={styles.clip}>
          <Clip />
        </span>
      </Link>
      {slug}
    </Tag>
  );
});

Heading.displayName = "Heading";
