"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

import Corn from "public/svg/popcorn/corn.svg";
import Cup from "public/svg/popcorn/cup.svg";

import { Confetti } from "./confetti/Confetti";
import { MAX_CORNS_COUNT, allCorns, transition } from "./consts";
import styles from "./popcorn.module.scss";

type PopcornProps = {
  readonly width?: number;
  readonly onAdd?: () => void | Promise<void>;
  readonly onRemove?: () => void | Promise<void>;
  readonly count?: number;
};

export const Popcorn = memo<PopcornProps>(({ width = 100, count = 0, onAdd, onRemove }) => (
  <div className={styles.wrapper}>
    <motion.button
      className={styles.button}
      whileTap={{ scale: 1.1, rotateZ: 3 }}
      whileHover={{ scale: 1.05 }}
      onClick={onAdd}
      onContextMenu={(e) => {
        e.preventDefault();
        void onRemove?.();
      }}
    >
      <Cup width={width} className={styles.cup} />

      <AnimatePresence>
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
              y: [null, `-${300 + index * 12}%`, corn.y + "%"],
              x: corn.x + "%",
              rotateZ: [null, corn.rotate.final / 3, corn.rotate.final],
              ...transition,
            }}
            exit={{
              y: [null, `-${300 + index * 12}%`, "40%"],
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
    <div className={styles.confetti}>
      <Confetti
        count={10}
        width={width + 35}
        size={7}
        open={count >= MAX_CORNS_COUNT}
        delay={0.75}
      />
    </div>
  </div>
));

Popcorn.displayName = "Popcorn";
