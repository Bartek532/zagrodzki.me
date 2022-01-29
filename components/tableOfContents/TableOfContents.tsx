import { memo } from "react";
import cn from "classnames";
import Link from "next/link";

import styles from "./tableOfContents.module.scss";

type TableOfContentsProps = {
  readonly contents?: {
    readonly text: string | null;
    readonly id: string;
    readonly level: string;
  }[];
  readonly currentActiveHeaderId: string;
};

export const TableOfContents = memo<TableOfContentsProps>(({ contents, currentActiveHeaderId }) => {
  return (
    <aside className={styles.aside}>
      <h2 className={styles.title}>table of contents</h2>
      <nav className={styles.nav}>
        <Link href="#introduction">
          <a className={cn(styles.link, styles.H2, { [styles.active]: currentActiveHeaderId === "introduction" })}>
            Introduction
          </a>
        </Link>
        {contents
          ? contents.map((content) => (
              <Link href={`#${content.id}`} key={content.id}>
                <a
                  className={cn(styles.link, styles[content.level], {
                    [styles.active]: currentActiveHeaderId === content.id,
                  })}
                >
                  {content.text}
                </a>
              </Link>
            ))
          : null}
      </nav>
    </aside>
  );
});

TableOfContents.displayName = "TableOfContents";
