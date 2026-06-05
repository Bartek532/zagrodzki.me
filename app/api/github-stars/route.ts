import env from "@/env.config";
import { octokit } from "@/lib/github";

const GITHUB_ORG = "turbostarter";

export async function GET() {
  const [userRepos, orgRepos] = await Promise.all([
    octokit.paginate(octokit.rest.repos.listForUser, {
      username: env.NEXT_PUBLIC_GITHUB_USERNAME,
      per_page: 100,
    }),
    octokit.paginate(octokit.rest.repos.listForOrg, {
      org: GITHUB_ORG,
      per_page: 100,
    }),
  ]);

  const stars =
    userRepos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0) +
    orgRepos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

  return Response.json(
    { stars },
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
