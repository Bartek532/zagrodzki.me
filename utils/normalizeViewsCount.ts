export const normalizeViewsCount = (count: number) => {
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
