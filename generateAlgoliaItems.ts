import algoliasearch from "algoliasearch";
import dayjs from "dayjs";
import invariant from "invariant";

import { getPublishedPosts, getPostParsedContent } from "./lib/posts";
import { getAllProjects, getProjectParsedContent } from "./lib/projects";

const generateAlgoliaProjects = async () => {
  const projects = getAllProjects();

  return await Promise.all(
    projects.map(async (project) => {
      const { compiledContent } = await getProjectParsedContent(project.slug);

      return {
        ...project,
        content: compiledContent.contents.toString().replace(/<[^>]+>/g, ""),
        objectID: project.slug,
        timestamp: dayjs(project.publishedAt, "DD-MM-YYYY").unix(),
      };
    }),
  );
};

const generateAlgoliaPosts = async () => {
  const posts = getPublishedPosts();

  return await Promise.all(
    posts.map(async (post) => {
      const { compiledContent } = await getPostParsedContent(post.slug);

      return {
        ...post,
        content: compiledContent.contents.toString().replace(/<[^>]+>/g, ""),
        objectID: post.slug,
        timestamp: dayjs(post.publishedAt, "DD-MM-YYYY").unix(),
      };
    }),
  );
};

async function run() {
  invariant(!!process.env.ALGOLIA_UPDATE_API_KEY, "Admin API KEY is not set");

  const client = algoliasearch("3EE43YCZQB", process.env.ALGOLIA_UPDATE_API_KEY);
  const projectsIndex = client.initIndex("projects");
  const postsIndex = client.initIndex("posts");

  const indexedProjects = await projectsIndex.saveObjects(await generateAlgoliaProjects());
  const indexedPosts = await postsIndex.saveObjects(await generateAlgoliaPosts());

  console.log(`${indexedProjects.objectIDs.length} projects indexed`);
  console.log(`${indexedPosts.objectIDs.length} posts indexed`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
