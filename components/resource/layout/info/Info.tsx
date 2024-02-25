"use client";

import { motion } from "framer-motion";
import { memo } from "react";

import { RESOURCE_TYPE, type Resource } from "types";

import { Breadcrumbs } from "./breadcrumbs/Breadcrumbs";
import { GithubButton } from "./github-button/GithubButton";
import styles from "./info.module.scss";
import { getBreadcrumbs } from "./utils/getBreadcrumbs";

interface InfoProps {
  readonly resource: Resource;
}

export const Info = memo<InfoProps>(({ resource }) => (
  <>
    <div className={styles.info}>
      <motion.div className={styles.breadcrumbs} animate={{ x: [-70, 0], opacity: [0.5, 1] }}>
        <Breadcrumbs
          routes={getBreadcrumbs(
            resource.type,
            resource.type === RESOURCE_TYPE.POST ? resource.category : undefined,
          )}
        />
      </motion.div>
      <motion.h1 layoutId={`title-container-${resource.slug}`} className={styles.title}>
        {resource.title}
      </motion.h1>
      <motion.p layoutId={`excerpt-container-${resource.slug}`} className={styles.excerpt}>
        {resource.excerpt}
      </motion.p>
    </div>

    {resource.type === RESOURCE_TYPE.PROJECT ? (
      <motion.div className={styles.github} animate={{ x: [100, 0], opacity: [0, 1] }}>
        <GithubButton type="star" url={resource.repoUrl} title={resource.title} />
        <GithubButton type="fork" url={resource.repoUrl} title={resource.title} />
      </motion.div>
    ) : null}
  </>
));

Info.displayName = "Info";
