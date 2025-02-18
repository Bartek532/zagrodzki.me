"use client";

import { useTheme } from "next-themes";
import { ActivityCalendar } from "react-activity-calendar";

import tailwind from "@/lib/tailwind";

import type { Props } from "react-activity-calendar";

export const Calendar = (props: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <span className="sr-only">github activity - {resolvedTheme}</span>
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
            tailwind.theme.colors.green[900],
            tailwind.theme.colors.green[700],
            tailwind.theme.colors.green[500],
            tailwind.theme.colors.green[400],
          ],
        }}
      />
    </>
  );
};
