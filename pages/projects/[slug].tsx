import type { NextPage, GetStaticProps } from "next";
import type { InferGetStaticPropsType } from "types";
import { Layout } from "components/layout/Layout";
import { ProjectView } from "components/projects/projectView/ProjectView";
import { getProjectsPaths, getProjectBySlug } from "lib/projects";
import { MDXRemote } from "next-mdx-remote";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { Image } from "components/mdx/image/Image";
import { Heading } from "components/mdx/heading/Heading";
import { Link } from "components/mdx/link/Link";
import { useCallback, useMemo } from "react";

type HeadingComponentProps = {
  readonly children: string;
};

type ImageProps = {
  readonly src: string;
  readonly alt: string;
};

const Project: NextPage = ({ transformedMdx, frontmatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, description, publishedAt, slug } = frontmatter;
  const url = `${process.env.NEXT_PUBLIC_URL}/projects/${slug}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_URL}/img/projects/${slug}/thumbnail.png`;

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
      img: ({ alt, src }: ImageProps) => <Image src={src} alt={alt ? alt : ""} />,
      Image,
      Link,
    }),
    [],
  );
  return (
    <>
      <NextSeo
        description={description}
        openGraph={{
          type: "article",
          article: {
            publishedTime: publishedAt,
          },
          url,
          title,
          description,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 880,
              alt: title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        authorName="Bartosz Zagrodzki"
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={description}
        publisherLogo="/android-icon-192x192.png"
        publisherName="Bartosz Zagrodzki"
        images={[imageUrl]}
        title={title}
        url={url}
      />
      <Layout title={frontmatter.title}>
        <main>
          <ProjectView project={frontmatter}>
            <MDXRemote {...transformedMdx} components={customMdxComponents} />
          </ProjectView>
        </main>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const { transformedMdx, frontmatter } = await getProjectBySlug(slug);

  return {
    props: {
      transformedMdx,
      frontmatter: {
        slug,
        ...frontmatter,
      },
    },
    revalidate: 10,
  };
};

export const getStaticPaths = () => {
  const paths = getProjectsPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Project;
