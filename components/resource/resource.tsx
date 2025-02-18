import { memo, Suspense } from "react";

import { Section } from "@/components/common/sections/section";
import { Content } from "@/components/resource/content/content";
import { TableOfContents } from "@/components/resource/content/table-of-contents/table-of-contents";
import { Author } from "@/components/resource/layout/author";
import { Footer } from "@/components/resource/layout/footer/footer";
import { Likes } from "@/components/resource/layout/likes/likes";
import { ViewAnimation } from "@/providers/view-animation";
import { cn } from "@/utils";

import { Hero } from "./layout/hero/hero";

import type { Resource as ResourceType } from "@/types";

interface ResourceProps {
  readonly metadata: ResourceType;
  readonly content: string;
}

export const Resource = memo<ResourceProps>(({ metadata, content }) => (
  <>
    <Hero resource={metadata} />
    <Section className={cn("lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0")}>
      <div className="col-span-2">
        <Content content={content} />
        <Footer resource={metadata} />

        <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <div className="border-t">
            <Author name={metadata.author} />
          </div>
        </ViewAnimation>
      </div>

      <aside className="hidden px-10 py-16 lg:block">
        <div className="sticky top-28 flex flex-col items-start gap-8">
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
