"use client";

import { motion, useReducedMotion } from "motion/react";

import type { ReactNode } from "react";

interface ViewAnimationProps {
  initial?: Record<string, string | number>;
  whileInView?: Record<string, string | number>;
  animate?: Record<string, string | number>;
  delay?: number;
  className?: string;
  children: ReactNode;
  viewport?: {
    once?: boolean;
    amount?: "some" | "all" | number;
  };
}

export const ViewAnimation = ({
  initial,
  whileInView,
  animate,
  delay,
  className,
  children,
  viewport = { once: true, amount: 0.5 },
}: ViewAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", ...initial }}
      whileInView={{ filter: "blur(0px)", ...whileInView }}
      className={className}
      viewport={viewport}
      transition={{ delay: delay ?? 0, duration: 0.8 }}
      {...(animate ? { animate } : {})}
    >
      {children}
    </motion.div>
  );
};
