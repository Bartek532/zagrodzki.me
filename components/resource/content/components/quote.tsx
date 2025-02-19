import { Quote as QuoteIcon } from "lucide-react";

interface QuoteProps {
  readonly text: string;
  readonly author: string;
}

export const Quote = ({ text, author }: QuoteProps) => (
  <blockquote className="border-sky bg-sky/15 text-foreground relative -mx-1 my-8 rounded-r-xl border-l-4 p-6 pb-0.5 sm:-mx-3">
    <div className="absolute top-6 right-8 z-0 aspect-square w-[20%] max-w-24">
      <QuoteIcon className="text-sky/25 h-full w-full" />
    </div>
    <p className="mt-0 max-w-xl [&::after]:content-[''] [&::before]:content-['']">{text}</p>
    <p>{author}</p>
  </blockquote>
);
