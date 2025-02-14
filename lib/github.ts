import { Octokit } from "@octokit/rest";

import { env } from "@/env/server";

export const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
});
