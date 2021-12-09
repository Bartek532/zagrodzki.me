import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import type { GetStaticProps } from "next";
import type { InferGetStaticPropsType } from "types";
import { getNewestProjects } from "lib/projects";
import { ProjectsListing } from "components/projects/projectsListing/ProjectsListing";

const Projects: NextPage = ({
  projects,
}: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Layout title="Projects">
      <ProjectsListing projects={projects} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const projects = getNewestProjects();

  return {
    props: {
      projects,
    },
    revalidate: 100,
  };
};

export default Projects;
