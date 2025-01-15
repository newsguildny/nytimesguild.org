"use client";

import { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import cx from "classnames";
import { crimsonPro, publicSans } from "src/app/fonts";
import styles from "./faq.module.css";

interface QuestionProps {
  question: string;
  children: ReactNode;
}

export function FAQItem({ question, children }: QuestionProps) {
  return (
    <AccordionItem className={styles["accordion-item"]}>
      <AccordionItemHeading
        className={cx(crimsonPro.className, styles["accordion-item-heading"])}
      >
        <AccordionItemButton className={styles["accordion-item-button"]}>
          <span className={styles.question}>{question}</span>
          <AccordionItemState>
            {({ expanded }) => (
              <span
                className={cx(publicSans.className, styles.icon, {
                  [styles.expanded]: expanded,
                  [styles.collapsed]: !expanded,
                })}
              />
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>{children}</AccordionItemPanel>
    </AccordionItem>
  );
}

interface FAQProps {
  children: ReactNode;
}

export function FAQ({ children }: FAQProps) {
  return (
    <div className={styles.wrapper}>
      <Accordion allowMultipleExpanded allowZeroExpanded>
        {children}
      </Accordion>
    </div>
  );
}
