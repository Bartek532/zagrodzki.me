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

const Home = () => {
  const [post] = getNewestPosts();

  return (
    <>
      <Hero />
      <FeaturedProject />
      <GitHubActivity />
      {post && <FeaturedPost post={post} />}
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
};

export default Home;
