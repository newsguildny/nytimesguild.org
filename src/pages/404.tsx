import { GetStaticProps } from 'next';
import withStaticContext from '../staticContext/withStaticContext';

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

export const getStaticProps: GetStaticProps = async () => {
  return withStaticContext({ props: {} });
};
