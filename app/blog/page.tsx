import { PostsListing } from "components/blog/listing/PostsListing";
import { Hero } from "components/common/hero/Hero";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { getResourceViews } from "lib/views";
import { Post, RESOURCE_TYPE } from "types";

const description = "Everything that I or one of the authors has written for my blog ✍️";

const BlogPage = async () => {
  const categories = getPostsCategories();
  const posts = getPopularPosts();

  const postsViews = await getResourceViews(RESOURCE_TYPE.POST);
  const postsSlugs = postsViews.filter((_, index) => !(index % 2)) as string[];

  const sortedPosts = postsSlugs.length
    ? postsSlugs
        .reverse()
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter((post): post is Post => !!post)
    : posts;

  return (
    <>
      <Hero title="Blog" description={description} />
      <PostsListing categories={categories} popularPosts={sortedPosts} />
    </>
  );
};

export default BlogPage;
