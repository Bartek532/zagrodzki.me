const transition = {
  type: "spring",
  stiffness: 200,
  damping: 10,
};

export const sun = {
  whileTap: { scale: 0.95, rotate: 15 },
  coreVariants: {
    initial: { scale: 1.5 },
    animate: { scale: 1, transition },
  },
  raysVariants: {
    initial: { rotate: 45 },
    animate: { rotate: 0, transition },
  },
};
export const moon = {
  variants: {
    initial: { scale: 0.6, rotate: 90 },
    animate: {
      scale: 1,
      rotate: 0,
      transition,
    },
    whileTap: { scale: 0.95, rotate: 15 },
  },
};
