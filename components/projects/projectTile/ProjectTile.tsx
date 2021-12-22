import styles from "./projectTile.module.scss";
import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Arrow from "public/svg/right-top-arrow.svg";
import type { Project } from "types";

type ProjectTileProps = {
  project: Readonly<Project>;
};

export const ProjectTile = memo<ProjectTileProps>(({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <a className={styles.project}>
        <Image src={`/img/projects/${project.slug}/mockup.png`} alt="" layout="fill" objectFit="cover" />
        <div className={styles.arrow}>
          <Arrow />
        </div>
      </a>
    </Link>
  );
});

ProjectTile.displayName = "ProjectTile";
