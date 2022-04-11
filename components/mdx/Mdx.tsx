import { memo, useRef, useEffect, useCallback, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import countapi from "countapi-js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";

import * as CustomPostsComponents from "components/mdx/custom";
import { useTheme } from "context/ThemeContext";
import { Author } from "components/mdx/author/Author";
import type { Project, Post } from "types";
import { getHeadings } from "utils/getHeadings";
import { useRunningHeader } from "hooks/useRunningHeader";
import Arrow from "public/svg/right-top-arrow.svg";
import { Image } from "components/mdx/image/Image";
import { Heading } from "components/mdx/heading/Heading";
import { Link } from "components/mdx/link/Link";
import { Edit } from "components/mdx/edit/Edit";
import { Share } from "components/mdx/share/Share";
import { Quote } from "components/mdx/quote/Quote";
import { Pre } from "components/mdx/pre/Pre";
import { Info } from "components/mdx/info/Info";
import { Highlight } from "components/mdx/highlight/Highlight";
import { Sandbox } from "components/mdx/sandbox/Sandbox";
import { ORIGIN } from "utils/consts";
import { normalizeViewsCount } from "utils/normalizeViewsCount";

import { TableOfContents } from "./tableOfContents/TableOfContents";
import styles from "./mdx.module.scss";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

type MdxProps = {
  readonly resource: Project | Post;
  readonly content: MDXRemoteSerializeResult<Record<string, unknown>>;
};

type HeadingComponentProps = {
  readonly children: string;
};

export const Mdx = memo<MdxProps>(({ resource, content }) => {
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const { id, setRunningHeader } = useRunningHeader(contentElRef.current);
  const url = `${process.env.NEXT_PUBLIC_URL}/${resource.type === "project" ? "projects" : "blog"}/${resource.slug}`;
  const { theme } = useTheme();
  const [views, setViews] = useState(0);

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
      Quote,
      Highlight,
      Sandbox: ({ id }: { id: string }) => <Sandbox id={id} theme={theme as "light" | "dark"} />,
      pre: Pre,
      ...CustomPostsComponents,
    }),
    [],
  );

  const contentString = renderToString(
    (<MDXRemote {...content} components={customMdxComponents} />) as React.ReactElement,
  );

  useEffect(() => {
    setRunningHeader(contentElRef.current);

    const hitView = async () => {
      const result = await countapi.hit(ORIGIN, resource.slug);
      setViews(result.value);
    };
    hitView();
  }, []);

  const imageVariants = {
    hover: {
      scale: 1.05,
    },
  };

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Info resource={resource} />
      </header>
      <div className={styles.main}>
        <TableOfContents contents={getHeadings(contentString)} currentActiveHeaderId={id} />
        <div className={styles.wrapper}>
          {resource.type === "project" ? (
            <motion.a
              layoutId={`image-container-${resource.slug}`}
              className={styles.thumbnail}
              href={resource.url}
              key="thumbnail"
              whileHover="hover"
              variants={imageVariants}
              target="_blank"
            >
              <NextImage src={resource.image} alt={resource.title} width={1200} height={880} />
              <div className={styles.arrow}>
                <Arrow />
              </div>
            </motion.a>
          ) : (
            <div className={styles.thumbnail}>
              <NextImage src={resource.image} alt={resource.title} width={1200} height={880} />
            </div>
          )}

          <div className="content" ref={contentElRef}>
            <MDXRemote {...content} components={customMdxComponents} />
          </div>

          {resource.type === "post" ? (
            <div className={styles.date}>
              Published on {dayjs(resource.publishedAt, "DD-MM-YYYY").format("Do MMMM, YYYY")}
            </div>
          ) : null}
          <div className={styles.views}>{normalizeViewsCount(views)} views</div>

          <div className={styles.links}>
            <Edit href={`/${resource.type === "project" ? "projects" : "posts"}/${resource.slug}`} />
            <Share href={url} title={resource.title} type={resource.type} />
          </div>

          <div className={styles.author}>
            <Author name={resource.author} />
          </div>
        </div>
      </div>
    </article>
  );
});

Mdx.displayName = "Mdx";
