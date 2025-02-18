import { unstable_cache as cache } from "next/cache";
import Image from "next/image";

import { ViewAnimation } from "@/providers/view-animation";

const getLatestRead = cache(
  () =>
    Promise.resolve({
      id: 1,
      title: "Thinking Fast and Slow",
      author: "Daniel Kahneman",
      thumbnail:
        "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg",
      link: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
    }),
  ["latest-read"],
  { revalidate: 60 * 60 * 24 },
);

export const LatestRead = async () => {
  const data = await getLatestRead();

  const { title, author, thumbnail, link } = data;

  return (
    <ViewAnimation initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="h-full">
      <a
        href={link}
        className="group relative block h-full w-full overflow-hidden rounded-lg border bg-card shadow-tile transition-colors hover:bg-accent"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="flex h-full items-center justify-between">
          <div className="relative flex h-full min-w-0 flex-col justify-between self-stretch p-6 sm:p-8">
            <small className="text-muted-foreground">Recently read 📚 </small>
            <div className="mt-16 flex flex-col gap-1">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>

              <p className="truncate text-sm text-muted-foreground sm:text-base">by {author}</p>
            </div>
          </div>

          <div className="relative w-2/5 shrink-0 self-stretch">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover object-top transition-transform group-hover:scale-105"
            />
          </div>
        </div>
      </a>
    </ViewAnimation>
  );
};
