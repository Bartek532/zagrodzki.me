"use client";

import tailwind from "@/lib/tailwind";
import { useTheme } from "next-themes";
import { ActivityCalendar, Props } from "react-activity-calendar";

export const Calendar = (props: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <ActivityCalendar
      {...props}
      colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
      theme={{
        light: [
          tailwind.theme.colors.neutral[200],
          tailwind.theme.colors.green[200],
          tailwind.theme.colors.green[400],
          tailwind.theme.colors.green[600],
          tailwind.theme.colors.green[800],
        ],
        dark: [
          tailwind.theme.colors.neutral[800],
          tailwind.theme.colors.green[200],
          tailwind.theme.colors.green[400],
          tailwind.theme.colors.green[600],
          tailwind.theme.colors.green[800],
        ],
      }}
    />
  );
};
