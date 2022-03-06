import { memo } from "react";
import cn from "classnames";
import slugify from "slugify";
import Link from "next/link";

import Clip from "public/svg/link.svg";
import type { HeadingVariant } from "types";

import styles from "./heading.module.scss";

type HeadingProps = {
  readonly slug: string;
  readonly level: HeadingVariant;
  readonly url: string;
};

export const Heading = memo<HeadingProps>(({ level: Tag, slug, url }) => {
  const id = slugify(slug, { lower: true });

  return (
    <Tag id={id} className={cn(styles.heading, styles[Tag])}>
      <Link href={`#${id}`} passHref>
        <a id={id} aria-hidden="true" tabIndex={-1} className={styles.link}>
          <span className={styles.clip}>
            <Clip />
          </span>
        </a>
      </Link>
      {slug}
    </Tag>
  );
});

Heading.displayName = "Heading";
