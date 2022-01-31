import { memo, useRef, useEffect, useCallback, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { motion } from "framer-motion";
import NextImage from "next/image";
import GitHubButton from "react-github-btn";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import type { Project, Post } from "types";
import { getHeadings } from "utils/getHeadings";
import { getBreadcrumbs } from "utils/getBreadcrumbs";
import { useRunningHeader } from "hooks/useRunningHeader";
import { useWindowSize } from "hooks/useWindowSize";
import { useLocalStorage } from "hooks/useLocalStorage";
import { TableOfContents } from "components/result/tableOfContents/TableOfContents";
import { Breadcrumbs } from "components/result/breadcrumbs/Breadcrumbs";
import Arrow from "public/svg/right-top-arrow.svg";
import { Image } from "components/mdx/image/Image";
import { Heading } from "components/mdx/heading/Heading";
import { Link } from "components/mdx/link/Link";

import styles from "./resultView.module.scss";

type ResultViewProps =
  | {
      readonly type: "project";
      readonly project: Project;
      readonly mdx: MDXRemoteSerializeResult<Record<string, unknown>>;
    }
  | {
      readonly type: "post";
      readonly post: Post;
      readonly mdx: MDXRemoteSerializeResult<Record<string, unknown>>;
    };

type HeadingComponentProps = {
  readonly children: string;
};

export const ResultView = memo<ResultViewProps>((props) => {
  const result = props.type === "project" ? props.project : props.post;
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const { width } = useWindowSize();
  const { id, setRunningHeader } = useRunningHeader(contentElRef.current);
  const url = `${process.env.NEXT_PUBLIC_URL}/${props.type === "project" ? "project" : "blog"}/${result.slug}`;
  const [theme] = useLocalStorage("theme", "system");

  const getHeadingProps = useCallback(({ children }: HeadingComponentProps) => {
    return {
      slug: children,
      url,
    };
  }, []);

  const customMdxComponents = useMemo(
    () => ({
      h2: (props: HeadingComponentProps) => <Heading level="h2" {...getHeadingProps(props)}></Heading>,
      h3: (props: HeadingComponentProps) => <Heading level="h3" {...getHeadingProps(props)}></Heading>,
      h4: (props: HeadingComponentProps) => <Heading level="h4" {...getHeadingProps(props)}></Heading>,
      h5: (props: HeadingComponentProps) => <Heading level="h5" {...getHeadingProps(props)}></Heading>,
      h6: (props: HeadingComponentProps) => <Heading level="h6" {...getHeadingProps(props)}></Heading>,
      Image,
      Link,
    }),
    [],
  );

  const contentString = renderToString(
    (<MDXRemote {...props.mdx} components={customMdxComponents} />) as React.ReactElement,
  );

  useEffect(() => {
    setRunningHeader(contentElRef.current);
  }, []);

  const imageVariants = {
    hover: {
      scale: 1.05,
    },
  };

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.info}>
          <motion.div className={styles.breadcrumbs} animate={{ x: [-100, 0], opacity: [0, 1] }}>
            <Breadcrumbs routes={getBreadcrumbs(props.type, props.type === "post" ? props.post.category : undefined)} />
          </motion.div>
          <motion.h1 layoutId={`title-container-${result.slug}`} className={styles.title}>
            {result.title}
          </motion.h1>
          <motion.p layoutId={`excerpt-container-${result.slug}`} className={styles.excerpt}>
            {result.excerpt}
          </motion.p>
        </div>

        {props.type === "project" ? (
          <motion.div className={styles.github} animate={{ x: [100, 0], opacity: [0, 1] }}>
            <GitHubButton
              href={props.project.repoUrl}
              data-icon="octicon-star"
              data-size={width! > 800 ? "large" : ""}
              aria-label={`Star ${result.title} on Github`}
              data-color-scheme={(theme === "system" ? "light: light; dark: dark;" : theme) || undefined}
            >
              Star
            </GitHubButton>

            <GitHubButton
              href={`${props.project.repoUrl}/fork`}
              data-icon="octicon-repo-forked"
              aria-label={`Fork ${result.title} on Github`}
              data-size={width! > 800 ? "large" : ""}
              data-color-scheme={(theme === "system" ? "light: light; dark: dark;" : theme) || undefined}
            >
              Fork
            </GitHubButton>
          </motion.div>
        ) : null}
      </header>
      <div className={styles.main}>
        <TableOfContents contents={getHeadings(contentString)} currentActiveHeaderId={id} />
        <div className={styles.wrapper}>
          {props.type === "project" ? (
            <motion.a
              layoutId={`image-container-${result.slug}`}
              className={styles.thumbnail}
              href={props.project.url}
              key="thumbnail"
              whileHover="hover"
              variants={imageVariants}
              target="_blank"
            >
              <NextImage src={result.image} alt={result.title} width={1200} height={880} />
              <div className={styles.arrow}>
                <Arrow />
              </div>
            </motion.a>
          ) : (
            <div className={styles.thumbnail}>
              <NextImage src={result.image} alt={result.title} width={1200} height={880} />
            </div>
          )}

          <div className="content" ref={contentElRef}>
            <MDXRemote {...props.mdx} components={customMdxComponents} />
          </div>
        </div>
      </div>
    </article>
  );
});

ResultView.displayName = "ResultView";
