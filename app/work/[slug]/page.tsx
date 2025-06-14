import { Resource } from "@/components/resource/resource";
import { getMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjectsPaths } from "@/lib/projects";

import type { MetadataParams } from "@/types";
import type { Project, WithContext } from "schema-dts";

export async function generateMetadata({ params }: MetadataParams) {
  const { slug } = await params;
  const { frontmatter } = getProjectBySlug(slug);

  return getMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    type: "article",
    author: frontmatter.author,
    image: frontmatter.image,
    url: `/work/${slug}`,
  });
}

export function generateStaticParams() {
  const paths = getProjectsPaths();
  return paths.map((slug) => ({ slug }));
}

const ProjectPage = async ({ params }: MetadataParams) => {
  const { slug } = await params;
  const { content, frontmatter } = getProjectBySlug(slug);

  const jsonLd: WithContext<Project> = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.image,
  };

  return (
    <>
      <Resource content={content} metadata={frontmatter} />
      {/* Needed to add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ProjectPage;
