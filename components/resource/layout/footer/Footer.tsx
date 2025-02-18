import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Suspense, memo } from "react";

import { Link } from "@/components/common/link/link";
import { resourceRoutes } from "data/routes";
import { RESOURCE_TYPE, Resource } from "types";
import { HOST } from "utils/consts";

import { Likes } from "../likes/likes";

import { Views } from "./views";
import { env } from "@/env/client";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

type FooterProps = {
  readonly resource: Resource;
};

export const Footer = memo<FooterProps>(({ resource }) => {
  const url = `${HOST}/${resourceRoutes[resource.type]}/${resource.slug}`;

  return (
    <>
      <div className="flex flex-col gap-6 px-6 sm:px-8 lg:px-10 max-w-3xl mx-auto pb-8">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="shrink-0 lg:hidden">
            <Suspense fallback={null}>
              <Likes slug={resource.slug} type={resource.type} />
            </Suspense>
          </div>
          <div className="flex flex-col items-end text-sm italic opacity-60 text-muted-foreground">
            <div className="text-sm">
              {dayjs(resource.modifiedAt, "DD-MM-YYYY").format("MMMM Do, YYYY")}
            </div>
            <Suspense fallback={null}>
              <Views slug={resource.slug} type={resource.type} />
            </Suspense>
          </div>
        </div>
        <div className="flex items-center justify-end sm:justify-between gap-4">
          <div className="items-center gap-4 hidden sm:flex">
            <Link href={`https://x.com/share?url=${url}&text=${resource.title} -`}>
              Tweet about
            </Link>

            <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}>
              Share on LinkedIn
            </Link>
          </div>
          <Link
            href={`https://github.com/${
              env.NEXT_PUBLIC_GITHUB_USERNAME
            }/zagrodzki.me/tree/main/content/${
              resource.type === RESOURCE_TYPE.POST ? "posts" : "projects"
            }/${resource.slug}.mdx`}
          >
            Edit on Github
          </Link>
        </div>
      </div>
    </>
  );
});

Footer.displayName = "Footer";
