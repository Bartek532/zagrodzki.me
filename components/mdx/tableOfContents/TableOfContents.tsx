"use client";

import clsx from "clsx";
import { memo } from "react";

import styles from "./tableOfContents.module.scss";

interface TableOfContentsProps {
  readonly contents?:
    | {
        readonly text: string | null;
        readonly id: string;
        readonly level: string;
      }[]
    | undefined
    | null;
  readonly currentActiveHeaderId: string;
}

export const TableOfContents = memo<TableOfContentsProps>(({ contents, currentActiveHeaderId }) => (
  <aside className={styles.aside}>
    <h2 className={styles.title}>table of contents</h2>
    <nav className={styles.nav}>
      <a
        href="#introduction"
        className={clsx(
          styles.link,
          styles.H2,
          styles.active && {
            [styles.active]: currentActiveHeaderId === "introduction",
          },
        )}
      >
        Introduction
      </a>
      {contents
        ? contents.map((content) => (
            <a
              href={`#${content.id}`}
              key={content.id}
              className={clsx(
                styles.link,
                styles[content.level],
                styles.active && {
                  [styles.active]: currentActiveHeaderId === content.id,
                },
              )}
            >
              {content.text}
            </a>
          ))
        : null}
    </nav>
  </aside>
));

TableOfContents.displayName = "TableOfContents";
