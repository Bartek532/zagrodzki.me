import type { SyntheticEvent } from "react";

export const onPromise =
  <T>(promise: (event: SyntheticEvent) => Promise<T>) =>
  (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };

export const normalizeCount = (count: number) =>
  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
