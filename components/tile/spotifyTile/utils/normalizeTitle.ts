export const normalizeTitle = (title: string) => {
  return title.length > 25 ? title.substring(0, 22) + "..." : title;
};
