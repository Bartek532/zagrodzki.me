import Link from "next/link";
import { memo, Fragment } from "react";

import RightArrow from "public/svg/right-arrow.svg";

import styles from "./breadcrumbs.module.scss";

interface BreadcrumbsProps {
  readonly routes: { path: string; name: string }[];
}

export const Breadcrumbs = memo<BreadcrumbsProps>(({ routes }) => (
    <div className={styles.breadcrumbs}>
      {routes.map((route, index) => (
        <Fragment key={route.path}>
          <Link href={route.path} className={styles.link}>
            {route.name}
          </Link>
          {index !== routes.length - 1 ? (
            <div className={styles.separator}>
              <RightArrow />
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  ));

Breadcrumbs.displayName = "Breadcrumbs";
