import styles from "./link.module.scss";
import { memo } from "react";
import RightTopArrow from "public/svg/right-top-arrow.svg";

type LinkProps = {
  readonly children: React.ReactNode;
  readonly href: string;
};

export const Link = memo<LinkProps>(({ children, href }) => {
  return (
    <a className={styles.link} rel="noreferrer noopener" href={href}>
      {children}
      <span className={styles.icon}>
        <RightTopArrow />
      </span>
    </a>
  );
});

Link.displayName = "Link";
