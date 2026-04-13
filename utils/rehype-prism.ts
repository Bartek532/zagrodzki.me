import { toString } from "hast-util-to-string";
import { refractor } from "refractor";
import { visit } from "unist-util-visit";

import type { Element, Root } from "hast";
import type { Plugin } from "unified";

/**
 * Syntax highlighting for MDX/rehype (same behavior as legacy @mapbox/rehype-prism),
 * using refractor 4 + prism 1.30+ instead of the abandoned mapbox package.
 */
export default function rehypePrism(options?: {
  readonly alias?: Record<string, string | readonly string[]>;
  readonly ignoreMissing?: boolean;
}): Plugin<[], Root> {
  const alias = options?.alias;
  const ignoreMissing = options?.ignoreMissing ?? false;

  if (alias) {
    refractor.alias(alias);
  }

  return () => (tree: Root) => {
    visit(tree, "element", (node: Element, _index, parent) => {
      if (parent?.type !== "element" || parent.tagName !== "pre" || node.tagName !== "code") {
        return;
      }

      const lang = getLanguage(node);
      if (lang === null) {
        return;
      }

      try {
        const pre = parent;
        pre.properties = { ...pre.properties };
        const existing = pre.properties.className;
        const base = Array.isArray(existing)
          ? [...existing]
          : typeof existing === "string"
            ? [existing]
            : [];
        pre.properties.className = [...base, `language-${lang}`];
        const result = refractor.highlight(toString(node), lang);
        node.children = result.children as Element["children"];
      } catch (err) {
        if (ignoreMissing && err instanceof Error && err.message.includes("Unknown language")) {
          return;
        }
        throw err;
      }
    });
  };
}

function getLanguage(node: Element): string | null {
  const className = node.properties.className;
  const list = Array.isArray(className)
    ? className
    : typeof className === "string"
      ? [className]
      : [];

  for (const item of list) {
    if (typeof item === "string" && item.startsWith("language-")) {
      return item.slice(9).toLowerCase();
    }
  }

  return null;
}
