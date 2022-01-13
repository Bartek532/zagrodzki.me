import type { GetStaticProps, NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { SpotifyTile } from "components/tile/spotifyTile/SpotifyTile";
import { AboutTile } from "components/tile/aboutTile/AboutTile";
import { SocialTile } from "components/tile/socialTile/SocialTile";
import { ProjectTile } from "components/projects/projectTile/ProjectTile";
import { ThemeTile } from "components/tile/themeTile/ThemeTile";
import { LatestPostTile } from "components/tile/latestPostTile/LatestPostTile";
import { Grid } from "components/grid/Grid";
import { getNewestProjects } from "lib/projects";
import type { InferGetStaticPropsType } from "types";
import { getNewestPosts } from "lib/posts";

const Home: NextPage = ({ projects, posts }: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Layout>
      <Grid>
        <SpotifyTile />
        <AboutTile />
        <SocialTile username={process.env.NEXT_PUBLIC_TWITTER_USERNAME as string} social="twitter" />
        <ProjectTile project={projects[0]} mockupPosition="right" />
        <ThemeTile />
        <LatestPostTile post={posts[0]} />
        <ProjectTile project={projects[1]} mockupPosition="left" />
        <SocialTile username={process.env.NEXT_PUBLIC_LINKEDIN_USERNAME as string} social="linkedin" />
        <SocialTile username={process.env.NEXT_PUBLIC_GITHUB_USERNAME as string} social="github" />
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const newestProjects = getNewestProjects();
  const newestPosts = getNewestPosts();

  return {
    props: {
      projects: newestProjects,
      posts: newestPosts,
    },
    revalidate: 10,
  };
};

export default Home;
