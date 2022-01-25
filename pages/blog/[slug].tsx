import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { getPostBySlug, getPostsPaths } from "lib/posts";

const Post: NextPage = () => {
  return <h1>post</h1>;
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

export const getStaticPaths = () => {
  const paths = getPostsPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Post;
