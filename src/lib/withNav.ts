import { GetStaticPropsResult } from 'next';
import { getPageTitles } from './pages';

export function withNav<Props>(propsResult: GetStaticPropsResult<Props>) {
  const pageTitles = getPageTitles();
  return {
    ...propsResult,
    props: {
      ...propsResult.props,
      pageTitles,
    },
  };
}
