import dayjs from "dayjs";
import { unstable_cache as cache } from "next/cache";

import { Section } from "@/components/common/sections/section";
import { env } from "@/env/client";
import { ViewAnimation } from "@/providers/view-animation";

import { Calendar } from "./calendar";

import type { Activity } from "react-activity-calendar";

const getContributions = cache(
  async () => {
    const today = dayjs().subtract(1, "week").endOf("week");
    const oneYearAgo = today.subtract(365, "day");
    const twoYearsAgo = today.subtract(1092, "day");

    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/Bartek532`);
    const data = (await response.json()) as {
      contributions: Activity[];
    };

    return {
      data: data.contributions
        .filter(({ date }) => dayjs(date).isBefore(today) && dayjs(date).isAfter(twoYearsAgo))
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()),
      total: data.contributions.reduce(
        (total, { date, count }) =>
          dayjs(date).isAfter(oneYearAgo) && dayjs(date).isBefore(today) ? total + count : total,
        0,
      ),
    };
  },
  ["github-contributions"],
  { revalidate: 60 * 60 * 24 },
);

export const GitHubActivity = async () => {
  const github = await getContributions();

  if (!github) {
    return null;
  }

  const quarterLength = Math.floor(github.data.length / 4);
  const firstQuarterData = github.data.slice(0, quarterLength);
  const secondQuarterData = github.data.slice(quarterLength, quarterLength * 2);
  const thirdQuarterData = github.data.slice(quarterLength * 2, quarterLength * 3);
  const fourthQuarterData = github.data.slice(quarterLength * 3);

  return (
    <Section>
      <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative grid gap-0.5 py-6 sm:grid-cols-2 sm:p-8 lg:gap-1"
      >
        {[thirdQuarterData, fourthQuarterData, firstQuarterData, secondQuarterData].map(
          (data, index) => (
            <Calendar key={index} hideColorLegend hideTotalCount hideMonthLabels data={data} />
          ),
        )}
        <div className="absolute right-0 bottom-0 left-0 z-10 h-full bg-gradient-to-b from-transparent to-background lg:bottom-8 lg:h-40" />
        <a
          className="-translate-x-1/2 absolute bottom-4 left-1/2 z-10 whitespace-nowrap font-mono text-muted-foreground text-xs"
          href={`https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {github.total} contributions in the last year 🔥
        </a>
      </ViewAnimation>
    </Section>
  );
};
