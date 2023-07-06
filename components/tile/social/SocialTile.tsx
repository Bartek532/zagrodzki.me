"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { memo } from "react";

import Arrow from "public/svg/right-top-arrow.svg";
import { SOCIALS } from "utils/consts";

import styles from "./socialTile.module.scss";

interface SocialTileProps {
  readonly social: typeof SOCIALS[number]["name"];
}

const iconVariants = {
  hover: { scale: 1.05 },
};

export const SocialTile = memo<SocialTileProps>(({ social }) => {
  const selectedSocial = SOCIALS.find(({ name }) => name === social);

  if (!selectedSocial) return null;

  const Icon = dynamic(() => import(`public/svg/${selectedSocial.name}.svg`));

  return (
    <motion.a
      href={selectedSocial.link}
      className={styles.tile}
      style={{ backgroundColor: selectedSocial.color }}
      target="_blank"
      rel="noreferrer"
      whileHover="hover"
    >
      <span className="sr-only">visit my {social} account</span>
      <motion.div
        className={styles.icon}
        variants={iconVariants}
        initial={{ x: "-50%", y: "-50%" }}
      >
        <Icon />
      </motion.div>
      <div className={styles.arrow}>
        <Arrow />
      </div>
    </motion.a>
  );
});

SocialTile.displayName = "SocialTile";
