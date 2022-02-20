import { memo } from "react";
import NextLink from "next/link";

import RightTopArrow from "public/svg/right-top-arrow.svg";

import styles from "./link.module.scss";

type LinkProps = {
  readonly children: React.ReactNode;
  readonly href: string;
};

export const Link = memo<LinkProps>(({ children, href }) => {
  const isLinkExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");

  return (
    <NextLink href={href}>
      <a className={styles.link} rel={isLinkExternal ? "noreferrer noopener" : undefined} target="_blank">
        <span className={styles.text}>{children}</span>
        <span className={styles.icon}>
          &#xfeff;
          <RightTopArrow />
        </span>
      </a>
    </NextLink>
  );
});

Link.displayName = "Link";
