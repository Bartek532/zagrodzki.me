import { algoliasearch } from "algoliasearch";
import dayjs from "dayjs";

import { env } from "@/lib/env";

import { getPublishedPosts, getPostParsedContent } from "../lib/posts";
import { getAllProjects, getProjectParsedContent } from "../lib/projects";

const generateAlgoliaProjects = async () => {
  const projects = getAllProjects();

  return await Promise.all(
    projects.map(async (project) => {
      const { compiledContent } = await getProjectParsedContent(project.slug);

      return {
        ...project,
        content: compiledContent.contents.toString().replace(/<[^>]+>/g, ""),
        objectID: project.slug,
        timestamp: dayjs(project.modifiedAt, "DD-MM-YYYY").unix(),
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
        timestamp: dayjs(post.modifiedAt, "DD-MM-YYYY").unix(),
      };
    }),
  );
};

async function run() {
  const client = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_APP_ID, env.ALGOLIA_UPDATE_API_KEY);

  const [indexedProjects, indexedPosts] = await Promise.all([
    client.replaceAllObjects({
      indexName: env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME,
      objects: await generateAlgoliaProjects(),
    }),
    client.replaceAllObjects({
      indexName: env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME,
      objects: await generateAlgoliaPosts(),
    }),
  ]);

  console.log(
    `${indexedProjects.batchResponses.flat().length} projects indexed in ${
      env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME
    }`,
  );

  console.log(
    `${indexedPosts.batchResponses.flat().length} posts indexed in ${
      env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME
    }`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
