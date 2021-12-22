import { memo } from "react";
import cn from "classnames";
import type { HeadingVariant } from "types";
import styles from "./heading.module.scss";
import slugify from "slugify";

type HeadingProps = {
  readonly slug: string;
  readonly level: HeadingVariant;
  readonly url: string;
};

export const Heading = memo<HeadingProps>(({ level: Tag, slug, url }) => {
  const id = slugify(slug, { lower: true });

  return (
    <Tag id={id} className={cn(styles.heading, styles[Tag])}>
      <a id={id} href={`${url}/#${id}`} aria-hidden="true" tabIndex={-1}>
        <span></span>
      </a>
      {slug}
    </Tag>
  );
});

Heading.displayName = "Heading";
