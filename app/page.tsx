import { FeaturedPost } from "@/components/home/featured-post";
import { FeaturedProject } from "@/components/home/featured-project";
import { FeaturedTweet } from "@/components/home/featured-tweet";
import { Feed } from "@/components/home/feed";
import { GitHubActivity } from "@/components/home/github-activity";
import { Hero } from "@/components/home/hero";
import { getNewestPosts } from "lib/posts";
import { getBestProjects } from "lib/projects";

const Home = () => {
  const [firstProject, secondProject] = getBestProjects();
  const [post] = getNewestPosts();

  if (!firstProject || !secondProject || !post) {
    return null;
  }

  return (
    <>
      <Hero />
      <FeaturedProject />
      <Feed />
      <FeaturedPost post={post} />
      <FeaturedTweet />
      <GitHubActivity />
    </>
  );

  // return (
  //   <Grid>
  //     <SpotifyTile />
  //     <AboutTile />
  //     <SocialTile social="x" />
  //     <ProjectTile project={firstProject} mockupPosition="right" />
  //     <ThemeTile />
  //     <LatestPostTile post={post} />
  //     <ProjectTile project={secondProject} mockupPosition="left" />
  //     <SocialTile social="github" />
  //     <SocialTile social="linkedin" />
  //     <NewsletterTile />
  //   </Grid>
  // );
};

export default Home;
