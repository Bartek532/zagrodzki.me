import type { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { getPostBySlug, getPostsPaths } from "lib/posts";
import { Layout } from "components/layout/Layout";
import { Mdx } from "components/mdx/Mdx";
import type { InferGetStaticPropsType } from "types";
import { Seo } from "components/Seo";

const Post: NextPage = ({ transformedMdx, frontmatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, excerpt, publishedAt, image, authors } = frontmatter;

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt}
        publishedAt={publishedAt}
        type="article"
        authors={authors}
        imageUrl={image}
      />
      <Mdx content={transformedMdx} resource={frontmatter} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string;
  const { transformedMdx, frontmatter } = await getPostBySlug(slug);

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

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getPostsPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Post;
