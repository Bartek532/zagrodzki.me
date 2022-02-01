import { useState, useEffect, createContext, useContext } from "react";

import { useLocalStorage } from "hooks/useLocalStorage";

type ThemeVariants = "system" | "dark" | "light";

type ThemeContext = {
  theme: ThemeVariants;
  setTheme: (theme: Exclude<ThemeVariants, "system">) => void;
  toggleTheme: () => void;
};

type ThemeProviderProps = { children: React.ReactNode };

const ThemeStateContext = createContext<ThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
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

  return (
    <ThemeStateContext.Provider value={{ theme: theme === "system" ? systemTheme! : theme!, setTheme, toggleTheme }}>
      {children}
    </ThemeStateContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
