import { Mdx } from "components/mdx/Mdx";
import { getProjectBySlug, getProjectsPaths } from "lib/projects";

export function generateStaticParams() {
  const paths = getProjectsPaths();
  return paths;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { transformedMdx, frontmatter } = await getProjectBySlug(params.slug);

  return <Mdx resource={frontmatter} content={transformedMdx} />;
}
