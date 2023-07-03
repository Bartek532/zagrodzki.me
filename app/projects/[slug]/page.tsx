import { Mdx } from "components/mdx/Mdx";
import { getProjectBySlug, getProjectsPaths } from "lib/projects";

export function generateStaticParams() {
  return getProjectsPaths();
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const { transformedMdx, frontmatter } = await getProjectBySlug(params.slug);

  return <Mdx resource={frontmatter} content={transformedMdx} />;
};

export default ProjectPage;
