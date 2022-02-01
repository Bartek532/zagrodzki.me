import { allCategories } from "data/categories";

export const getBreadcrumbs = (type: "project" | "post", category?: string) => {
  if (type === "post" && category) {
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
