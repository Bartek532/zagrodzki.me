"use client";

import clsx from "clsx";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo } from "react";

import { CONTENT_ID } from "utils/consts";

import { useRunningHeader } from "./hooks/useRunningHeader";
import styles from "./tableOfContents.module.scss";
import { getHeadings } from "./utils/getHeadings";

interface TableOfContentsProps {
  readonly content: MDXRemoteSerializeResult;
}

export const TableOfContents = memo<TableOfContentsProps>(({ content }) => {
  const headings = getHeadings(content.compiledSource);
  const { id } = useRunningHeader(CONTENT_ID);

  return (
    <div>
      <h2 className={styles.title}>table of contents</h2>
      <nav className={styles.nav}>
        <a
          href="#introduction"
          className={clsx(
            styles.link,
            styles.H2,
            styles.active && {
              [styles.active]: id === "introduction",
            },
          )}
        >
          Introduction
        </a>
        {headings
          ? headings.map((heading) => (
              <a
                href={`#${heading.id}`}
                key={heading.content}
                className={clsx(
                  styles.link,
                  heading.level && styles["H" + heading.level],
                  styles.active && {
                    [styles.active]: id === heading.id,
                  },
                )}
              >
                {heading.content}
              </a>
            ))
          : null}
      </nav>
    </div>
  );
});

TableOfContents.displayName = "TableOfContents";
