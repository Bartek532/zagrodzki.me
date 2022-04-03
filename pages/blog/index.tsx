import type { GetStaticProps, NextPage } from "next";
import countapi from "countapi-js";

import { ORIGIN } from "utils/consts";
import { Layout } from "components/layout/Layout";
import { PostsListing } from "components/blog/postsListing/PostsListing";
import { Seo } from "components/Seo";
import { Hero } from "components/common/hero/Hero";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { InferGetStaticPropsType } from "types";

const Blog: NextPage = ({ popularPosts, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const description = "Everything that I or one of the authors has written for my blog ✍️";

  return (
    <Layout>
      <Seo title="Blog" description={description} imageUrl={"/img/blog.png"} />
      <Hero title="Blog" description={description} />
      <PostsListing categories={categories} popularPosts={popularPosts} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const popularPosts = getPopularPosts();
    const categories = getPostsCategories();

    const postsWithViews = await Promise.all(
      popularPosts.map(async (post) => ({ ...post, views: (await countapi.get(ORIGIN, post.slug)).value })),
    );

    const sortedPopularPostsByViews = postsWithViews.sort((a, b) => b.views - a.views);

    return {
      props: {
        popularPosts: sortedPopularPostsByViews,
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
