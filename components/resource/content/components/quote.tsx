import { memo } from "react";
import { Quote as QuoteIcon } from "lucide-react";

interface QuoteProps {
  readonly text: string;
  readonly author: string;
}

export const Quote = memo<QuoteProps>(({ text, author }) => (
  <blockquote className="relative text-foreground rounded-r-xl my-8 -mx-1 sm:-mx-3 p-6 pb-0.5 border-l-4 border-sky bg-sky/15">
    <div className="absolute top-6 right-8 z-0 w-[20%] aspect-square max-w-24">
      <QuoteIcon className="w-full h-full text-sky/25" />
    </div>
    <p className="mt-0 [&::before]:content-[''] max-w-xl [&::after]:content-['']">{text}</p>
    <p>{author}</p>
  </blockquote>
));

Quote.displayName = "Quote";
