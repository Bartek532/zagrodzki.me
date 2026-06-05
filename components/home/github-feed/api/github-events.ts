import { octokit } from "@/lib/github";

import type { RestEndpointMethodTypes } from "@octokit/rest";

type GitHubEvent =
  RestEndpointMethodTypes["activity"]["listPublicEventsForUser"]["response"]["data"][0];

interface PullRequestPayload {
  action: string;
  number?: number;
  pull_request?: {
    number?: number;
    title?: string;
    user?: {
      login: string;
    };
  };
}

export const enrichGitHubEvents = async (events: GitHubEvent[]) => {
  const toFetch = new Map<string, { owner: string; repo: string; number: number }>();

  for (const event of events) {
    if (event.type !== "PullRequestEvent") {
      continue;
    }

    const payload = event.payload as PullRequestPayload;

    if (payload.action !== "merged" || payload.pull_request?.title) {
      continue;
    }

    const number = payload.number ?? payload.pull_request?.number;

    if (!number) {
      continue;
    }

    const [owner, repo] = event.repo.name.split("/");

    if (!owner || !repo) {
      continue;
    }

    toFetch.set(`${event.repo.name}:${number}`, { owner, repo, number });
  }

  if (!toFetch.size) {
    return events;
  }

  const details = await Promise.all(
    [...toFetch.values()].map(async ({ owner, repo, number }) => {
      try {
        const { data } = await octokit.rest.pulls.get({
          owner,
          repo,
          pull_number: number,
        });

        return {
          key: `${owner}/${repo}:${number}`,
          title: data.title,
          author: data.user.login,
        };
      } catch {
        return null;
      }
    }),
  );

  const lookup = new Map(
    details
      .filter((detail) => detail !== null)
      .map((detail) => [detail.key, { title: detail.title, author: detail.author }]),
  );

  return events.map((event) => {
    if (event.type !== "PullRequestEvent") {
      return event;
    }

    const payload = event.payload as PullRequestPayload;

    if (payload.action !== "merged" || payload.pull_request?.title) {
      return event;
    }

    const number = payload.number ?? payload.pull_request?.number;

    if (!number) {
      return event;
    }

    const detail = lookup.get(`${event.repo.name}:${number}`);

    if (!detail) {
      return event;
    }

    return {
      ...event,
      payload: {
        ...event.payload,
        pull_request: {
          ...payload.pull_request,
          title: detail.title,
          user: detail.author ? { login: detail.author } : undefined,
        },
      },
    };
  });
};
