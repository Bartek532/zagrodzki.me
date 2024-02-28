import { random } from "lodash";

export const generatePosition = (width: number, quarter: number) => {
  const halfWidth = width / 2;

  const x = random(0, halfWidth);
  const y = random(0, halfWidth);

  switch (quarter) {
    case 0:
      return {
        x,
        y,
      };
    case 1:
      return {
        x,
        y: -y,
      };
    case 2:
      return {
        x: -x,
        y: -y,
      };
    case 3:
      return {
        x: -x,
        y,
      };
  }

  return {
    x,
    y,
  };
};
