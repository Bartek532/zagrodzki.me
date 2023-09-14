import { memo } from "react";

import ForkIcon from "public/svg/fork.svg";
import StarIcon from "public/svg/star.svg";

import styles from "./githubButton.module.scss";

const BUTTONS = {
  star: {
    label: "Star",
    icon: <StarIcon />,
    suffix: "",
  },
  fork: {
    label: "Fork",
    icon: <ForkIcon />,
    suffix: "/fork",
  },
} as const;

interface GithubButtonProps {
  readonly url: string;
  readonly title: string;
  readonly type: keyof typeof BUTTONS;
}

export const GithubButton = memo<GithubButtonProps>(({ url, title, type }) => {
  const { label, suffix, icon } = BUTTONS[type];

  return (
    <a
      href={`${url}${suffix}`}
      aria-label={`${label} ${title} on Github`}
      className={styles.btn}
      target="_blank"
    >
      <div className={styles.content}>
        <div className={styles.icon}>{icon}</div>
        {label}
      </div>
    </a>
  );
});

GithubButton.displayName = "GithubButton";
