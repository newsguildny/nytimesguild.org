"use client";

import { useEffect, useState } from "react";
import styles from "./techguildjobs.module.css";

const jobsListUrl = "/tech-guild-jobs/jobs.html";

export function TechGuildJobs() {
  const [jobsListHtml, setJobsListHtml] = useState("");

  useEffect(() => {
    fetch(jobsListUrl)
      .then((response) => (response.ok ? response.text() : Promise.reject()))
      .then((html) =>
        setJobsListHtml(
          new DOMParser().parseFromString(html, "text/html").body.innerHTML,
        ),
      )
      .catch(() => setJobsListHtml(""));
  }, []);

  if (!jobsListHtml) {
    return null;
  }

  return (
    <div
      className={styles.jobs}
      dangerouslySetInnerHTML={{ __html: jobsListHtml }}
    />
  );
}
