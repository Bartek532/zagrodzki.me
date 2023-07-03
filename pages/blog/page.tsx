import { PostsListing } from "components/blog/postsListing/PostsListing";

import { Hero } from "components/common/hero/Hero";
import { Layout } from "components/layout/Layout";
import { Seo } from "components/Seo";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { getViewsBySlug } from "lib/views";
import { RESOURCE_TYPE, InferGetStaticPropsType } from "types";

import type { GetStaticProps, NextPage } from "next";

const Blog: NextPage = ({
  popularPosts,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      popularPosts.map(async (post) => ({
        ...post,
        views: await getViewsBySlug(post.slug, RESOURCE_TYPE.POST),
      })),
    );

    const sortedPopularPostsByViews = postsWithViews.sort((a, b) => b.views - a.views);

    return {
      props: {
        popularPosts: sortedPopularPostsByViews,
        categories,
      },
      revalidate: 120,
    };
  } catch (e) {
    console.log(e);

    return {
      notFound: true as const,
    };
  }
};

export default Blog;
