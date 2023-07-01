import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { Seo } from "components/Seo";
import * as gtag from "lib/gtag";
import { ThemeProvider } from "providers/ThemeProvider";

import "../styles/globals.scss";

const isProduction = process.env.NODE_ENV === "production";
const isBrowser = typeof window !== "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (isProduction && isBrowser) {
      const handleRouteChange = (url: string) => {
        gtag.reportPageView(url);
      };
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }

    return () => false;
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>

      <Seo />
      <ThemeProvider>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
