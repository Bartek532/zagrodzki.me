import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

const meta = {
  title: "Bartosz Zagrodzki",
  description: "Here is the description", //TODO make description
};

export const titleTemplate = `%s | ${meta.title}`;

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <>
      <DefaultSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          type: "website",
          title: meta.title,
          locale: "en_EN",
          url: `https://${process.env.NEXT_PUBLIC_URL!}${asPath}`,
          description: meta.description,
          images: [
            {
              url: `https://${process.env.NEXT_PUBLIC_URL!}/logo_lg.png`,
              width: 1000,
              height: 1000,
            },
          ],
          site_name: meta.title,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
