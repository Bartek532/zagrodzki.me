import { getAllProjects } from "./lib/projects";
import algoliasearch from "algoliasearch";
import dayjs from "dayjs";
import invariant from "invariant";

async function run() {
  invariant(!!process.env.ALGOLIA_UPDATE_API_KEY, "Admin API KEY is not set");

  const client = algoliasearch("3EE43YCZQB", process.env.ALGOLIA_UPDATE_API_KEY);
  const index = client.initIndex("projects");

  const projects = getAllProjects();
  const algoliaItems = projects.map((project) => {
    return {
      ...project,
      objectID: project.slug,
      timestamp: dayjs(project.publishedAt, "DD-MM-YYYY").unix(),
    };
  });

  const results = await index.saveObjects(algoliaItems);
  console.log(`${results.objectIDs.length} items indexed`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
