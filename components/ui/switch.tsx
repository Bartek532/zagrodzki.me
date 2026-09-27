"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/utils";

const Switch = ({ className, children, ...props }: SwitchPrimitive.Root.Props) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer bg-border focus-visible:ring-ring focus-visible:ring-offset-background inline-flex w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "bg-background pointer-events-none block size-6 rounded-full p-1 ring-0 transition-transform duration-1000 ease-in-out data-checked:translate-x-5 data-unchecked:translate-x-0",
      )}
    >
      {children}
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
);
Switch.displayName = "Switch";

export { Switch };
