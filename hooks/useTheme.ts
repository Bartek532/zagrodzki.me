import { useState, useEffect, createContext, useContext } from "react";

import { useLocalStorage } from "hooks/useLocalStorage";

type ThemeVariants = "system" | "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<ThemeVariants>("theme", "system");
  const [systemTheme, setSystemTheme] = useState<Exclude<ThemeVariants, "system"> | null>(null);

  useEffect(() => {
    setSystemTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme!);
  }, [theme]);

  const invertTheme = (theme: Exclude<ThemeVariants, "system"> | null) => (theme === "dark" ? "light" : "dark");

  const toggleTheme = () => {
    setTheme(theme === "system" ? invertTheme(systemTheme) : invertTheme(theme));
  };

  return { theme: theme === "system" ? systemTheme : theme, toggleTheme, setTheme };
};
