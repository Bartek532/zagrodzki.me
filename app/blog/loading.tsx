import { PostsListingSkeleton } from "components/blog/listing/PostsListing";
import { HeroSkeleton } from "components/common/hero/Hero";

const LoadingPage = () => (
  <>
    <HeroSkeleton />
    <PostsListingSkeleton />
  </>
);

export default LoadingPage;
