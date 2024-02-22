"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useTheme } from "./ThemeProvider";

export const ThemeChanger = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const [fgTheme, bgTheme] = theme === "light" ? ["dark,light"] : ["light", "dark"];

  return (
    <AnimatePresence>
      <span
        data-theme={fgTheme}
        key={`span-theme-${fgTheme}`}
        style={{
          position: "relative",
        }}
      >
        <motion.div
          key={`theme-${fgTheme}`}
          initial={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          animate={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
          transition={{ duration: 3, ease: [0.17, 0.5, 0.9, 1] }}
          style={{
            backgroundColor: "var(--bg-100)",
            color: "var(--black-100)",
            position: "absolute",
            width: "100vw",
            height: "100vh",
            zIndex: 10,
          }}
        >
          {children}
        </motion.div>
      </span>

      <span key={`span-theme-${theme}`} data-theme={bgTheme}>
        <motion.div
          key={`theme-${bgTheme}`}
          style={{
            backgroundColor: "var(--bg-100)",
            color: "var(--black-100)",
            position: "absolute",
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
        >
          {children}
        </motion.div>
      </span>
    </AnimatePresence>
  );
};
