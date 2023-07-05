"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

import styles from "./navbar.module.scss";

interface Route {
  readonly label: string;
  readonly path: string;
}

interface NavbarProps {
  readonly routes: Readonly<Route[]>;
}

export const Navbar = memo<NavbarProps>(({ routes }) => {
  const pathname = usePathname();

  if (!pathname) return null;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {routes.map((route) => (
          <li key={route.path} className={styles.link}>
            <Link href={route.path} className={styles.label}>
              {route.label}
            </Link>
            {pathname === route.path || (pathname.startsWith(route.path) && route.path !== "/") ? (
              <motion.div
                className={styles.active}
                layoutId="active"
                transition={{ type: "spring", stiffness: 270, damping: 30 }}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
});

Navbar.displayName = "Navbar";
