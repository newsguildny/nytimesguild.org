"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import cx from "classnames";
import { crimsonPro, publicSans } from "src/app/fonts";
import { TGuild } from "./svgs/TGuild";
import { Burger } from "./Burger";
import type { PageData } from "../lib/collections/pages";
import styles from "./navigation.module.css";

interface Props {
  slug?: string;
  pagesMetadata?: PageData[];
}

export function Navigation({ slug, pagesMetadata }: Props) {
  const [isNavShown, setIsNavShown] = useState(false);

  useEffect(() => {
    const escapeKeyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavShown(false);
      }
    };
    document.addEventListener("keydown", escapeKeyListener);
    return () => document.removeEventListener("keydown", escapeKeyListener);
  }, []);

  useEffect(() => {
    setIsNavShown(false);
  }, [slug]);

  return (
    <nav
      className={cx(crimsonPro.className, styles.nav, {
        [styles.shown]: isNavShown,
      })}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as HTMLElement)) {
          setIsNavShown(false);
        }
      }}
    >
      <Link className={styles.link} href="/" aria-label="Home">
        <TGuild />
      </Link>
      <Burger
        className={styles.button}
        active={isNavShown}
        onClick={() => setIsNavShown((oldValue) => !oldValue)}
      />
      <ul className={cx(publicSans.className, styles.ul)}>
        {pagesMetadata?.map((pageMetadata) => (
          <li className={styles.li} key={pageMetadata.slug}>
            <Link
              href={`/${pageMetadata.slug}/`}
              className={cx(styles.link, {
                [styles.active]: slug === pageMetadata.slug,
              })}
            >
              {pageMetadata.title}
            </Link>
          </li>
        ))}
        {/* Only show on the `/tech/` and `/tech-vote-count/` pages */}
        {(slug === "tech" || slug === "tech-vote-count") && (
          <li className={styles.li}>
            <Link
              href="/tech-vote-count/"
              className={cx(styles.link, {
                [styles.active]: slug === "tech-vote-count",
              })}
            >
              Vote Count
            </Link>
          </li>
        )}
        <li className={styles.li}>
          <Link
            href="/tech-sav/"
            className={cx(styles.link, {
              [styles.active]: slug === "tech-sav",
            })}
          >
            Tech SAV
          </Link>
        </li>
      </ul>
    </nav>
  );
}
