import { Quote as QuoteIcon } from "lucide-react";

interface QuoteProps {
  readonly text: string;
  readonly author: string;
}

export const Quote = ({ text, author }: QuoteProps) => (
  <blockquote className="relative -mx-1 my-8 rounded-r-xl border-l-4 border-sky bg-sky/15 p-6 pb-0.5 text-foreground sm:-mx-3">
    <div className="absolute right-8 top-6 z-0 aspect-square w-[20%] max-w-24">
      <QuoteIcon className="h-full w-full text-sky/25" />
    </div>
    <p className="mt-0 max-w-xl [&::after]:content-[''] [&::before]:content-['']">{text}</p>
    <p>{author}</p>
  </blockquote>
);
