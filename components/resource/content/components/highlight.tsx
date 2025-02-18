import { cn } from "@/utils";
import { CircleAlert, CircleCheck, CircleXIcon } from "lucide-react";
import { memo } from "react";

interface HighlightProps {
  readonly variant: "success" | "error" | "warning";
  readonly title: string;
  readonly children: React.ReactNode;
}

const icons = {
  success: CircleCheck,
  error: CircleXIcon,
  warning: CircleAlert,
} as const;

export const Highlight = memo<HighlightProps>(({ variant, title, children }) => {
  const Icon = icons[variant];

  const variantStyles = {
    success: "bg-success/15 border-success text-success",
    error: "bg-destructive/15 border-destructive text-destructive",
    warning: "bg-warning/15 border-warning text-warning",
  };

  return (
    <aside
      className={cn(
        "relative flex flex-col items-start my-8 -mx-1 sm:-mx-3 p-6 pb-0.5 rounded-r-xl border-l-4",
        variantStyles[variant],
      )}
    >
      <div className="absolute top-6 right-8 w-[17%] max-w-20 z-0 opacity-20 aspect-square">
        <Icon className="w-full h-full" />
      </div>
      <strong className="text-foreground font-bold">{title}</strong>
      <div className="relative z-10 text-foreground max-w-full">{children}</div>
    </aside>
  );
});

Highlight.displayName = "Highlight";
