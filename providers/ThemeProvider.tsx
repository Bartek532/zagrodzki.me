import { useState, useEffect } from "react";

import { useLocalStorage } from "hooks/useLocalStorage";
import { createSafeContext } from "lib/context";

type ThemeVariants = "system" | "dark" | "light";

interface ThemeContext {
  theme: ThemeVariants;
  setTheme: (theme: Exclude<ThemeVariants, "system">) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const [useTheme, ThemeContextProvider] = createSafeContext<ThemeContext>();

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useLocalStorage<ThemeVariants>("theme", "system");
  const [systemTheme, setSystemTheme] = useState<Exclude<ThemeVariants, "system"> | null>(null);

  useEffect(() => {
    setSystemTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme!);
  }, [theme]);

  const invertTheme = (theme: Exclude<ThemeVariants, "system"> | null) =>
    theme === "dark" ? "light" : "dark";

  const toggleTheme = () => {
    setTheme(theme === "system" ? invertTheme(systemTheme) : invertTheme(theme));
  };

  return (
    <ThemeContextProvider
      value={{
        theme: theme === "system" ? systemTheme! : theme!,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContextProvider>
  );
};

export { useTheme, ThemeProvider };
