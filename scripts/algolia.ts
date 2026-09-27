import { algoliasearch } from "algoliasearch";
import dayjs from "dayjs";

import env from "@/env.config";

import { getPublishedPosts, getPostBySlug } from "../lib/posts";
import { getAllProjects, getProjectBySlug } from "../lib/projects";

const stripMarkdown = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const generateAlgoliaProjects = () => {
  const projects = getAllProjects();

  return projects.map((project) => {
    const { content } = getProjectBySlug(project.slug);

    return {
      ...project,
      content: stripMarkdown(content),
      objectID: project.slug,
      timestamp: dayjs(project.modifiedAt, "DD-MM-YYYY").unix(),
    };
  });
};

const generateAlgoliaPosts = () => {
  const posts = getPublishedPosts();

  return posts.map((post) => {
    const { content } = getPostBySlug(post.slug);

    return {
      ...post,
      content: stripMarkdown(content),
      objectID: post.slug,
      timestamp: dayjs(post.modifiedAt, "DD-MM-YYYY").unix(),
    };
  });
};

async function run() {
  const client = algoliasearch(env.NEXT_PUBLIC_ALGOLIA_APP_ID, env.ALGOLIA_UPDATE_API_KEY);

  const [indexedProjects, indexedPosts] = await Promise.all([
    client.replaceAllObjects({
      indexName: env.NEXT_PUBLIC_ALGOLIA_PROJECTS_INDEX_NAME,
      objects: generateAlgoliaProjects(),
    }),
    client.replaceAllObjects({
      indexName: env.NEXT_PUBLIC_ALGOLIA_POSTS_INDEX_NAME,
      objects: generateAlgoliaPosts(),
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
