import type { NextPage, GetStaticProps } from "next";
import { getPlaiceholder } from "plaiceholder";

import { Layout } from "components/layout/Layout";
import { ProjectsListing } from "components/projects/projectsListing/ProjectsListing";
import { Seo } from "components/Seo";
import { Hero } from "components/common/hero/Hero";
import type { InferGetStaticPropsType } from "types";
import { getAllProjects } from "lib/projects";

const Projects: NextPage = ({ blurImageData }: InferGetStaticPropsType<GetStaticProps>) => {
  const description = "Everything that I have built, alone or with someone 🔨";

  return (
    <Layout>
      <Seo title="Projects" description={description} imageUrl={"/img/projects.png"} />
      <Hero title="Projects" description={description} />
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
