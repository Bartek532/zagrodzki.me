import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { ProjectsListing } from "components/projects/projectsListing/ProjectsListing";

const Projects: NextPage = () => {
  return (
    <Layout title="Projects">
      <ProjectsListing />
    </Layout>
  );
};

export default Projects;
