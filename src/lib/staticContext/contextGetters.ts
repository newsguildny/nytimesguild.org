import { getHighlightedTestimonialsData } from '../collections/testimonials';
import { getPagesMetadata } from '../collections/pages';
import { getRecentPapersData } from '../collections/papers';
import { staticContextKey as highlightedTestimonialsKey } from '../../components/customEditorComponents/HighlightedTestimonials';
import { staticContextKey as navigationKey } from '../../components/Navigation';
import { staticContextKey as recentPapersKey } from '../../components/customEditorComponents/RecentPapers';

export const highlightedTestimonials = {
  staticContextKey: highlightedTestimonialsKey,
  getStaticContext: getHighlightedTestimonialsData,
};

export const navigation = {
  staticContextKey: navigationKey,
  getStaticContext: async (slug?: string) => ({
    activeSlug: slug ?? null,
    pagesMetadata: getPagesMetadata().filter(({ slug: pageSlug }) => pageSlug !== 'index'),
  }),
};

export const recentPapers = {
  staticContextKey: recentPapersKey,
  getStaticContext: getRecentPapersData,
};

const contextGetters = {
  highlightedTestimonials,
  navigation,
  recentPapers,
};

export async function getStaticContext(slug?: string) {
  return (
    await Promise.all(
      Object.values(contextGetters).map(({ staticContextKey, getStaticContext: getter }) =>
        Promise.resolve(getter(slug) as unknown).then((context) => ({
          staticContextKey,
          context,
        }))
      )
    )
  ).reduce((acc, { staticContextKey, context }) => ({ ...acc, [staticContextKey]: context }), {});
}
