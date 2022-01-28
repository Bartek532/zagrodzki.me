import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { ContactForm } from "components/contactForm/ContactForm";
import { Seo } from "components/Seo";
import { Hero } from "components/hero/Hero";

const About: NextPage = () => {
  const description = "Do you want to cooperate? Ask for something? Or just chat? Let me know 💬";
  return (
    <Layout>
      <Seo title="Contact" description={description} />
      <Hero title="Contact" description={description} />
      <ContactForm isFullPage={true} />
    </Layout>
  );
};

export default About;
