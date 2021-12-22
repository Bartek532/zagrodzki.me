import styles from "./layout.module.scss";
import { memo } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "components/navbar/Navbar";
import { routes } from "data/routes";
import Logo from "public/svg/logo.svg";
import PaperPlane from "public/svg/paper-plane.svg";
import Link from "next/link";

import { titleTemplate as defaultTitleTemplate } from "pages/_app";

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly titleTemplate?: string;
  readonly title?: string;
};

export const Layout = memo<LayoutProps>(({ children, title, titleTemplate = defaultTitleTemplate }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <Navbar routes={routes} />
        <Link href="/contact">
          <a className={styles.contact}>
            Contact
            <PaperPlane />
          </a>
        </Link>
      </header>
      <div className={styles.main}>{children}</div>

      <NextSeo title={title ? titleTemplate.replace("%s", title) : titleTemplate.slice(4)} />
    </div>
  );
});

Layout.displayName = "Layout";
