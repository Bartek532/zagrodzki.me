import { cn } from "@/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border bg-background",
        "bg-[linear-gradient(100deg,rgba(255,255,255,0)_40%,hsl(var(--muted))_50%,rgba(255,255,255,0)_60%)] bg-[length:200%_100%] bg-[180%]",
        "animate-loading",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
