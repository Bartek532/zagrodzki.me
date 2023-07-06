import { memo } from "react";

import { Footer } from "components/layout/footer/Footer";

import { Header } from "./header/Header";
import styles from "./layout.module.scss";

interface LayoutProps {
  readonly children: React.ReactNode;
}

export const Layout = memo<LayoutProps>(({ children }) => (
  <>
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main} id="main">
        {children}
      </main>
    </div>
    <Footer />
  </>
));

Layout.displayName = "Layout";
