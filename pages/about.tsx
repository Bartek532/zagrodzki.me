import type { NextPage, GetStaticProps } from "next";
import countapi from "countapi-js";

import { ORIGIN } from "utils/consts";
import { Layout } from "components/layout/Layout";
import { Seo } from "components/Seo";
import { Hero } from "components/common/hero/Hero";
import { AboutView } from "components/about/AboutView";
import { InferGetStaticPropsType } from "types";
import { getPublishedPosts } from "lib/posts";

const About: NextPage = ({ views }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const description = "Want to know more about me? You've come to the right place 🎓";

  return (
    <Layout>
      <Seo title="About" description={description} imageUrl={"/img/about.png"} />
      <Hero title="About" description={description} />
      <AboutView views={views} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = getPublishedPosts();
    const views = await posts.reduce(async (sum, post) => {
      const postViews = await countapi.get(ORIGIN, post.slug);

      return (await sum) + postViews.value;
    }, Promise.resolve(0));

    return { props: { views }, revalidate: 10 };
  } catch {
    return { props: { views: 0 } };
  }
};

export default About;
