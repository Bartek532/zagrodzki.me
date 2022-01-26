import styles from "./layout.module.scss";
import { memo } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "components/navbar/Navbar";
import { routes } from "data/routes";
import Logo from "public/svg/logo.svg";
import PaperPlane from "public/svg/paper-plane.svg";
import Link from "next/link";

type LayoutProps = {
  readonly children: React.ReactNode;
};

export const Layout = memo<LayoutProps>(({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>
            <span className="sr-only">home</span>
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
      <main className={styles.main}>{children}</main>
    </div>
  );
});

Layout.displayName = "Layout";
