import rehypePrism from "@mapbox/rehype-prism";
import visit from "unist-util-visit";

import type { Node } from "unist";

interface HtmlNode extends Node {
  tagName: string;
  type: "element";
  children?: (HtmlNode | TextNode)[];
  properties?: Record<string, string[] | string | undefined>;
}

interface TextNode extends Node {
  type: "text";
  value: string;
}

interface PreNode extends HtmlNode {
  tagName: "pre";
  properties?: {
    className?: string[] | undefined;
    [prop: string]: string[] | string | undefined;
  };
}
interface CodeNode extends HtmlNode {
  tagName: "code";
  properties?: {
    className?: string[] | undefined;
    [prop: string]: string[] | string | undefined;
  };
}

const isPreNode = (node: Node): node is PreNode => {
  return node.type === "element" && "tagName" in node && node.tagName === "pre";
};

const isCodeNode = (node: Node): node is CodeNode => {
  return (
    node.type === "element" && "tagName" in node && node.tagName === "code"
  );
};

export const addDataToCodeBlocks = (): import("unified").Transformer => {
  return (tree) => {
    visit(tree, "element", (node: Node) => {
      if (!isPreNode(node) && !isCodeNode(node)) {
        return;
      }

      const prefix = "language-";
      const lang = node.properties?.className
        ?.find((className) => className.startsWith(prefix))
        ?.slice(prefix.length);
      if (lang) {
        node.properties = {
          ...node.properties,
          "data-lang": lang,
        };
      }
    });
  };
};

export const commonRehypePlugins = [rehypePrism, addDataToCodeBlocks];
