import { FeaturedPosts } from "components/blog/featured/FeaturedPosts";
import { Mdx } from "components/mdx/Mdx";
import { getNewestPosts, getPostBySlug, getPostsPaths } from "lib/posts";
import { getResourceViewsBySlug, view } from "lib/views";
import { RESOURCE_TYPE } from "types";

export function generateStaticParams() {
  const paths = getPostsPaths();
  return paths;
}

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { transformedMdx, frontmatter } = await getPostBySlug(slug);
  await view(RESOURCE_TYPE.POST, slug);
  const views = await getResourceViewsBySlug(RESOURCE_TYPE.POST, slug);
  const posts = getNewestPosts();

  return (
    <>
      <Mdx content={transformedMdx} resource={frontmatter} views={views} />
      <FeaturedPosts posts={posts} actualPostSlug={frontmatter.slug} />
    </>
  );
};

export default PostPage;
