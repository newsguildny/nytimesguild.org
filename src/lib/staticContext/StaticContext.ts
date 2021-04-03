import { createContext } from 'react';
import type { contextGetters } from './getStaticContext';

export type StaticContextValue = {
  [P in keyof typeof contextGetters]: Unpacked<ReturnType<typeof contextGetters[P]>>;
};

export const defaultStaticContextValue = {
  highlightedTestimonials: [],
  navigation: { activeSlug: null, pagesMetadata: [] },
  recentPapers: [],
};

const StaticContext = createContext<StaticContextValue>(defaultStaticContextValue);

export default StaticContext;
