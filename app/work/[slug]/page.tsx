import { Project, WithContext } from "schema-dts";

import { Resource } from "components/resource/Resource";
import { getMetadata } from "lib/metadata";
import { getProjectBySlug, getProjectsPaths } from "lib/projects";
import { MetadataParams } from "types";

export async function generateMetadata({ params: { slug } }: MetadataParams) {
  const { frontmatter } = await getProjectBySlug(slug);
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

const ProjectPage = async ({ params: { slug } }: MetadataParams) => {
  const { transformedMdx, frontmatter } = await getProjectBySlug(slug);

  const jsonLd: WithContext<Project> = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.image,
  };

  return (
    <>
      <Resource content={transformedMdx} metadata={frontmatter} />
      {/* Needed to add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ProjectPage;
