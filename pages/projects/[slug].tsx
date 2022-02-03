import type { NextPage, GetStaticProps } from "next";

import type { InferGetStaticPropsType } from "types";
import { Layout } from "components/layout/Layout";
import { Mdx } from "components/mdx/Mdx";
import { getProjectsPaths, getProjectBySlug } from "lib/projects";
import { Seo } from "components/Seo";

const Project: NextPage = ({ transformedMdx, frontmatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, excerpt, publishedAt, image, author } = frontmatter;

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt}
        imageUrl={image}
        publishedAt={publishedAt}
        type="article"
        author={author}
      />
      <Mdx resource={frontmatter} content={transformedMdx} />
    </Layout>
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
