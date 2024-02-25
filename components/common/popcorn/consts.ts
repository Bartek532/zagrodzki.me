export const allCorns = [
  {
    id: 1,
    left: 35,
    width: 18,
    y: -160,
    x: -150,
    rotate: {
      initial: 0,
      final: -250,
    },
    zIndex: 1,
  },
  {
    id: 2,
    left: 10,
    width: 21,
    y: -160,
    x: 100,
    rotate: {
      initial: 100,
      final: -150,
    },
    zIndex: 2,
  },
  {
    id: 3,
    left: 62,
    width: 24,
    y: -165,
    x: -205,
    rotate: {
      initial: 30,
      final: -160,
    },
    zIndex: 1,
  },
  {
    id: 4,
    left: 32,
    width: 24,
    y: -165,
    x: 130,
    rotate: {
      initial: 20,
      final: -210,
    },
    zIndex: 3,
  },
  {
    id: 5,
    left: 45,
    width: 27,
    y: -158,
    x: -20,
    rotate: {
      initial: -70,
      final: 100,
    },
    zIndex: 2,
  },
  {
    id: 6,
    left: 48,
    width: 20,
    y: -240,
    x: 60,
    rotate: {
      initial: 90,
      final: -180,
    },
    zIndex: 1,
  },
  {
    id: 7,
    left: 14,
    width: 22,
    y: -250,
    x: 150,
    rotate: {
      initial: 0,
      final: -150,
    },
    zIndex: 2,
  },
  {
    id: 8,
    left: 65,
    width: 27,
    y: -200,
    x: -190,
    rotate: {
      initial: 20,
      final: 140,
    },
    zIndex: 0,
  },
  {
    id: 9,
    left: 64,
    width: 21,
    y: -250,
    x: -150,
    rotate: {
      initial: 200,
      final: -40,
    },
    zIndex: 1,
  },
  {
    id: 10,
    left: 25,
    width: 29,
    y: -230,
    x: 45,
    rotate: {
      initial: 0,
      final: -130,
    },
    zIndex: 1,
  },
];

export const transition = {
  transition: {
    duration: 1,
    mass: 1,
    damping: 50,
    stiffness: 100,
    velocity: 2,
    ease: "easeInOut",
    opacity: {
      duration: 1,
      delay: 0.5,
    },
  },
};
