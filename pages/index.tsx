import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { Grid } from "components/grid/Grid";

const Home: NextPage = () => {
  return (
    <Layout>
      <Grid>
        <SpotifyTile />
      </Grid>
    </Layout>
  );
};

export default Home;
