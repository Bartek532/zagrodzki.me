"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo, useRef, useEffect, useCallback, useMemo } from "react";
import { renderToString } from "react-dom/server";

import { Image } from "components/common/image/Image";
import { Author } from "components/mdx/author/Author";
import * as CustomPostsComponents from "components/mdx/custom";
import { Edit } from "components/mdx/edit/Edit";
import { Heading } from "components/mdx/heading/Heading";
import { Highlight } from "components/mdx/highlight/Highlight";
import { Image as ArticleImage } from "components/mdx/image/Image";
import { Info } from "components/mdx/info/Info";
import { Link } from "components/mdx/link/Link";
import { Pre } from "components/mdx/pre/Pre";
import { Quote } from "components/mdx/quote/Quote";
import { Sandbox } from "components/mdx/sandbox/Sandbox";
import { Share } from "components/mdx/share/Share";
import { resourceRoutes } from "data/routes";
import { useRunningHeader } from "hooks/useRunningHeader";
import { useTheme } from "providers/ThemeProvider";
import Arrow from "public/svg/right-top-arrow.svg";
import { RESOURCE_TYPE, type Resource } from "types";
import { HOST } from "utils/consts";
import { getHeadings, normalizeViewsCount } from "utils/functions";

import styles from "./mdx.module.scss";
import { TableOfContents } from "./tableOfContents/TableOfContents";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const imageVariants = {
  hover: {
    scale: 1.05,
  },
};

interface MdxProps {
  readonly resource: Resource;
  readonly content: MDXRemoteSerializeResult;
  readonly views: number;
}

interface HeadingComponentProps {
  readonly children: string;
}

export const Mdx = memo<MdxProps>(({ resource, content, views }) => {
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const { id, setRunningHeader } = useRunningHeader();
  const url = `${HOST}/${resourceRoutes[resource.type]}/${resource.slug}`;
  const { theme } = useTheme();

  const getHeadingProps = useCallback(
    ({ children }: HeadingComponentProps) => ({
      slug: children,
      url,
    }),
    [url],
  );

  const customMdxComponents = useMemo(
    () =>
      ({
        h2: (props: HeadingComponentProps) => (
          <Heading level="h2" {...getHeadingProps(props)}></Heading>
        ),
        h3: (props: HeadingComponentProps) => (
          <Heading level="h3" {...getHeadingProps(props)}></Heading>
        ),
        h4: (props: HeadingComponentProps) => (
          <Heading level="h4" {...getHeadingProps(props)}></Heading>
        ),
        h5: (props: HeadingComponentProps) => (
          <Heading level="h5" {...getHeadingProps(props)}></Heading>
        ),
        h6: (props: HeadingComponentProps) => (
          <Heading level="h6" {...getHeadingProps(props)}></Heading>
        ),
        Image: ArticleImage,
        Link,
        Quote,
        Highlight,
        Sandbox: ({ id }: { id: string }) => <Sandbox id={id} theme={theme as "light" | "dark"} />,
        pre: Pre,
        ...CustomPostsComponents,
      } as unknown as Record<string, React.ReactNode>),
    [theme, getHeadingProps],
  );

  const contentString = renderToString(<MDXRemote {...content} components={customMdxComponents} />);

  useEffect(() => {
    setRunningHeader(contentElRef.current);
  }, [resource]);

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Info resource={resource} />
      </header>
      <div className={styles.main}>
        <TableOfContents contents={getHeadings(contentString)} currentActiveHeaderId={id} />
        <div className={styles.wrapper}>
          {resource.type === RESOURCE_TYPE.PROJECT ? (
            <motion.a
              layoutId={`image-container-${resource.slug}`}
              className={styles.thumbnail}
              href={resource.url}
              key="thumbnail"
              whileHover="hover"
              variants={imageVariants}
              target="_blank"
            >
              <Image src={resource.image} alt={resource.title} width={1200} height={880} />
              <div className={styles.arrow}>
                <Arrow />
              </div>
            </motion.a>
          ) : (
            <div className={styles.thumbnail}>
              <Image src={resource.image} alt={resource.title} width={1200} height={880} />
            </div>
          )}

          <div className="content" ref={contentElRef}>
            <MDXRemote {...content} components={customMdxComponents} />
          </div>

          {resource.type === RESOURCE_TYPE.POST ? (
            <div className={styles.date}>
              Published on {dayjs(resource.publishedAt, "DD-MM-YYYY").format("Do MMMM, YYYY")}
            </div>
          ) : null}
          <span className={styles.views}>{normalizeViewsCount(views)} views</span>

          <div className={styles.links}>
            <Edit
              href={`/${resource.type === RESOURCE_TYPE.PROJECT ? "projects" : "posts"}/${
                resource.slug
              }`}
            />
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
