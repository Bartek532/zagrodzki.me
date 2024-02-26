import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Suspense, memo } from "react";

import { resourceRoutes } from "data/routes";
import { RESOURCE_TYPE, Resource } from "types";
import { HOST } from "utils/consts";

import { Likes } from "../likes/Likes";

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
      <div className={styles.wrapper}>
        <div className={styles.likes}>
          <Suspense fallback={null}>
            <Likes slug={resource.slug} type={resource.type} />
          </Suspense>
        </div>
        <div className={styles.info}>
          <div className={styles.date}>
            {dayjs(resource.modifiedAt, "DD-MM-YYYY").format("MMMM Do, YYYY")}
          </div>
          <Suspense fallback={null}>
            <Views slug={resource.slug} type={resource.type} />
          </Suspense>
        </div>
      </div>
      <div className={styles.links}>
        <Share href={url} title={resource.title} />
        <Edit
          href={`/${resource.type === RESOURCE_TYPE.POST ? "posts" : "projects"}/${resource.slug}`}
        />
      </div>
    </>
  );
});

Footer.displayName = "Footer";
