import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Suspense, memo } from "react";

import { resourceRoutes } from "data/routes";
import { RESOURCE_TYPE, Resource } from "types";
import { HOST } from "utils/consts";

import { Edit } from "./edit/Edit";
import styles from "./footer.module.scss";
import { Share } from "./share/Share";
import { Views } from "./views/Views";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

type FooterProps = {
  readonly resource: Resource;
};

export const Footer = memo<FooterProps>(({ resource }) => {
  const url = `${HOST}/${resourceRoutes[resource.type]}/${resource.slug}`;

  return (
    <>
      {resource.type === RESOURCE_TYPE.POST ? (
        <div className={styles.date}>
          Published on {dayjs(resource.publishedAt, "DD-MM-YYYY").format("Do MMMM, YYYY")}
        </div>
      ) : null}
      <Suspense fallback={null}>
        <Views slug={resource.slug} type={resource.type} />
      </Suspense>
      <div className={styles.links}>
        <Edit href={`/${resourceRoutes[resource.type]}/${resource.slug}`} />
        <Share href={url} title={resource.title} />
      </div>
    </>
  );
});

Footer.displayName = "Footer";
