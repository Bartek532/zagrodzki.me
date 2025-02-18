"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo } from "react";

import { Link } from "@/components/common/link/link";
import { Prose } from "@/components/ui/prose";
import { cn } from "@/utils";
import { CONTENT_ID } from "@/utils/consts";

import { Heading } from "./components/heading";
import { Image } from "./components/image";
import { Video } from "./components/video";
import { Sandbox } from "./components/sandbox";
import { Highlight } from "./components/highlight";
import { Quote } from "./components/quote";
import { Pre } from "./components/pre";
interface ContentProps {
  readonly content: MDXRemoteSerializeResult;
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
  // ...CustomComponents,
} as unknown as Record<string, React.ReactNode>;

export const Content = memo<ContentProps>(({ content }) => (
  <Prose
    className={cn("px-6 sm:px-8 py-8 max-w-3xl mx-auto col-span-2", "lg:px-10 lg:py-16")}
    id={CONTENT_ID}
  >
    <MDXRemote {...content} components={customMdxComponents} />
  </Prose>
));

Content.displayName = "Content";
