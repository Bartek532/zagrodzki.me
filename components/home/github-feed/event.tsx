import {
  CommentIcon,
  FeedPublicIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  IssueReopenedIcon,
  IssueTrackedByIcon,
  IssueTracksIcon,
  RepoForkedIcon,
  RepoIcon,
  StarIcon,
  TagIcon,
} from "@primer/octicons-react";

import type { RestEndpointMethodTypes } from "@octokit/rest";

const EventDate = ({ date }: { date: string | null }) => {
  if (!date) {
    return <div className="text-muted-foreground shrink-0">Recently</div>;
  }

  return (
    <div className="text-muted-foreground shrink-0">
      {new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </div>
  );
};

type EventType =
  | "CommitCommentEvent"
  | "CreateEvent"
  | "DeleteEvent"
  | "ForkEvent"
  | "GollumEvent"
  | "IssueCommentEvent"
  | "IssuesEvent"
  | "MemberEvent"
  | "PublicEvent"
  | "PullRequestEvent"
  | "PullRequestReviewEvent"
  | "PullRequestReviewCommentEvent"
  | "PullRequestReviewThreadEvent"
  | "PushEvent"
  | "ReleaseEvent"
  | "SponsorshipEvent"
  | "WatchEvent";

type GitHubEvent =
  RestEndpointMethodTypes["activity"]["listPublicEventsForUser"]["response"]["data"][0];

const PullRequestEvent = ({ event }: { event: GitHubEvent }) => {
  const payload = event.payload as {
    action: string;
    number?: number;
    pull_request?: {
      number?: number;
      title?: string;
      user?: {
        login: string;
      };
    };
  };

  if (payload.action !== "merged" && payload.action !== "opened") {
    return null;
  }

  const number = payload.number ?? payload.pull_request?.number;
  const title = payload.pull_request?.title;
  const author = payload.pull_request?.user?.login;
  const label = title ?? (number ? `#${number}` : "pull request");
  const verb = payload.action === "merged" ? "Merged" : "Opened";

  return (
    <div className="flex items-center gap-4">
      <GitPullRequestIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        {verb}
        {author ? ` ${author}'s` : ""} {label} on {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const IssuesEvent = ({ event }: { event: GitHubEvent }) => {
  const action = (
    event.payload as {
      action:
        | "opened"
        | "edited"
        | "closed"
        | "reopened"
        | "assigned"
        | "unassigned"
        | "labeled"
        | "unlabeled";
    }
  ).action;
  let Icon = IssueOpenedIcon;

  if (action === "reopened" || action === "edited") {
    Icon = IssueReopenedIcon;
  } else if (action === "closed") {
    Icon = IssueClosedIcon;
  } else if (action === "assigned" || action === "unassigned") {
    Icon = IssueTrackedByIcon;
  } else if (action === "labeled" || action === "unlabeled") {
    Icon = IssueTracksIcon;
  }

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        <span className="capitalize">{event.payload.action}</span> {event.payload.issue?.title} on{" "}
        {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PublicEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <FeedPublicIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">Open-sourced {event.repo.name} on GitHub</div>
    <EventDate date={event.created_at} />
  </div>
);

const IssueCommentEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <CommentIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">
      Commented on {event.payload.issue?.title} (#
      {event.payload.issue?.number})
    </div>
    <EventDate date={event.created_at} />
  </div>
);

const CreateEvent = ({ event }: { event: GitHubEvent }) => {
  let Icon = GitBranchIcon;
  const refType = (event.payload as { ref_type: "branch" | "repository" | "tag" }).ref_type;

  if (refType === "repository") {
    Icon = RepoIcon;
  } else if (refType === "tag") {
    Icon = TagIcon;
  }

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Created a {refType} on {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const DeleteEvent = ({ event }: { event: GitHubEvent }) => {
  const refType = (event.payload as { ref_type: "branch" | "tag" }).ref_type;

  if (refType === "branch") {
    return null;
  }

  const Icon = TagIcon;

  return (
    <div className="flex items-center gap-4">
      <Icon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Deleted a {refType} on {event.repo.name}
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const WatchEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <StarIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">Starred {event.repo.name}</div>
    <EventDate date={event.created_at} />
  </div>
);

const ForkEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <RepoForkedIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">Forked {event.repo.name}</div>
    <EventDate date={event.created_at} />
  </div>
);

const PullRequestReviewEvent = ({ event }: { event: GitHubEvent }) => {
  const pullRequest = (
    event.payload as {
      pull_request: {
        title: string;
        number: number;
      };
    }
  ).pull_request;

  return (
    <div className="flex items-center gap-4">
      <GitPullRequestIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Reviewed pull request {pullRequest.title} (#{pullRequest.number})
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PullRequestReviewCommentEvent = ({ event }: { event: GitHubEvent }) => {
  const pullRequest = (
    event.payload as {
      pull_request: {
        title: string;
        number: number;
      };
    }
  ).pull_request;

  return (
    <div className="flex items-center gap-4">
      <GitPullRequestIcon className="h-4 w-4 shrink-0" />
      <div className="flex-1 truncate">
        Commented on pull request {pullRequest.title} (#{pullRequest.number})
      </div>
      <EventDate date={event.created_at} />
    </div>
  );
};

const PullRequestReviewThreadEvent = ({ event }: { event: GitHubEvent }) => (
  <div className="flex items-center gap-4">
    <GitPullRequestIcon className="h-4 w-4 shrink-0" />
    <div className="flex-1 truncate">
      Marked a pull request thread as {event.payload.action} on {event.repo.name}
    </div>
    <EventDate date={event.created_at} />
  </div>
);

export const GitHubEvent = ({ event }: { event: GitHubEvent }) => {
  const type = event.type as EventType;

  switch (type) {
    case "PullRequestEvent":
      return PullRequestEvent({ event });
    case "WatchEvent":
      return WatchEvent({ event });
    case "ForkEvent":
      return ForkEvent({ event });
    case "PullRequestReviewEvent":
      return PullRequestReviewEvent({ event });
    case "PullRequestReviewCommentEvent":
      return PullRequestReviewCommentEvent({ event });
    case "PullRequestReviewThreadEvent":
      return PullRequestReviewThreadEvent({ event });
    case "PublicEvent":
      return PublicEvent({ event });
    case "IssueCommentEvent":
      return IssueCommentEvent({ event });
    case "CreateEvent":
      return CreateEvent({ event });
    case "DeleteEvent":
      return DeleteEvent({ event });
    case "IssuesEvent":
      return IssuesEvent({ event });
    default:
      return null;
  }
};
