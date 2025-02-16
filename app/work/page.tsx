import { Recommendations } from "@/components/about/recommendation";
import { Skills } from "@/components/about/skills";
import { Hero } from "@/components/work/hero";
import { Positions } from "@/components/work/positions";
import { Projects } from "@/components/work/projects";
import { getMetadata } from "lib/metadata";

const description = "Everything that I have built, alone or with someone 🔨";

export const metadata = getMetadata({
  title: "Work",
  description,
  image: "/img/work.png",
  url: "/work",
});

const WorkPage = () => (
  <>
    <Hero />
    <Positions />
    <Projects />
    <Skills />
    <Recommendations />
  </>
);

export default WorkPage;
