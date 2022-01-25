export const getBreadcrumbs = (type: "project" | "post", category?: string) => {
  if (type === "post" && category) {
    return [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
      { path: `/blog?category=${category?.toLowerCase()}`, name: category },
    ];
  }

  return [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
  ];
};
