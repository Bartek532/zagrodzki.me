import { env } from "env/client";

export const reportPageView = (url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
