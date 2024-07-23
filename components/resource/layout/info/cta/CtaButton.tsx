import { memo } from "react";

import ContributeIcon from "public/svg/contribute.svg";
import FireIcon from "public/svg/fire.svg";
import { Project } from "types";

import styles from "./ctaButton.module.scss";

const BUTTONS = {
  live: {
    label: "Try live",
    icon: <FireIcon />,
    href: (project: Project) => project.url,
  },
  contribute: {
    label: "Contribute",
    icon: <ContributeIcon />,
    href: (project: Project) => project.repository,
  },
} as const;

interface CtaButtonProps {
  readonly project: Project;
  readonly type: keyof typeof BUTTONS;
}

export const CtaButton = memo<CtaButtonProps>(({ project, type }) => {
  const { label, icon, href } = BUTTONS[type];

  const link = href(project);

  if (!link) {
    return null;
  }

  return (
    <a href={link} className={styles.btn} target="_blank" rel="noopener noreferrer">
      <div className={styles.content}>
        <div className={styles.icon}>{icon}</div>
        {label}
      </div>
    </a>
  );
});

CtaButton.displayName = "CtaButton";
