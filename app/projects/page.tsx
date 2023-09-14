import { Hero } from "components/common/hero/Hero";
import { ProjectsListing } from "components/projects/listing/ProjectsListing";
import { getMetadata } from "lib/metadata";

const description = "Everything that I have built, alone or with someone 🔨";

export const metadata = getMetadata({
  title: "Projects",
  description,
  image: "/img/projects.png",
});

const ProjectsPage = () => (
  <>
    <Hero title="Projects" description={description} />
    <ProjectsListing />
  </>
);

export default ProjectsPage;
