import { memo } from "react";
import GitHubButton from "react-github-btn";
import { motion } from "framer-motion";

import type { Post, Project } from "types";
import { getBreadcrumbs } from "utils/getBreadcrumbs";
import { useWindowSize } from "hooks/useWindowSize";
import { useLocalStorage } from "hooks/useLocalStorage";

import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs";

import styles from "./info.module.scss";

type InfoProps = {
  readonly resource: Project | Post;
};

export const Info = memo<InfoProps>(({ resource }) => {
  const [theme] = useLocalStorage("theme", "system");
  const { width } = useWindowSize();

  return (
    <>
      <div className={styles.info}>
        <motion.div className={styles.breadcrumbs} animate={{ x: [-100, 0], opacity: [0, 1] }}>
          <Breadcrumbs
            routes={getBreadcrumbs(resource.type, resource.type === "post" ? resource.category : undefined)}
          />
        </motion.div>
        <motion.h1 layoutId={`title-container-${resource.slug}`} className={styles.title}>
          {resource.title}
        </motion.h1>
        <motion.p layoutId={`excerpt-container-${resource.slug}`} className={styles.excerpt}>
          {resource.excerpt}
        </motion.p>
      </div>

      {resource.type === "project" ? (
        <motion.div className={styles.github} animate={{ x: [100, 0], opacity: [0, 1] }}>
          <GitHubButton
            href={resource.repoUrl}
            data-icon="octicon-star"
            data-size={width! > 800 ? "large" : ""}
            aria-label={`Star ${resource.title} on Github`}
            data-color-scheme={(theme === "system" ? "light: light; dark: dark;" : theme) || undefined}
          >
            Star
          </GitHubButton>

          <GitHubButton
            href={`${resource.repoUrl}/fork`}
            data-icon="octicon-repo-forked"
            aria-label={`Fork ${resource.title} on Github`}
            data-size={width! > 800 ? "large" : ""}
            data-color-scheme={(theme === "system" ? "light: light; dark: dark;" : theme) || undefined}
          >
            Fork
          </GitHubButton>
        </motion.div>
      ) : null}
    </>
  );
});

Info.displayName = "Info";
