import { Content } from "@/components/about/content";
import { Education } from "@/components/about/education";
import { Facts } from "@/components/about/facts";
import { Hero } from "@/components/about/hero";
import { Recommendations } from "@/components/about/recommendation";
import { Skills } from "@/components/about/skills";
import { GitHubActivity } from "@/components/home/github-activity";
import { getMetadata } from "@/lib/metadata";

const description = "I'm a Software Engineer not afraid of any technology 🎓";

export const metadata = getMetadata({
  title: "About",
  description,
  image: "/img/about.png",
  url: "/about",
});

const AboutPage = () => (
  <>
    <Hero description={description} />
    <Content />
    <Education />
    <Skills />
    <Facts />
    <Recommendations />
    <GitHubActivity />
  </>
);

export default AboutPage;
