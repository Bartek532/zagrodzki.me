import { Hero } from "components/common/hero/Hero";
import { ProjectsListing } from "components/projects/listing/ProjectsListing";
import { getImage } from "lib/images";
import { getMetadata } from "lib/metadata";
import { getAllProjects } from "lib/projects";
import { HOST } from "utils/consts";

const description = "Everything that I have built, alone or with someone 🔨";

export const metadata = getMetadata({
  title: "Projects",
  description,
  image: "/img/projects.png",
});

const ProjectsPage = async () => {
  const projects = getAllProjects();

  const blurredImages = await Promise.all(
    projects.map(async ({ image, slug }) => ({
      slug,
      base64: (await getImage(`${HOST}${image}`)).base64,
    })),
  );

  return (
    <>
      <Hero title="Projects" description={description} />
      <ProjectsListing blurredImages={blurredImages} />
    </>
  );
};

export default ProjectsPage;
