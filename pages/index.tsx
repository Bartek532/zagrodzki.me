import type { GetStaticProps, NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { AboutTile } from "components/tile/aboutTile/AboutTile";
import { TwitterTile } from "components/tile/twitterTile/TwitterTile";
import { ProjectTile } from "components/projects/projectTile/ProjectTile";
import { Grid } from "components/grid/Grid";
import { getNewestProjects } from "lib/projects";
import type { InferGetStaticPropsType } from "types";

const Home: NextPage = ({ projects }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Layout>
      <Grid>
        <SpotifyTile />
        <AboutTile />
        <ProjectTile project={projects[1]} />
        <TwitterTile username={process.env.NEXT_PUBLIC_TWITTER_USERNAME as string} />
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const newestProjects = getNewestProjects();

  return {
    props: {
      projects: newestProjects,
    },
    revalidate: 10,
  };
};

export default Home;
