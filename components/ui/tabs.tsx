"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }: TabsPrimitive.List.Props) => (
  <TabsPrimitive.List
    className={cn(
      "bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1",
      className,
    )}
    {...props}
  />
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ className, ...props }: TabsPrimitive.Tab.Props) => (
  <TabsPrimitive.Tab
    className={cn(
      "ring-offset-background focus-visible:ring-ring data-active:bg-background data-active:text-foreground inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:shadow-sm",
      className,
    )}
    {...props}
  />
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ className, ...props }: TabsPrimitive.Panel.Props) => (
  <TabsPrimitive.Panel
    className={cn(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
      className,
    )}
    {...props}
  />
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
