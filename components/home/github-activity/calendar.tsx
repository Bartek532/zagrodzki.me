"use client";

import { useTheme } from "next-themes";
import { ActivityCalendar } from "react-activity-calendar";
import colors from "tailwindcss/colors";

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
            colors.neutral[200],
            colors.green[200],
            colors.green[400],
            colors.green[600],
            colors.green[800],
          ],
          dark: [
            colors.neutral[800],
            colors.green[900],
            colors.green[700],
            colors.green[500],
            colors.green[400],
          ],
        }}
      />
    </>
  );
};
