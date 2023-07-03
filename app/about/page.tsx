import { About } from "components/about/about";
import { Hero } from "components/common/hero/Hero";
import { getResourceViews } from "lib/views";
import { RESOURCE_TYPE } from "types";

const description =
  "Want to know more about me? You've come to the right place 🎓";

const AboutPage = async () => {
  const views = await getResourceViews(RESOURCE_TYPE.POST);

  return (
    <>
      <Hero title="About" description={description} />
      <About views={views} />
    </>
  );
};

export default AboutPage;
