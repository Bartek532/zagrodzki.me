import { memo, Fragment } from "react";

import { SuperLink } from "components/common/link/SuperLink";
import RightArrow from "public/svg/right-arrow.svg";

import styles from "./breadcrumbs.module.scss";

interface BreadcrumbsProps {
  readonly routes: { path: string; name: string }[];
}

export const Breadcrumbs = memo<BreadcrumbsProps>(({ routes }) => (
  <div className={styles.breadcrumbs}>
    {routes.map((route, index) => (
      <Fragment key={route.path}>
        <SuperLink href={route.path} className={styles.link}>
          {route.name}
        </SuperLink>
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
