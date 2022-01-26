export const getBreadcrumbs = (type: "project" | "post", category?: string) => {
  if (type === "post" && category) {
    return [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
      { path: `/blog?category=${encodeURIComponent(category)}`, name: category },
    ];
  }

  return [
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
  ];
};
