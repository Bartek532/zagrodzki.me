import { cn } from "@/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-background w-full rounded-2xl border",
        "bg-[linear-gradient(100deg,rgba(255,255,255,0)_40%,var(--color-muted)_50%,rgba(255,255,255,0)_60%)] bg-[length:200%_100%] bg-[180%]",
        "animate-loading",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
