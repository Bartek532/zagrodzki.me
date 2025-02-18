import clsx from "clsx";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

dayjs.extend(advancedFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
};

export const handleError = (error: unknown) => {
  const message = parseError(error);

  toast.error(message);
};

export const formatDate = (date: string) => dayjs(date, "DD-MM-YYYY").format("MMMM Do, YYYY");
