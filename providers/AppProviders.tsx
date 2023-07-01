"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./ThemeProvider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      {children}
      <ReactQueryDevtools />
    </ThemeProvider>
  </QueryClientProvider>
);
