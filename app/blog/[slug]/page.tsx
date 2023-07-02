import { FeaturedPosts } from "components/blog/featuredPosts/FeaturedPosts";
import { Mdx } from "components/mdx/Mdx";
import { getNewestPosts, getPostBySlug, getPostsPaths } from "lib/posts";

export function generateStaticParams() {
  const paths = getPostsPaths();
  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { transformedMdx, frontmatter } = await getPostBySlug(params.slug);
  const posts = getNewestPosts();

  return (
    <>
      <Mdx content={transformedMdx} resource={frontmatter} />
      <FeaturedPosts posts={posts} actualPostSlug={frontmatter.slug} />
    </>
  );
}
