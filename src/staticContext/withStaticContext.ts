import { GetStaticPropsResult } from 'next';
import * as contextGetters from './contextGetters';

/**
 * Used to augment the result of a `getStaticProps` function call to
 * include the metadata necessary to populate components that need additional
 * context.
 *
 * e.g.
 *
 * ```js
 * export const getStaticProps: GetStaticProps<Props, { slug: string } = async ({ params }) => {
 *   ...
 *   return withStaticContext({
 *     props: { ... }
 *   })
 * }
 */
export default async function withStaticContext<Props extends Record<string, unknown>>(
  propsResult: GetStaticPropsResult<Props>
) {
  const staticContext = (
    await Promise.all(
      Object.values(contextGetters).map(({ staticContextKey, getStaticContext }) =>
        Promise.resolve(getStaticContext(propsResult.props) as unknown).then((context) => ({
          staticContextKey,
          context,
        }))
      )
    )
  ).reduce((acc, { staticContextKey, context }) => ({ ...acc, [staticContextKey]: context }), {});
  return {
    ...propsResult,
    props: {
      ...propsResult.props,
      staticContext,
    },
  };
}
