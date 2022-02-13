import { memo } from "react";

import { Link } from "../link/Link";

import styles from "./share.module.scss";

interface ShareProps {
  readonly href: string;
  readonly title: string;
  readonly type: "project" | "post";
}

export const Share = memo<ShareProps>(({ href, title, type }) => {
  return (
    <div className={styles.share}>
      <Link href={`https://twitter.com/share?url=${href}&text=${title} -`}>
        Tweet this {type === "post" ? "article" : type}
      </Link>

      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${href}`}>Share on LinkedIn</Link>
    </div>
  );
});

Share.displayName = "Share";
