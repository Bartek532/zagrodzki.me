"use client";

import { AnimatePresence, motion } from "framer-motion";
import { random } from "lodash";
import { memo } from "react";

import Particle1 from "public/svg/confetti/1.svg";
import Particle10 from "public/svg/confetti/10.svg";
import Particle2 from "public/svg/confetti/2.svg";
import Particle3 from "public/svg/confetti/3.svg";
import Particle4 from "public/svg/confetti/4.svg";
import Particle5 from "public/svg/confetti/5.svg";
import Particle6 from "public/svg/confetti/6.svg";
import Particle7 from "public/svg/confetti/7.svg";
import Particle8 from "public/svg/confetti/8.svg";
import Particle9 from "public/svg/confetti/9.svg";

import { transition } from "../consts";

import styles from "./confetti.module.scss";
import { generatePosition } from "./utils";

const particles = [
  Particle1,
  Particle2,
  Particle3,
  Particle4,
  Particle5,
  Particle6,
  Particle7,
  Particle8,
  Particle9,
  Particle10,
];

const DEFAULT_COLORS = ["#EF476F", "#59CBC0", "#FCCCD6", "#94CCFF", "#FDEF72"];

type ConfettiProps = {
  readonly count: number;
  readonly width: number;
  readonly size?: number;
  readonly open?: boolean;
  readonly colors?: string[];
  readonly duration?: number;
  readonly delay?: number;
};

export const Confetti = memo<ConfettiProps>(
  ({
    width,
    count,
    duration = 0.3,
    size = 10,
    colors = DEFAULT_COLORS,
    open = true,
    delay = 0,
  }) => {
    const randomParticles = Array.from(
      { length: count },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      () => particles[random(0, particles.length - 1)],
    );

    const positions = randomParticles.map((_, index) => generatePosition(width, index % 4));

    return (
      <AnimatePresence>
        {open && (
          <div
            className={styles.particles}
            style={{
              "--size": `${size}px`,
            }}
          >
            {randomParticles.map((Particle, index) => (
              <motion.div
                key={index}
                className={styles.particle}
                animate={{
                  ...positions[index],
                  rotateZ: random(0, 160),
                  opacity: 0,
                  transition: {
                    ...transition,
                    duration,
                    delay,
                    opacity: {
                      duration: duration + 0.3,
                      delay: delay + duration + 0.1,
                      ease: "easeOut",
                    },
                  },
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <Particle fill={colors[random(0, colors.length - 1)]} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    );
  },
);

Confetti.displayName = "Confetti";
