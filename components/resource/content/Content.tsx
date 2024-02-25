"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { memo } from "react";

import { CONTENT_ID } from "utils/consts";

import { Link } from "../../common/link/Link";

import * as CustomComponents from "./components/custom";
import { Heading } from "./components/heading/Heading";
import { Highlight } from "./components/highlight/Highlight";
import { Image } from "./components/image/Image";
import { Pre } from "./components/pre/Pre";
import { Quote } from "./components/quote/Quote";
import { Sandbox } from "./components/sandbox/Sandbox";

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
  Highlight,
  Sandbox: ({ id }: { id: string }) => <Sandbox id={id} />,
  pre: Pre,
  ...CustomComponents,
} as unknown as Record<string, React.ReactNode>;

export const Content = memo<ContentProps>(({ content }) => (
  <div className={CONTENT_ID} id={CONTENT_ID}>
    <MDXRemote {...content} components={customMdxComponents} />
  </div>
));

Content.displayName = "Content";
