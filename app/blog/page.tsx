import { getMetadata } from "@/lib/metadata";

import type { Category } from "@/types";

const description = "Discover my collection of articles, guides, and insights on various topics ✍️";

export const metadata = getMetadata({
  title: "Blog",
  description,
  image: "/img/blog.png",
  canonical: "/blog",
});

const BlogPage = async ({ searchParams }: { searchParams: Promise<{ category?: Category }> }) => {
  const categories: Category[] = [];
  const activeCategory = (await searchParams).category;

  return (
    <>
      {JSON.stringify(activeCategory)}
      {JSON.stringify(categories)}
      {/* <Blog
        categories={categories}
        description={description}
        {...(activeCategory && { activeCategory })}
      /> */}
    </>
  );
};

export default BlogPage;
