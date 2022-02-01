import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { ThemeProvider } from "context/ThemeContext";
import { Seo } from "components/Seo";
import * as gtag from "lib/gtag";

const isProduction = process.env.NODE_ENV === "production";
const isBrowser = typeof window !== "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
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
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, viewport-fit=cover" />
      </Head>

      <Seo />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
