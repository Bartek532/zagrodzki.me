import { memo } from "react";
import Link from "next/link";

import { useTheme } from "context/ThemeContext";
import { Footer } from "components/footer/Footer";
import { Navbar } from "components/navbar/Navbar";
import { ThemeSwitcher } from "components/common/themeSwitcher/ThemeSwitcher";
import { routes } from "data/routes";
import Logo from "public/svg/logo.svg";
import PaperPlane from "public/svg/paper-plane.svg";

import styles from "./layout.module.scss";

type LayoutProps = {
  readonly children: React.ReactNode;
};

export const Layout = memo<LayoutProps>(({ children }) => {
  useTheme();

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <a href="#main" className={styles.skip}>
            skip to content
          </a>
          <Link href="/">
            <a className={styles.logo}>
              <span className="sr-only">home</span>
              <Logo />
            </a>
          </Link>
          <Navbar routes={routes} />
          <div className={styles.right}>
            <label className={styles.theme}>
              <ThemeSwitcher />
            </label>
            <Link href="/contact">
              <a className={styles.contact}>
                Contact
                <PaperPlane />
              </a>
            </Link>
          </div>
        </header>
        <main className={styles.main} id="main">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
});

Layout.displayName = "Layout";
