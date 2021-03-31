import { getHighlightedTestimonialsData } from '../lib/testimonials';
import { getPagesMetadata } from '../lib/pages';
import { getRecentPapersData } from '../lib/papers';
import { staticContextKey as highlightedTestimonialsKey } from '../components/customEditorComponents/HighlightedTestimonials';
import { staticContextKey as navigationKey } from '../components/Navigation';
import { staticContextKey as recentPapersKey } from '../components/customEditorComponents/RecentPapers';

export const highlightedTestimonials = {
  staticContextKey: highlightedTestimonialsKey,
  getStaticContext: getHighlightedTestimonialsData,
};

export const navigation = {
  staticContextKey: navigationKey,
  getStaticContext: async (props: Record<string, unknown>) => ({
    activeSlug: props.slug ?? null,
    pagesMetadata: getPagesMetadata().filter(({ slug }) => slug !== 'index'),
  }),
};

export const recentPapers = {
  staticContextKey: recentPapersKey,
  getStaticContext: getRecentPapersData,
};
