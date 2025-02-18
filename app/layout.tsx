import localFont from "next/font/local";

import { WindowsEmojiPolyfill } from "@/components/common/windows-emoji-polyfill";
import { Newsletter } from "@/components/home/newsletter";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { DEFAULT_METADATA, DEFAULT_VIEWPORT } from "@/lib/metadata";
import { Analytics } from "@/providers/analytics";
import { ThemeProvider } from "@/providers/theme";

import "../styles/code.css";
import "../styles/globals.css";

export const metadata = DEFAULT_METADATA;
export const viewport = DEFAULT_VIEWPORT;

const walsheim = localFont({
  src: [
    {
      path: "../public/fonts/GT-Walsheim-Black.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/GT-Walsheim-Bold.woff2",
      weight: "bold",
    },
    {
      path: "../public/fonts/GT-Walsheim-Medium.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/GT-Walsheim-Regular.woff2",
      weight: "normal",
    },
  ],
  display: "swap",
  variable: "--font-walsheim",
});

const mono = localFont({
  src: "../public/fonts/LeagueMono-Regular.woff2",
  display: "swap",
  variable: "--font-mono",
});

const kenfolg = localFont({
  src: "../public/fonts/Kenfolg.otf",
  display: "swap",
  variable: "--font-kenfolg",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#"
      itemType="http://schema.org/WebPage"
      className={`${walsheim.variable} ${mono.variable} ${kenfolg.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="container mx-auto h-[52px] sm:h-16 sm:border-x" />
          <main className="divide-y sm:border-b">
            {children}
            <Newsletter />
          </main>
          <Footer />
        </ThemeProvider>
        <Toaster />
        <Analytics />
        <WindowsEmojiPolyfill />
      </body>
    </html>
  );
}
