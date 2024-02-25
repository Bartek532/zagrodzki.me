import clsx from "clsx";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo } from "react";

import { Image } from "components/common/image/Image";
import Arrow from "public/svg/right-top-arrow.svg";
import { RESOURCE_TYPE, Resource as ResourceType } from "types";

import { Content } from "./content/Content";
import { TableOfContents } from "./content/tableOfContents/TableOfContents";
import { Author } from "./layout/author/Author";
import { Footer } from "./layout/footer/Footer";
import { Info } from "./layout/info/Info";
import styles from "./resource.module.scss";

type ResourceProps = {
  readonly metadata: ResourceType;
  readonly content: MDXRemoteSerializeResult;
};

export const Resource = memo<ResourceProps>(({ metadata, content }) => (
  <article className={styles.container}>
    <header className={styles.header}>
      <Info resource={metadata} />
    </header>
    <div className={styles.main}>
      <aside className={styles.aside}>
        <TableOfContents content={content} />
        {/* <Likes likes={likes} slug={resource.slug} type={resource.type} /> */}
      </aside>
      <div className={styles.wrapper}>
        {metadata.type === RESOURCE_TYPE.PROJECT ? (
          <a className={clsx(styles.thumbnail, styles.link)} href={metadata.url} target="_blank">
            <Image src={metadata.image} alt={metadata.title} width={1200} height={880} />
            <div className={styles.arrow}>
              <Arrow />
            </div>
          </a>
        ) : (
          <div className={styles.thumbnail}>
            <Image src={metadata.image} alt={metadata.title} width={1200} height={880} />
          </div>
        )}

        <Content content={content} />
        <Footer resource={metadata} />

        <div className={styles.author}>
          <Author name={metadata.author} />
        </div>
      </div>
    </div>
  </article>
));

Resource.displayName = "Resource";
