import { Grid } from "components/common/grid/Grid";
import { ProjectTile } from "components/projects/projectTile/ProjectTile";
import { AboutTile } from "components/tile/aboutTile/AboutTile";
import { LatestPostTile } from "components/tile/latestPostTile/LatestPostTile";
import { NewsletterTile } from "components/tile/newsletterTile/NewsletterTile";
import { SocialTile } from "components/tile/socialTile/SocialTile";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { ThemeTile } from "components/tile/themeTile/ThemeTile";
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
      <SocialTile social="twitter" />
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
