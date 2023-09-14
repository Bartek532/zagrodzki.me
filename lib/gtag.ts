import { env } from "env/client";

declare global {
  interface Window {
    gtag: (type: string, id: string, options: { page_path: string }) => void;
  }
}

export const reportPageView = (url: string) => {
  if (typeof window !== "undefined") {
    window.gtag("config", env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
