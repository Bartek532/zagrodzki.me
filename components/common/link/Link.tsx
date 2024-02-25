import NextLink from "next/link";
import { memo } from "react";

import RightTopArrow from "public/svg/right-top-arrow.svg";

import styles from "./link.module.scss";

interface LinkProps {
  readonly children: React.ReactNode;
  readonly href: string;
}

export const Link = memo<LinkProps>(({ children, href }) => {
  const isExternal = ["http://", "https://", "mailto:", "www."].some((start) =>
    href.startsWith(start),
  );

  return (
    <NextLink
      href={href}
      className={styles.link}
      rel={isExternal ? "noreferrer noopener" : undefined}
      target="_blank"
    >
      <span className={styles.text}>{children}</span>
      <span className={styles.icon}>
        &#xfeff;
        <RightTopArrow />
      </span>
    </NextLink>
  );
});

Link.displayName = "Link";
