import { getAllProjects } from "./lib/projects";
import { getPublishedPosts } from "./lib/posts";
import algoliasearch from "algoliasearch";
import dayjs from "dayjs";
import invariant from "invariant";

const generateAlgoliaProjects = () => {
  const projects = getAllProjects();
  return projects.map((project) => {
    return {
      ...project,
      objectID: project.slug,
      timestamp: dayjs(project.publishedAt, "DD-MM-YYYY").unix(),
    };
  });
};

const generateAlgoliaPosts = () => {
  const posts = getPublishedPosts();
  return posts.map((post) => {
    return { ...post, objectID: post.slug, timestamp: dayjs(post.publishedAt, "DD-MM-YYYY").unix() };
  });
};

async function run() {
  invariant(!!process.env.ALGOLIA_UPDATE_API_KEY, "Admin API KEY is not set");

  const client = algoliasearch("3EE43YCZQB", process.env.ALGOLIA_UPDATE_API_KEY);
  const projectsIndex = client.initIndex("projects");
  const postsIndex = client.initIndex("posts");

  const indexedProjects = await projectsIndex.saveObjects(generateAlgoliaProjects());
  const indexedPosts = await postsIndex.saveObjects(generateAlgoliaPosts());

  console.log(`${indexedProjects.objectIDs.length} projects indexed`);
  console.log(`${indexedPosts.objectIDs.length} posts indexed`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
