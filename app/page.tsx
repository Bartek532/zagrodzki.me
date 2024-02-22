import { Grid } from "components/common/grid/Grid";
import { AboutTile } from "components/tile/about/AboutTile";
import { LatestPostTile } from "components/tile/latestPost/LatestPostTile";
import { NewsletterTile } from "components/tile/newsletter/NewsletterTile";
import { SocialTile } from "components/tile/social/SocialTile";
import { SpotifyTile } from "components/tile/spotify/SpotifyTile";
import { ThemeTile } from "components/tile/theme/ThemeTile";
import { ProjectTile } from "components/work/tile/ProjectTile";
import { getNewestPosts } from "lib/posts";
import { getBestProjects } from "lib/projects";

const Home = () => {
  const [firstProject, secondProject] = getBestProjects();
  const [post] = getNewestPosts();

  if (!firstProject || !secondProject || !post) {
    return null;
  }

  return (
    <Grid>
      <SpotifyTile />
      <AboutTile />
      <SocialTile social="x" />
      <ProjectTile project={firstProject} mockupPosition="right" />
      <ThemeTile />
      <LatestPostTile post={post} />
      <ProjectTile project={secondProject} mockupPosition="left" />
      <SocialTile social="github" />
      <SocialTile social="linkedin" />
      <NewsletterTile />
    </Grid>
  );
};

export default Home;
