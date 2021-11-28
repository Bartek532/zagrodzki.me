import styles from "./layout.module.scss";
import { memo } from "react";
import { NextSeo } from "next-seo";
import { Navbar } from "components/navbar/Navbar";
import { routes } from "data/routes";

import { titleTemplate as defaultTitleTemplate } from "pages/_app";

type LayoutProps = {
  readonly children: React.ReactNode;
  readonly titleTemplate?: string;
  readonly title?: string;
};

export const Layout = memo<LayoutProps>(
  ({ children, title, titleTemplate = defaultTitleTemplate }) => {
    return (
      <div className={styles.wrapper}>
        <Navbar routes={routes} />
        {children}

        <NextSeo
          title={
            title ? titleTemplate.replace("%s", title) : titleTemplate.slice(4)
          }
        />
      </div>
    );
  }
);

Layout.displayName = "Layout";
