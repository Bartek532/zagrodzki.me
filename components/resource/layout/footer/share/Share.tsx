import { memo } from "react";

import { Link } from "components/common/link/Link";

import styles from "./share.module.scss";

interface ShareProps {
  readonly href: string;
  readonly title: string;
}

export const Share = memo<ShareProps>(({ href, title }) => (
  <div className={styles.share}>
    <Link href={`https://x.com/share?url=${href}&text=${title} -`}>Tweet about</Link>

    <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${href}`}>
      Share on LinkedIn
    </Link>
  </div>
));

Share.displayName = "Share";
