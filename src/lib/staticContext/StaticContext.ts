import { createContext } from 'react';
/**
 * Use a type-only import to avoid ESLint error `import/no-cycle`
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
 * @see https://github.com/benmosher/eslint-plugin-import/issues/1453
 */
import type { contextGetters } from './getStaticContext';

export type StaticContextValue = {
  [P in keyof typeof contextGetters]: Unpacked<ReturnType<typeof contextGetters[P]>>;
};

export const defaultStaticContextValue = {
  highlightedSolidarityStatements: [],
  highlightedTestimonials: [],
  navigation: { activeSlug: null, pagesMetadata: [] },
  recentPapers: [],
};

const StaticContext = createContext<StaticContextValue>(defaultStaticContextValue);

export default StaticContext;
