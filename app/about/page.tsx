import { getMetadata } from "lib/metadata";

const description = "Want to know more about me? You've come to the right place 🎓";

export const metadata = getMetadata({
  title: "About",
  description,
  image: "/img/about.png",
  url: "/about",
});

const AboutPage = () => (
  <>
    {/* <Hero title="About" description={description} /> */}
    {/* <About /> */}
  </>
);

export default AboutPage;
