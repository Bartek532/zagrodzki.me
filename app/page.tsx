import { Section } from "@/components/common/sections/section";
import { FeaturedPost } from "@/components/home/featured-post";
import { FeaturedProject } from "@/components/home/featured-project";
import { FeaturedTweet } from "@/components/home/featured-tweet";
import { Feed } from "@/components/home/feed";
import { GitHubActivity } from "@/components/home/github-activity";
import { Hero } from "@/components/home/hero";
import { LatestRead } from "@/components/home/latest-read";
import { Spotify } from "@/components/home/spotify";
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
      <GitHubActivity />
      <FeaturedPost post={post} />
      <FeaturedTweet />
      <Feed />
      <Section className="grid divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="px-6 py-4 lg:py-6 min-w-0">
          <Spotify />
        </div>
        <div className="px-6 py-4 lg:py-6 min-w-0">
          <LatestRead />
        </div>
      </Section>
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
