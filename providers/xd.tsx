"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useTheme } from "./ThemeProvider";

export const ThemeChanger = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  const [fgTheme, bgTheme] = theme === "light" ? ["dark", "light"] : ["light", "dark"];

  return (
    <AnimatePresence>
      <motion.div
        data-theme={fgTheme}
        key={`theme-${fgTheme}`}
        initial={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        animate={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        transition={{ duration: 1.5, ease: [0.17, 0.5, 0.9, 1] }}
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
      <motion.div
        data-theme={bgTheme}
        key={`theme-${fgTheme}`}
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
    </AnimatePresence>
  );
};
