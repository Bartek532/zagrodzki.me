"use client";

import { ThemeProvider } from "./ThemeProvider";
import { ThemeChanger } from "./xd";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <ThemeChanger>{children}</ThemeChanger>
  </ThemeProvider>
);
