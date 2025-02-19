import { Blog } from "@/components/blog";
import { getMetadata } from "@/lib/metadata";
import { getPostsCategories } from "@/lib/posts";

const description = "Discover my collection of articles, guides, and insights on various topics ✍️";

export const metadata = getMetadata({
  title: "Blog",
  description,
  image: "/img/blog.png",
  canonical: "/blog",
});

const BlogPage = () => {
  const categories = getPostsCategories();

  return (
    <>
      <Blog categories={categories} description={description} />
    </>
  );
};

export default BlogPage;
