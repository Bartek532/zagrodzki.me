import { Hero } from "components/common/hero/Hero";
import { ProjectsListing } from "components/work/listing/ProjectsListing";
import { getMetadata } from "lib/metadata";

const description = "Everything that I have built, alone or with someone 🔨";

export const metadata = getMetadata({
  title: "Work",
  description,
  image: "/img/projects.png",
});

const WorkPage = () => (
  <>
    <Hero title="Work" description={description} />
    <ProjectsListing />
  </>
);

export default WorkPage;
