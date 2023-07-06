"use client";

import { ThemeProvider } from "./ThemeProvider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>{children}</ThemeProvider>
);
