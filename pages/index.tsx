import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { AboutTile } from "components/tile/aboutTile/AboutTile";
import { TwitterTile } from "components/tile/twitterTile/TwitterTile";
import { ProjectTile } from "components/tile/projectTile/ProjectTile";
import { Grid } from "components/grid/Grid";
import { projects } from "data/projects";

const Home: NextPage = () => {
  const mainProject = projects.sort((a, b) => b.priority - a.priority)[0];
  return (
    <Layout>
      <Grid>
        <SpotifyTile />
        <AboutTile />
        <ProjectTile project={mainProject} />
        <TwitterTile
          username={process.env.NEXT_PUBLIC_TWITTER_USERNAME as string}
        />
      </Grid>
    </Layout>
  );
};

export default Home;
