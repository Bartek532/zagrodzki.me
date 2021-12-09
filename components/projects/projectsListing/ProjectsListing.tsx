import styles from "./projectsListing.module.scss";
import { memo } from "react";
import type { Project } from "types";
import { ProjectThumbnail } from "components/projects/projectsListing/projectThumbnail/ProjectThumbnail";

type ProjectsListingProps = {
  readonly projects: Project[];
};

export const ProjectsListing = memo<ProjectsListingProps>(({ projects }) => {
  return (
    <div className={styles.projects}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.description}>
          Everything that I have built, alone or with someone 🔨
        </p>
      </div>
      {projects.map(project => (
        <ProjectThumbnail project={project} key={project.slug} />
      ))}
    </div>
  );
});

ProjectsListing.displayName = "ProjectsListing";
