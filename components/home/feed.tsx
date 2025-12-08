import { Section } from "@/components/common/sections/section";
import { octokit } from "@/lib/github";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { GitHubEvent } from "./event";
import { env } from "@/lib/env";

export const Feed = async () => {
  const activity = await octokit.rest.activity.listPublicEventsForUser({
    username: env.NEXT_PUBLIC_GITHUB_USERNAME,
    per_page: 15,
  });

  return (
    <Section
      className={cn(
        "text-muted-foreground relative flex flex-col gap-2 p-6 font-mono text-xs",
        "sm:px-8 sm:text-sm",
      )}
    >
      {activity.data
        .map((event) => {
          const result = GitHubEvent({ event });
          return result ? { event, result } : null;
        })
        .filter(Boolean)
        .slice(0, 10)
        .map((data, index) => (
          <ViewAnimation
            key={data?.event.id}
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={index * 0.1}
          >
            {data?.result}
          </ViewAnimation>
        ))}
      <div className="to-background absolute right-0 bottom-6 left-0 z-10 h-40 bg-linear-to-b from-transparent" />
    </Section>
  );
};
