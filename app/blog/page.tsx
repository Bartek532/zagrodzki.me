import { PostsListing } from "components/blog/listing/PostsListing";
import { Hero } from "components/common/hero/Hero";
import { getPopularPosts, getPostsCategories } from "lib/posts";
import { getViewsBySlug } from "lib/views";
import { RESOURCE_TYPE } from "types";

const description = "Everything that I or one of the authors has written for my blog ✍️";

const BlogPage = async () => {
  const categories = getPostsCategories();
  const posts = getPopularPosts();

  const postsWithViews = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      views: await getViewsBySlug(post.slug, RESOURCE_TYPE.POST),
    })),
  );

  const sortedPopularPosts = postsWithViews.sort((a, b) => b.views - a.views);

  return (
    <>
      <Hero title="Blog" description={description} />
      <PostsListing categories={categories} popularPosts={sortedPopularPosts} />
    </>
  );
};

export default BlogPage;
