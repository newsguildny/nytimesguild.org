import { GetStaticProps } from "next";
import Head from "next/head";
import { PageHeader } from "../components/PageHeader";
import { getNavPagesMetadata, PageData } from "../lib/collections/pages";
import { PageLayout } from "../components/PageLayout";

interface Props {
  pagesMetadata: PageData[];
}

const RepoBadge = ({ pagesMetadata }: Props) => {
  return (
    <>
      <Head>
        <title>Solidarity Statements - The New York Times Guild</title>
        <meta name="og:title" content="Solidarity Statements" />
        <meta name="og:type" content="website" />
      </Head>
      <PageLayout pagesMetadata={pagesMetadata}>
        <PageHeader heading="Repo Readme Badges" />
        <main>
          <h2>Regular</h2>
          <a href="https://nytimesguild.org/tech/fund">
            <img alt="Support NYT Guild Tech" src="/badge-nyt-guild-tech.png" />
          </a>
          <pre>
            [![Support
            @NYTGuildTech](https://nytimesguild.com/badge-nyt-guild-tech.png)](https://nytimesguild.org/tech/fund)
          </pre>

          <h2>Large</h2>
          <a href="https://nytimesguild.org/tech/fund">
            <img
              alt="Support NYT Guild Tech"
              src="/badge-nyt-guild-tech-large.png"
            />
          </a>
          <pre>
            [![Support
            @NYTGuildTech](https://nytimesguild.com/badge-nyt-guild-tech-large.png)](https://nytimesguild.org/tech/fund)
          </pre>
        </main>
      </PageLayout>
      <style jsx>{`
        main {
          padding-top: 2rem;
        }

        pre {
          text-wrap: wrap;
          padding: 1rem;
          background: #efefef;
        }

        @media (min-width: 769px) {
          main {
            padding-top: 5rem;
          }
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pagesMetadata = getNavPagesMetadata();
  return {
    props: {
      slug: "repo-badge",
      pagesMetadata,
    },
  };
};

export default RepoBadge;
