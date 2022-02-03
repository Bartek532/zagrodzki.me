import { memo } from "react";

import { Link } from "../link/Link";

import styles from "./share.module.scss";

interface ShareProps {
  readonly href: string;
  readonly title: string;
}

export const Share = memo<ShareProps>(({ href, title }) => {
  return (
    <div className={styles.share}>
      <Link href={`https://twitter.com/share?url=${href}&text=${title}`}>Tweet this article</Link>
      <span className={styles.separator}>•</span>
      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${href}`}>Share on LinkedIn</Link>
    </div>
  );
});

Share.displayName = "Share";
