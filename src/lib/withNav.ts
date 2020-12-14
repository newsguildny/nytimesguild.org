import { GetStaticPropsResult } from 'next';
import { getPagesMetadata } from './pages';

/**
 * Used to augment the result of a `getStaticProps` function call to
 * include the metadata necessary to populate the Navigation component.
 *
 * e.g.
 *
 * ```js
 * export const getStaticProps: GetStaticProps<Props, { slug: string } = async ({ params }) => {
 *   ...
 *   return withNav({
 *     props: { ... }
 *   })
 * }
 */
export function withNav<Props>(propsResult: GetStaticPropsResult<Props>) {
  const pagesMetadata = getPagesMetadata().filter(({ slug }) => !!slug);
  return {
    ...propsResult,
    props: {
      ...propsResult.props,
      pagesMetadata,
    },
  };
}
