import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { memo } from "react";

import { Image } from "components/common/image/Image";
import { Skeleton } from "components/common/skeleton/Skeleton";
import { Project } from "types";

import styles from "./projectThumbnail.module.scss";

const imageVariants = {
  hover: {
    scale: 1.05,
  },
};

interface ProjectThumbnailProps {
  readonly project: Project;
  readonly featured?: boolean;
}

export const ProjectThumbnail = memo<ProjectThumbnailProps>(({ project, featured = false }) => (
  <Link href={`/work/${project.slug}`}>
    <motion.article
      className={clsx(
        styles.thumbnail,
        styles.archived && {
          [styles.archived]: project.archived,
        },
        styles.featured && { [styles.featured]: featured },
      )}
      whileHover="hover"
      layout
    >
      <div className={styles.wrapper}>
        {featured && (
          <div
            className={styles.blur}
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          ></div>
        )}
        <motion.div variants={imageVariants} key="thumbnail" className={styles.image}>
          <div className={styles.label}>
            {project.archived ? "Archived" : featured ? "Featured" : ""}
          </div>
          <Image src={project.image} alt={project.title} width={1200} height={880} />
        </motion.div>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.excerpt}>{project.excerpt}</p>
        <div className={styles.stack}>
          {project.tags.map((tag) => (
            <div className={styles.tech} key={tag}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  </Link>
));

export const ProjectThumbnailSkeleton = () => (
  <div className={styles.thumbnail}>
    <div className={styles.image}>
      <Skeleton h={32} />
    </div>
    <div className={styles.content}>
      <div className={styles.title}>
        <Skeleton h={4} w={15} />
      </div>
      <div className={styles.title}>
        <Skeleton h={2} w={37} />
      </div>
      <div className={styles.excerpt}>
        <Skeleton h={2} w={22} />
      </div>
      <div className={styles.stack}>
        {Array(5)
          .fill(null)
          .map((_, i) => (
            <Skeleton h={2.5} w={5} key={i} />
          ))}
      </div>
    </div>
  </div>
);

ProjectThumbnail.displayName = "ProjectThumbnail";
