import { GetStaticProps, GetStaticPaths } from 'next';
import { getPageTitles } from '../lib/pages';
import { withNav } from '../lib/withNav';

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  return withNav({ props: { slug: '404', title: 'Page Not Found' } });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pageTitles = getPageTitles();
  const paths = pageTitles.map((pageTitle) => ({
    params: { slug: pageTitle === 'index' ? [] : [pageTitle] },
  }));
  return {
    paths,
    fallback: false,
  };
};
