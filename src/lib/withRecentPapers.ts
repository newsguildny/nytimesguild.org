import { GetStaticPropsResult } from 'next';
import { getRecentPapersData } from './papers';

/**
 * Used to augment the result of a `getStaticProps` function call to
 * include the metadata necessary to populate the RecentPapers component.
 *
 * e.g.
 *
 * ```js
 * export const getStaticProps: GetStaticProps<Props, { slug: string } = async ({ params }) => {
 *   ...
 *   return withRecentPapers({
 *     props: { ... }
 *   })
 * }
 */
export async function withRecentPapers<Props>(propsResult: GetStaticPropsResult<Props>) {
  const recentPapers = await getRecentPapersData();
  return {
    ...propsResult,
    props: {
      ...propsResult.props,
      recentPapers,
    },
  };
}
