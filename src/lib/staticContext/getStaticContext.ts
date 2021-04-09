import { getHighlightedTestimonialsData } from '../collections/testimonials';
import { getHighlightedSolidarityStatementsData } from '../collections/solidarityStatements';
import { getNavigationData } from '../collections/pages';
import { getRecentPapersData } from '../collections/papers';
import { StaticContextValue } from './StaticContext';

export const contextGetters = {
  highlightedTestimonials: getHighlightedTestimonialsData,
  highlightedSolidarityStatements: getHighlightedSolidarityStatementsData,
  navigation: getNavigationData,
  recentPapers: getRecentPapersData,
};

export const getStaticContext = async (slug?: string): Promise<StaticContextValue> =>
  Object.fromEntries(
    await Promise.all(
      Object.entries(contextGetters).map(async ([key, getter]) => [key, await getter(slug)])
    )
  );
