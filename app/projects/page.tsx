import { getPlaiceholder } from "plaiceholder";

import { Hero } from "components/common/hero/Hero";
import { ProjectsListing } from "components/projects/listing/ProjectsListing";
import { getMetadata } from "lib/metadata";
import { getAllProjects } from "lib/projects";

const description = "Everything that I have built, alone or with someone 🔨";

export const metadata = getMetadata({ title: "Projects", description, image: "/img/projects.png" });

const ProjectsPage = async () => {
  const projects = getAllProjects();

  const blurImageData = await Promise.all(
    projects.map(async ({ image, slug }) => {
      const { base64 } = await getPlaiceholder(image);

      return {
        slug,
        base64,
      };
    }),
  );

  return (
    <>
      <Hero title="Projects" description={description} />
      <ProjectsListing blurImageData={blurImageData} />
    </>
  );
};

export default ProjectsPage;
