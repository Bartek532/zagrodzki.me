import styles from "./projectView.module.scss";
import { memo } from "react";
import type { Project } from "types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GitHubButton from "react-github-btn";
import Arrow from "public/svg/right-top-arrow.svg";
import RightArrow from "public/svg/right-arrow.svg";
import Link from "next/link";
import { useWindowSize } from "hooks/useWindowSize";
import { Sidebar } from "components/sidebar/Sidebar";
import { renderToString } from "react-dom/server";
import { getHeadings } from "utils/getHeadings";

type ProjectViewProps = {
  readonly project: Project;
  readonly children: React.ReactNode;
};

export const ProjectView = memo<ProjectViewProps>(({ children, project }) => {
  const { width } = useWindowSize();
  const contentString = renderToString(children as React.ReactElement);
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.info}>
          <motion.div className={styles.path} animate={{ x: [-100, 0], opacity: [0, 1] }}>
            <Link href="/">
              <a className={styles.link}>Home</a>
            </Link>
            <div className={styles.separator}>
              <RightArrow />
            </div>
            <Link href="/projects">
              <a className={styles.link}>Projects</a>
            </Link>
          </motion.div>
          <motion.h1 layoutId={`title-container-${project.slug}`} className={styles.title}>
            {project.title}
          </motion.h1>
          <motion.p layoutId={`description-container-${project.slug}`} className={styles.description}>
            {project.description}
          </motion.p>
        </div>

        <motion.div className={styles.github} animate={{ x: [100, 0], opacity: [0, 1] }} layoutId="xd">
          <GitHubButton
            href={project.repoUrl}
            data-icon="octicon-star"
            data-size={width! > 800 ? "large" : ""}
            aria-label={`Star ${project.title} on Github`}
          >
            Star
          </GitHubButton>

          <GitHubButton
            href={`${project.repoUrl}/fork`}
            data-icon="octicon-repo-forked"
            aria-label={`Fork ${project.title} on Github`}
            data-size={width! > 800 ? "large" : ""}
          >
            Fork
          </GitHubButton>
        </motion.div>
      </header>
      <div className={styles.main}>
        <Sidebar contents={getHeadings(contentString)} />
        <div className={styles.wrapper}>
          <AnimatePresence>
            <motion.a
              layoutId={`image-container-${project.slug}`}
              className={styles.thumbnail}
              href={project.url}
              key="thumbnail"
            >
              <Image
                src={`/img/projects/${project.slug}/thumbnail.png`}
                alt={project.title}
                width={1200}
                height={880}
              />
              <div className={styles.arrow}>
                <Arrow />
              </div>
            </motion.a>
          </AnimatePresence>

          <div className="content">{children}</div>
        </div>
      </div>
    </article>
  );
});

ProjectView.displayName = "ProjectView";
