import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import slugify from "slugify";

import Clip from "public/svg/link.svg";

import styles from "./heading.module.scss";

import type { HeadingVariant } from "types";

interface HeadingProps {
  readonly children: string;
  readonly level: HeadingVariant;
}

export const Heading = memo<HeadingProps>(({ level: Tag, children }) => {
  const id = slugify(children, { lower: true });

  return (
    <Tag id={id} className={clsx(styles.heading, styles[Tag])}>
      <Link href={`#${id}`} id={id} aria-hidden="true" tabIndex={-1} className={styles.link}>
        <span className={styles.clip}>
          <Clip />
        </span>
      </Link>
      {children}
    </Tag>
  );
});

Heading.displayName = "Heading";
