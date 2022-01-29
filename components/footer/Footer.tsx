import styles from "./footer.module.scss";
import { Link } from "components/mdx/link/Link";
import Logo from "public/svg/logo.svg";
import NextLink from "next/link";
import { SOCIALS } from "utils/consts";
import dynamic from "next/dynamic";
import { useWindowSize } from "hooks/useWindowSize";

const Social = ({ social }: { social: typeof SOCIALS[number] }) => {
  const selectedSocial = SOCIALS.find(({ name }) => name === social.name) as typeof SOCIALS[number];
  const Icon = dynamic(() => import(`public/svg/${selectedSocial?.name}.svg`));
  const { width } = useWindowSize();

  return (
    <>
      {width! > 640 ? (
        <Link href={selectedSocial.link}>{selectedSocial?.name}</Link>
      ) : (
        <a href={selectedSocial.link} className={styles.social} style={{ color: selectedSocial?.color }}>
          <Icon />
        </a>
      )}
    </>
  );
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>Let&apos;s build something together</h4>
        <p className={styles.description}>
          Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect 📭
        </p>
        <Link href="mailto:bartosz@zagrodzki.me">bartosz@zagrodzki.me</Link>

        <div className={styles.links}>
          <NextLink href="/">
            <a className={styles.home}>
              <span className="sr-only">home</span>
              <Logo />
            </a>
          </NextLink>
          <div className={styles.socials}>
            {SOCIALS.map((social) => (
              <Social social={social} key={social.name} />
            ))}
          </div>
        </div>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} Bartosz Zagrodzki. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
