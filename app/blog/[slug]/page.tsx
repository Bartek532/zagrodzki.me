import { Article, WithContext } from "schema-dts";

import { FeaturedPosts } from "components/blog/featured/FeaturedPosts";
import { Mdx } from "components/mdx/Mdx";
import { getMetadata } from "lib/metadata";
import { getNewestPosts, getPostBySlug, getPostsPaths } from "lib/posts";
import { getResourceViewsBySlug, view } from "lib/views";
import { type MetadataParams, RESOURCE_TYPE } from "types";
import { SITE_TITLE } from "utils/consts";

export async function generateMetadata({ params: { slug } }: MetadataParams) {
  const { frontmatter } = await getPostBySlug(slug);
  return getMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    type: "article",
    author: frontmatter.author,
    image: frontmatter.image,
  });
}

export function generateStaticParams() {
  const paths = getPostsPaths();
  return paths.map((slug) => ({ slug }));
}

const PostPage = async ({ params: { slug } }: MetadataParams) => {
  const posts = getNewestPosts();
  const { transformedMdx, frontmatter } = await getPostBySlug(slug);
  await view(RESOURCE_TYPE.POST, slug);
  const views = await getResourceViewsBySlug(RESOURCE_TYPE.POST, slug);

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: frontmatter.title,
    description: frontmatter.excerpt,
    publisher: SITE_TITLE,
    image: frontmatter.image,
    datePublished: frontmatter.publishedAt,
    author: frontmatter.author,
  };

  return (
    <>
      <Mdx content={transformedMdx} resource={frontmatter} views={views} />
      <FeaturedPosts posts={posts} actualPostSlug={frontmatter.slug} />
      {/* Needed to add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default PostPage;
