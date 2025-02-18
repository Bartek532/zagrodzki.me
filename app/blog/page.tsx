import { Blog } from "@/components/blog";
import { Category } from "@/types";
import { getMetadata } from "lib/metadata";
import { getPostsCategories } from "lib/posts";

const description = "Discover my collection of articles, guides, and insights on various topics ✍️";

export const metadata = getMetadata({
  title: "Blog",
  description,
  image: "/img/blog.png",
  canonical: "/blog",
});

const BlogPage = async ({ searchParams }: { searchParams: Promise<{ category?: Category }> }) => {
  const categories = getPostsCategories();
  const activeCategory = (await searchParams).category;

  return (
    <>
      <Blog
        categories={categories}
        description={description}
        {...(activeCategory && { activeCategory })}
      />
    </>
  );
};

export default BlogPage;
