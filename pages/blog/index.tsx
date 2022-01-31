import type { GetStaticProps, NextPage } from "next";

import { Layout } from "components/layout/Layout";
import { PostsListing } from "components/blog/postsListing/PostsListing";
import { Seo } from "components/Seo";
import { Hero } from "components/shared/hero/Hero";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { InferGetStaticPropsType } from "types";

const Blog: NextPage = ({ popularPosts, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const description = "Everything that I or anyone else has written for my blog ✍️";

  return (
    <Layout>
      <Seo title="Blog" description={description} imageUrl={"/img/blog.png"} />
      <Hero title="Blog" description={description} />
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
