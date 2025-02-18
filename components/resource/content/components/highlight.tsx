import { CircleAlert, CircleCheck, CircleXIcon } from "lucide-react";

import { cn } from "@/utils";

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

export const Highlight = ({ variant, title, children }: HighlightProps) => {
  const Icon = icons[variant];

  const variantStyles = {
    success: "bg-success/15 border-success text-success",
    error: "bg-destructive/15 border-destructive text-destructive",
    warning: "bg-warning/15 border-warning text-warning",
  };

  return (
    <aside
      className={cn(
        "relative -mx-1 my-8 flex flex-col items-start rounded-r-xl border-l-4 p-6 pb-0.5 sm:-mx-3",
        variantStyles[variant],
      )}
    >
      <div className="absolute right-8 top-6 z-0 aspect-square w-[17%] max-w-20 opacity-20">
        <Icon className="h-full w-full" />
      </div>
      <strong className="font-bold text-foreground">{title}</strong>
      <div className="relative z-10 max-w-full text-foreground">{children}</div>
    </aside>
  );
};
