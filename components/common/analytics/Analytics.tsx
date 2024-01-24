"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

import { env } from "env/client";
import { reportPageView } from "lib/gtag";

const isProduction = process.env.NODE_ENV === "production";

export const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (isProduction) {
      reportPageView(pathname);
    }
  }, [pathname]);

  return (
    <>
      <SpeedInsights />
      <VercelAnalytics />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('config', '${env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  );
};
