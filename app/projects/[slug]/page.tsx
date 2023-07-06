import { Project, WithContext } from "schema-dts";

import { Mdx } from "components/mdx/Mdx";
import { getMetadata } from "lib/metadata";
import { getProjectBySlug, getProjectsPaths } from "lib/projects";
import { getResourceViewsBySlug, view } from "lib/views";
import { MetadataParams, RESOURCE_TYPE } from "types";

export async function generateMetadata({ params: { slug } }: MetadataParams) {
  const { frontmatter } = await getProjectBySlug(slug);
  return getMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    type: "article",
    author: frontmatter.author,
    image: frontmatter.image,
  });
}

export function generateStaticParams() {
  const paths = getProjectsPaths();
  return paths.map((slug) => ({ slug }));
}

const ProjectPage = async ({ params: { slug } }: MetadataParams) => {
  const { transformedMdx, frontmatter } = await getProjectBySlug(slug);
  await view(RESOURCE_TYPE.PROJECT, slug);
  const views = await getResourceViewsBySlug(RESOURCE_TYPE.PROJECT, slug);

  const jsonLd: WithContext<Project> = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.image,
  };

  return (
    <>
      <Mdx resource={frontmatter} content={transformedMdx} views={views} />
      {/* Needed to add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default ProjectPage;
