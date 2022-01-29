import { memo, Fragment } from "react";
import Link from "next/link";

import RightArrow from "public/svg/right-arrow.svg";

import styles from "./breadcrumbs.module.scss";

type BreadcrumbsProps = {
  readonly routes: { path: string; name: string }[];
};

export const Breadcrumbs = memo<BreadcrumbsProps>(({ routes }) => {
  return (
    <div className={styles.breadcrumbs}>
      {routes.map((route, index) => (
        <Fragment key={route.path}>
          <Link href={route.path}>
            <a className={styles.link}>{route.name}</a>
          </Link>
          {index !== routes.length - 1 ? (
            <div className={styles.separator}>
              <RightArrow />
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
});

Breadcrumbs.displayName = "Breadcrumbs";
