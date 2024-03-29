import clsx from "clsx";
import dynamic from "next/dynamic";
import { memo } from "react";

import styles from "./highlight.module.scss";

interface HighlightProps {
  readonly variant: "success" | "error" | "warning";
  readonly title: string;
  readonly children: React.ReactNode;
}

export const Highlight = memo<HighlightProps>(({ variant, title, children }) => {
  const Icon = dynamic(() => import(`public/svg/${variant}.svg`));

  return (
    <aside className={clsx(styles.highlight, styles[variant])}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <strong className={styles.title}>{title}</strong>
      <div className={styles.content}>{children}</div>
    </aside>
  );
});

Highlight.displayName = "Highlight";
