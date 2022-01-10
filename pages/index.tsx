import type { GetStaticProps, NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { AboutTile } from "components/tile/aboutTile/AboutTile";
import { SocialTile } from "components/tile/socialTile/SocialTile";
import { ProjectTile } from "components/projects/projectTile/ProjectTile";
import { ThemeTile } from "components/tile/themeTile/ThemeTile";
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
        <ThemeTile />
        <SocialTile username={process.env.NEXT_PUBLIC_TWITTER_USERNAME as string} social="twitter" />
        <SocialTile username={process.env.NEXT_PUBLIC_LINKEDIN_USERNAME as string} social="linkedin" />
        <SocialTile username={process.env.NEXT_PUBLIC_GITHUB_USERNAME as string} social="github" />
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
