import { motion } from "motion/react";
import { memo } from "react";

import type { ForwardRefComponent, SVGMotionProps } from "motion/react";
import type { ComponentProps } from "react";

const Path = (
  props: ComponentProps<ForwardRefComponent<SVGPathElement, SVGMotionProps<SVGPathElement>>>,
) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    className="stroke-foreground"
    strokeLinecap="round"
    layout
    {...props}
  />
);

interface HamburgerProps {
  readonly open: boolean;
  readonly onToggle: () => void;
}

export const Hamburger = memo<HamburgerProps>(({ open, onToggle }) => (
  <motion.button onClick={onToggle}>
    <span className="sr-only">{open ? "close" : "open"} menu</span>
    <svg width="22" height="20" viewBox="0 0 22 20">
      <Path
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={{
          closed: { d: "M 2 4 L 20 4" },
          open: { d: "M 3 15.5 L 16 4" },
        }}
      />
      <Path
        d="M 2 10 L 20 10"
        animate={open ? "open" : "closed"}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={{
          closed: { d: "M 2 16 L 20 16" },
          open: { d: "M 3 4 L 16 16" },
        }}
      />
    </svg>
  </motion.button>
));

Hamburger.displayName = "Hamburger";
