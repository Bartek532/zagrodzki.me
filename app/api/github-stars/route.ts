import env from "@/env.config";
import { octokit } from "@/lib/github";

const GITHUB_ORG = "turbostarter";

const sumStars = (repos: { stargazers_count?: number | null }[]) =>
  repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

export async function GET() {
  let stars = 0;

  try {
    const userRepos = await octokit.paginate(octokit.rest.repos.listForUser, {
      username: env.NEXT_PUBLIC_GITHUB_USERNAME,
      per_page: 100,
    });
    stars += sumStars(userRepos);
  } catch {
    // Ignore user repo failures so the endpoint still responds.
  }

  try {
    const orgRepos = await octokit.paginate(octokit.rest.repos.listForOrg, {
      org: GITHUB_ORG,
      per_page: 100,
    });
    stars += sumStars(orgRepos);
  } catch {
    // Org may be private or token may lack access; skip it.
  }

  return Response.json(
    { stars },
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
