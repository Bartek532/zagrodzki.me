import { AboutView } from "components/about/AboutView";
import { Hero } from "components/common/hero/Hero";
import { getResourceViews } from "lib/views";
import { RESOURCE_TYPE } from "types";

const description =
  "Want to know more about me? You've come to the right place 🎓";

export default async function Page() {
  const views = await getResourceViews(RESOURCE_TYPE.POST);

  return (
    <>
      <Hero title="About" description={description} />
      <AboutView views={views} />
    </>
  );
}
