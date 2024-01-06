import { About } from "components/about/about";
import { Hero } from "components/common/hero/Hero";
import { getMetadata } from "lib/metadata";

const description = "Want to know more about me? You've come to the right place 🎓";

export const metadata = getMetadata({
  title: "About",
  description,
  image: "/img/about.png",
});

const AboutPage = () => (
  <>
    <Hero title="About" description={description} />
    <About />
  </>
);

export default AboutPage;
