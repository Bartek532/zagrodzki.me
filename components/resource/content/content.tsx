import { compile, run } from "@mdx-js/mdx";
import { memo } from "react";
import * as runtime from "react/jsx-runtime";

import { Link } from "@/components/common/link/link";
import { Prose } from "@/components/ui/prose";
import { cn } from "@/utils";
import { CONTENT_ID } from "@/utils/consts";
import { commonRehypePlugins } from "@/utils/markdown";

import * as customComponents from "./components/custom";
import { Heading } from "./components/heading";
import { Highlight } from "./components/highlight";
import { Image } from "./components/image";
import { Pre } from "./components/pre";
import { Quote } from "./components/quote";
import { Sandbox } from "./components/sandbox";
import { Video } from "./components/video";

interface ContentProps {
  readonly content: string;
}

interface HeadingComponentProps {
  readonly children: string;
}

const customMdxComponents = {
  h2: (props: HeadingComponentProps) => <Heading level="h2" {...props}></Heading>,
  h3: (props: HeadingComponentProps) => <Heading level="h3" {...props}></Heading>,
  h4: (props: HeadingComponentProps) => <Heading level="h4" {...props}></Heading>,
  h5: (props: HeadingComponentProps) => <Heading level="h5" {...props}></Heading>,
  h6: (props: HeadingComponentProps) => <Heading level="h6" {...props}></Heading>,
  Image,
  Link,
  Quote,
  Video,
  Highlight,
  Sandbox: ({ id }: { id: string }) => <Sandbox id={id} />,
  pre: Pre,
  ...customComponents,
};

export const Content = memo<ContentProps>(async ({ content }) => {
  const code = await compile(content, {
    outputFormat: "function-body",
    // @ts-expect-error - rehype plugins are not typed
    rehypePlugins: commonRehypePlugins,
  });

  const { default: MDXContent } = await run(String(code), {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return (
    <Prose
      className={cn("col-span-2 mx-auto max-w-3xl px-6 py-8 sm:px-8", "lg:px-10 lg:py-16")}
      id={CONTENT_ID}
    >
      <MDXContent source={content} components={customMdxComponents} />
    </Prose>
  );
});

Content.displayName = "Content";
