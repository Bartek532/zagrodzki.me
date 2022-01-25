import type { GetStaticProps, NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { PostsListing } from "components/posts/postsListing/PostsListing";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { InferGetStaticPropsType } from "types";

const Blog: NextPage = ({ popularPosts, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Blog">
      <PostsListing categories={categories} popularPosts={popularPosts} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  try {
    const popularPosts = getPopularPosts();
    const categories = getPostsCategories();

    return {
      props: {
        popularPosts,
        categories,
      },
    };
  } catch {
    return {
      notFound: true as const,
    };
  }
};

export default Blog;
