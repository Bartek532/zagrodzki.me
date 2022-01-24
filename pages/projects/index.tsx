import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Layout } from "components/layout/Layout";
import { ProjectsListing } from "components/projects/projectsListing/ProjectsListing";
import type { InferGetStaticPropsType } from "types";
import { getPlaiceholder } from "plaiceholder";
import { getAllProjects } from "lib/projects";

const Projects: NextPage = ({ blurImageData }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Layout title="Projects">
      <ProjectsListing blurImageData={blurImageData} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
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

    return {
      props: {
        blurImageData,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true as const,
    };
  }
};

export default Projects;
