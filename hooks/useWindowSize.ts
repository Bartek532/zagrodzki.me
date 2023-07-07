import { useState, useEffect } from "react";

interface Dimensions {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: undefined, height: undefined });
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
