import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { AboutTile } from "components/tile/aboutTile/AboutTile";
import { TwitterTile } from "components/tile/twitterTile/TwitterTile";
import { Grid } from "components/grid/Grid";
import { getEnv } from "utils/env";

const Home: NextPage = () => {
  return (
    <Layout>
      <Grid>
        <SpotifyTile />
        <AboutTile />
        <TwitterTile
          username={process.env.NEXT_PUBLIC_TWITTER_USERNAME as string}
        />
      </Grid>
    </Layout>
  );
};

export default Home;
