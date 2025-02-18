import Link from "next/link";
import { Fragment, memo } from "react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  readonly routes: { path: string; name: string }[];
}

export const Breadcrumbs = memo<BreadcrumbsProps>(({ routes }) => (
  <Breadcrumb>
    <BreadcrumbList>
      {routes.map((route, index) => (
        <Fragment key={route.path}>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href={route.path}>{route.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index !== routes.length - 1 ? <BreadcrumbSeparator /> : null}
        </Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
));

Breadcrumbs.displayName = "Breadcrumbs";
