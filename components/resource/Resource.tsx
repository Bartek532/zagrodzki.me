import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo, Suspense } from "react";

import { Section } from "@/components/common/sections/section";
import { Content } from "@/components/resource/content/content";
import { TableOfContents } from "@/components/resource/content/table-of-contents/table-of-contents";
import { Author } from "@/components/resource/layout/author";
import { Footer } from "@/components/resource/layout/footer/footer";
import { Likes } from "@/components/resource/layout/likes/likes";
import { cn } from "@/utils";
import { Resource as ResourceType } from "types";

import { Hero } from "./layout/hero/hero";

type ResourceProps = {
  readonly metadata: ResourceType;
  readonly content: MDXRemoteSerializeResult;
};

export const Resource = memo<ResourceProps>(({ metadata, content }) => (
  <>
    <Hero resource={metadata} />
    <Section className={cn("lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0")}>
      <div className="col-span-2">
        <Content content={content} />
        <Footer resource={metadata} />
        <div className="border-t">
          <Author name={metadata.author} />
        </div>
      </div>

      <aside className={cn("px-10 py-16 hidden lg:block")}>
        <div className="sticky top-28 flex flex-col gap-8 items-start">
          <TableOfContents content={content} />
          <Suspense fallback={null}>
            <Likes slug={metadata.slug} type={metadata.type} />
          </Suspense>
        </div>
      </aside>
    </Section>
  </>
));

Resource.displayName = "Resource";
