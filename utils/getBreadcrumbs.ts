import { allCategories } from "data/categories";
import { RESOURCE_TYPE } from "types";

export const getBreadcrumbs = (type: RESOURCE_TYPE, category?: string) => {
  if (type === RESOURCE_TYPE.POST && category) {
    return [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
      { path: `/blog?category=${category}`, name: allCategories.find((c) => c.slug === category)!.name },
    ];
  }

  return [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
  ];
};
