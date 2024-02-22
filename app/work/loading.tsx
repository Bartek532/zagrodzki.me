import { HeroSkeleton } from "components/common/hero/Hero";
import { ProjectsListingSkeleton } from "components/work/listing/ProjectsListing";

const LoadingPage = () => (
  <>
    <HeroSkeleton />
    <ProjectsListingSkeleton />
  </>
);

export default LoadingPage;
