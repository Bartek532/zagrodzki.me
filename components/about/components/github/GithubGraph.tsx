"use client";

import Image from "next/image";

import { useTheme } from "providers/ThemeProvider";
import GithubGraphDark from "public/img/gh-graph-dark.png";
import GithubGraphLight from "public/img/gh-graph-light.png";

import styles from "./githubGraph.module.scss";

export const GithubGraph = () => {
  const { theme } = useTheme();
  return (
    <figure className={styles.graph}>
      <Image
        src={theme === "dark" ? GithubGraphDark : GithubGraphLight}
        alt="My Github contributions graph"
      />
      <figcaption className={styles.caption}>
        My Github graph looks impressing!
      </figcaption>
    </figure>
  );
};

GithubGraph.displayName = "GithubGraph";
