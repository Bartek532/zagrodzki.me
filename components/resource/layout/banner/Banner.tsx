"use client";

import { motion } from "framer-motion";
import { memo } from "react";

import styles from "./banner.module.scss";

interface BannerProps {
  readonly text: string;
}

export const Banner = memo<BannerProps>(({ text }) => (
  <motion.div className={styles.banner} animate={{ y: [-70, 0], opacity: [0.5, 1] }}>
    <span>{text}</span>
  </motion.div>
));

Banner.displayName = "Banner";
