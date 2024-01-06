import { PostsListing } from "components/blog/listing/PostsListing";
import { Hero } from "components/common/hero/Hero";
import { getMetadata } from "lib/metadata";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { getResourceViews } from "lib/views";
import { Post, RESOURCE_TYPE } from "types";

const description = "Everything that I or one of the authors has written for my blog ✍️";

export const metadata = getMetadata({
  title: "Blog",
  description,
  image: "/img/blog.png",
});

const BlogPage = async () => {
  const categories = getPostsCategories();
  const posts = getPopularPosts();

  const postsViews = (await getResourceViews(RESOURCE_TYPE.POST)) as string[];
  const postsSlugs = postsViews.filter((_, index) => !(index % 2));

  const sortedPosts = postsSlugs.length
    ? postsSlugs
        .reverse()
        .map((slug) => posts.find((post) => post.slug === slug))
        .filter((post): post is Post => !!post)
    : posts;

  return (
    <>
      <Hero title="Blog" description={description} />
      <PostsListing popularPosts={sortedPosts} categories={categories} />
    </>
  );
};

export default BlogPage;
