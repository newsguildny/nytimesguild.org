import Head from 'next/head';

const TheTableIssue = () => (
  <>
    <Head>
      <title>The Table ISSUE</title>
      <meta name="og:title" content="The Table Issue" />
      <meta name="og:type" content="website" />
    </Head>
    <main>A test page for the issue itself</main>
    <style jsx>{`
      main {
        padding-top: 2rem;
      }

      @media (min-width: 769px) {
        main {
          padding-top: 5rem;
        }
      }
    `}</style>
  </>
);

export default TheTableIssue;

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const theTableIssues = await getIssueData(params.slug, staticContext);
//   return {
//     props: {
//       issues: theTableIssues,
//       slug: 'the-table',
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const filenames = getTheTableFilenames();
//   const paths = filenames.map((filename) => ({
//     params: { slug: filename },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
