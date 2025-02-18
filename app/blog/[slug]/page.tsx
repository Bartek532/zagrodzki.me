import { FeaturedPosts } from "@/components/blog/featured-posts";
import { Resource } from "@/components/resource/resource";
import { getMetadata } from "@/lib/metadata";
import { getNewestPosts, getPostBySlug, getPostsPaths } from "@/lib/posts";
import { SITE_TITLE } from "@/utils/consts";

import type { MetadataParams } from "@/types";
import type { Article, WithContext } from "schema-dts";

export async function generateMetadata({ params }: MetadataParams) {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);

  return getMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    type: "article",
    author: frontmatter.author,
    image: frontmatter.image,
    url: `/blog/${slug}`,
  });
}

export function generateStaticParams() {
  const paths = getPostsPaths();
  return paths.map((slug) => ({ slug }));
}

const PostPage = async ({ params }: MetadataParams) => {
  const { slug } = await params;
  const featuredPosts = getNewestPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, 3);
  const { content, frontmatter } = getPostBySlug(slug);

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
      <Resource content={content} metadata={frontmatter} />
      <FeaturedPosts posts={featuredPosts} />
      {/* Needed to add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default PostPage;
