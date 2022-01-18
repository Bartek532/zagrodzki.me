import type { NextPage } from "next";
import { Layout } from "components/layout/Layout";
import { PostsListing } from "components/posts/postsListing/PostsListing";

const Blog: NextPage = () => {
  return (
    <Layout title="Blog">
      <PostsListing />
    </Layout>
  );
};

export default Blog;
