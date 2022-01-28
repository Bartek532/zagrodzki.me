import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { Seo } from "components/Seo";
import { Hero } from "components/hero/Hero";

const About: NextPage = () => {
  const description = "Want to know more about me? You've come to the right place 🎓";
  return (
    <Layout>
      <Seo title="About" description={description} imageUrl={"/img/about.png"} />
      <Hero title="About" description={description} />
    </Layout>
  );
};

export default About;
