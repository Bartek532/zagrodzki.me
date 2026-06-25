import { Recommendations } from "@/components/about/recommendation";
import { Skills } from "@/components/about/skills";
import { Hero } from "@/components/work/hero";
import { Positions } from "@/components/work/positions";
import { Projects } from "@/components/work/projects";
import { getMetadata } from "@/lib/metadata";
import { getPublishedProjects } from "@/lib/projects";

const description = "I love shipping products and building great software 🔨";

export const metadata = getMetadata({
  title: "Work",
  description,
  image: "/img/work.png",
  url: "/work",
});

const WorkPage = () => {
  const projects = getPublishedProjects();

  return (
    <>
      <Hero description={description} />
      <Positions />
      <Projects projects={projects} />
      <Skills />
      <Recommendations />
    </>
  );
};

export default WorkPage;
