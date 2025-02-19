import { allCategories } from "@/data/categories";
import { RESOURCE_TYPE } from "@/types";

export const getBreadcrumbs = (type: RESOURCE_TYPE, category?: string) => {
  if (type === RESOURCE_TYPE.POST && category) {
    const categoryName = allCategories.find((c) => c.slug === category)?.name;
    const base = [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
    ];

    if (categoryName) {
      return [...base, { path: `/blog?category=${category}`, name: categoryName }];
    }

    return base;
  }

  return [
    { path: "/", name: "Home" },
    { path: "/work", name: "Work" },
  ];
};
