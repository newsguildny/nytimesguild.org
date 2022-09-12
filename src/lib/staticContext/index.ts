import { StaticContextKey } from './StaticContext';
import { staticContextKey as highlightedTestimonialsKey } from '../../components/customEditorComponents/HighlightedTestimonials';
import { staticContextKey as highlightedSolidarityStatementsKey } from '../../components/customEditorComponents/HighlightedSolidarityStatements';
import { staticContextKey as recentPapersKey } from '../../components/customEditorComponents/RecentPapers';
import { render } from '../collections/render';
import { getTestimonialsMetadata, getTestimonialData } from '../collections/testimonials';
import {
  getSolidarityStatementsMetadata,
  getSolidarityStatementData,
} from '../collections/solidarityStatements';
import { getRecentPapersFilenames, getPaperMetadata } from '../collections/papers';

const staticContextRegistry: Record<string, () => unknown> = {};

async function registerContextValue<ContextType>(
  key: StaticContextKey<ContextType>,
  getter: (() => ContextType) | (() => Promise<ContextType>)
) {
  staticContextRegistry[key.key] = getter;
}

registerContextValue(highlightedTestimonialsKey, () => {
  const allTestimonialsMetadata = getTestimonialsMetadata();
  const highlightedTestimonialsMetadata = allTestimonialsMetadata.filter(
    (testimonial) => testimonial.highlight
  );
  return Promise.all(
    highlightedTestimonialsMetadata.map(({ filename }) => render(getTestimonialData(filename)))
  );
});

registerContextValue(highlightedSolidarityStatementsKey, () => {
  const allSolidarityStatementsMetadata = getSolidarityStatementsMetadata();
  const highlightedSolidarityStatementsMetadata = allSolidarityStatementsMetadata.filter(
    (solidarityStatement) => solidarityStatement.highlight
  );
  return Promise.all(
    highlightedSolidarityStatementsMetadata.map(({ filename }) =>
      render(getSolidarityStatementData(filename))
    )
  );
});

registerContextValue(recentPapersKey, () =>
  getRecentPapersFilenames().map((filename) => getPaperMetadata(filename))
);

const staticContextValueRegistry: Record<string, unknown> = {};

async function getStaticContextValueRegistry() {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, getter] of Object.entries(staticContextRegistry)) {
    if (!(key in staticContextValueRegistry)) {
      // eslint-disable-next-line no-await-in-loop
      const contextValue = await getter();
      staticContextValueRegistry[key] = contextValue;
    }
  }
  return staticContextValueRegistry;
}

export async function createContextValue(keys: StaticContextKey<unknown>[]) {
  const contextValues = await getStaticContextValueRegistry();
  return Object.fromEntries(
    Array.from(Object.entries(contextValues)).filter(([key]) => keys.some((k) => k.key === key))
  );
}

export function getStaticContextKeys(content: string) {
  return Object.keys(staticContextRegistry)
    .filter((key) => content.includes(`<${key}`))
    .map((key) => new StaticContextKey<unknown>(key));
}
