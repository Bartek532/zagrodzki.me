"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

import Corn from "public/svg/popcorn/corn.svg";
import Cup from "public/svg/popcorn/cup.svg";

import { allCorns, transition } from "./consts";
import styles from "./popcorn.module.scss";

type PopcornProps = {
  readonly width?: number;
  readonly onAdd?: () => void | Promise<void>;
  readonly onRemove?: () => void | Promise<void>;
  readonly count?: number;
};

export const Popcorn = memo<PopcornProps>(({ width = 100, count = 0, onAdd, onRemove }) => (
  <motion.button
    className={styles.button}
    whileTap={{ scale: 0.9, rotateZ: 3, transition: { ease: "easeInOut" } }}
    whileHover={{ scale: 1.05 }}
    onClick={onAdd}
    onContextMenu={(e) => {
      e.preventDefault();
      void onRemove?.();
    }}
  >
    <Cup width={width} className={styles.cup} />

    <AnimatePresence initial={false}>
      {allCorns.slice(0, count).map((corn, index) => (
        <motion.div
          key={corn.id}
          className={styles.corn}
          initial={{
            rotateZ: corn.rotate.initial,
            zIndex: corn.zIndex,
            width: corn.width + "%",
            left: corn.left + "%",
          }}
          animate={{
            y: [null, `-${300 + index * 10}%`, corn.y + "%"],
            x: corn.x + "%",
            rotateZ: [null, corn.rotate.final / 3, corn.rotate.final],
            ...transition,
          }}
          exit={{
            y: [null, `-${300 + index * 10}%`, "40%"],
            rotateZ: [null, corn.rotate.final / 3, corn.rotate.initial],
            x: -corn.x + "%",
            opacity: 0,
            ...transition,
          }}
        >
          <Corn />
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.button>
));

Popcorn.displayName = "Popcorn";
