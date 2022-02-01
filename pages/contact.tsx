import type { NextPage } from "next";

import { Contact } from "components/contact/Contact";
import { Layout } from "components/layout/Layout";
import { Seo } from "components/Seo";
import { Hero } from "components/common/hero/Hero";

const About: NextPage = () => {
  const description = "Do you want to cooperate? Ask for something? Or just chat? Let me know 💬";

  return (
    <Layout>
      <Seo title="Contact" description={description} imageUrl={"/img/contact.png"} />
      <Hero title="Contact" description={description} />
      <Contact />
    </Layout>
  );
};

export default About;
