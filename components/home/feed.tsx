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
        "relative flex flex-col gap-2 p-6 font-mono text-xs text-muted-foreground",
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
      <div className="absolute bottom-6 left-0 right-0 z-10 h-40 bg-gradient-to-b from-transparent to-background" />
    </Section>
  );
};
