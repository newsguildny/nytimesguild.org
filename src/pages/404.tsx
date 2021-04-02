import { GetStaticProps } from 'next';
import { getStaticContext } from '../lib/staticContext/getStaticContext';

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  const staticContext = await getStaticContext('404');
  return { props: { staticContext } };
};
