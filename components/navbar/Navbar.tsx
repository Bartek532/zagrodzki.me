import { memo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

import type { Route } from "types";

import styles from "./navbar.module.scss";

type NavbarProps = {
  readonly routes: Route[];
};

export const Navbar = memo<NavbarProps>(({ routes }) => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {routes.map((route) => (
          <li key={route.path} className={styles.link}>
            <Link href={route.path}>
              <a className={styles.label}>{route.label}</a>
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
