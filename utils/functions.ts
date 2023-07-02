import { SyntheticEvent } from "react";

import { allCategories } from "data/categories";
import { RESOURCE_TYPE } from "types";

export const onPromise = <T>(
  promise: (event: SyntheticEvent) => Promise<T>,
) => {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
};

export const normalizeViewsCount = (count: number) =>
  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getHeadings = (source: string) => {
  const HEADING_REGEX = /<h[2-6](.*?)<\/h[2-6]>/g;

  if (source.match(HEADING_REGEX) && typeof window !== "undefined") {
    return source.match(HEADING_REGEX)?.map((heading) => {
      const headingEl = new DOMParser().parseFromString(heading, "text/html")
        .body.firstChild as Element;

      return {
        text: headingEl.textContent,
        level: headingEl.tagName,
        id: headingEl.id,
      };
    });
  }

  return null;
};

export const getBreadcrumbs = (type: RESOURCE_TYPE, category?: string) => {
  if (type === RESOURCE_TYPE.POST && category) {
    return [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
      {
        path: `/blog?category=${category}`,
        name: allCategories.find((c) => c.slug === category)!.name,
      },
    ];
  }

  return [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
  ];
};
