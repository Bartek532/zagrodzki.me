import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { getPostBySlug, getPostsPaths } from "lib/posts";
import { Layout } from "components/layout/Layout";
import { ResultView } from "components/result/resultView/ResultView";
import type { InferGetStaticPropsType } from "types";

const Post: NextPage = ({ transformedMdx, frontmatter }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title={frontmatter.title}>
      <ResultView mdx={transformedMdx} type="post" post={frontmatter} />
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
