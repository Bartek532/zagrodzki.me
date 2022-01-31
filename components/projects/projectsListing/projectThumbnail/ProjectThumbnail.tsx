import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Project } from "types";

import styles from "./projectThumbnail.module.scss";

type ProjectThumbnailProps = {
  readonly project: Project;
  readonly blurDataURL?: string;
};

export const ProjectThumbnail = memo<ProjectThumbnailProps>(({ project, blurDataURL }) => {
  const imageVariants = {
    hover: {
      scale: 1.05,
    },
  };

  return (
    <Link href={`/projects/${project.slug}`} passHref>
      <motion.a className={styles.thumbnail} whileHover="hover" layout>
        <motion.div
          className={styles.image}
          variants={imageVariants}
          layoutId={`image-container-${project.slug}`}
          key="thumbnail"
        >
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={880}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </motion.div>
        <div className={styles.content}>
          <motion.h2 className={styles.title} layoutId={`title-container-${project.slug}`}>
            {project.title}
          </motion.h2>
          <motion.p className={styles.excerpt} layoutId={`excerpt-container-${project.slug}`}>
            {project.excerpt}
          </motion.p>
          <motion.div className={styles.stack} layoutId={`stack-container-${project.slug}`}>
            {project.stack.map((tech) => (
              <div className={styles.tech} key={tech}>
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.a>
    </Link>
  );
});

ProjectThumbnail.displayName = "ProjectThumbnail";
