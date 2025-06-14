import { Section } from "@/components/common/sections/section";
import { octokit } from "@/lib/github";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { GitHubEvent } from "./event";

export const Feed = async () => {
  const activity = await octokit.rest.activity.listPublicEventsForUser({
    username: "Bartek532",
    per_page: 15,
  });

  return (
    <Section
      className={cn(
        "text-muted-foreground relative flex flex-col gap-2 p-6 font-mono text-xs",
        "sm:px-8 sm:text-sm",
      )}
    >
      {activity.data.slice(0, 10).map((event, index) => (
        <ViewAnimation
          key={event.id}
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={index * 0.1}
        >
          <GitHubEvent event={event} />
        </ViewAnimation>
      ))}
      <div className="to-background absolute right-0 bottom-6 left-0 z-10 h-40 bg-linear-to-b from-transparent" />
    </Section>
  );
};
