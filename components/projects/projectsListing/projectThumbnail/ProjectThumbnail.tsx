import styles from "./projectThumbnail.module.scss";
import { memo } from "react";
import { Project } from "types";
import Image from "next/image";
import Link from "next/link";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";

type ProjectThumbnailProps = {
  readonly project: Project;
  readonly blurDataURL: string;
};

export const ProjectThumbnail = memo<ProjectThumbnailProps>(({ project, blurDataURL }) => {
  const imageVariants = {
    hover: {
      scale: 1.05,
    },
  };

  return (
    <AnimatePresence>
      <Link href={`/projects/${project.slug}`} passHref>
        <motion.a className={styles.thumbnail} whileHover="hover">
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
            <motion.p className={styles.description} layoutId={`description-container-${project.slug}`}>
              {project.description}
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
    </AnimatePresence>
  );
});

ProjectThumbnail.displayName = "ProjectThumbnail";
