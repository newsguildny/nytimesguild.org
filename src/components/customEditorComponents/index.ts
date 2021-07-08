import { CallToAction, options as callToActionOptions } from './CallToAction';
import { YouTube, options as youTubeOptions } from './YouTube';
import {
  HighlightedTestimonials,
  options as highlightedTestimonialsOptions,
} from './HighlightedTestimonials';
import {
  HighlightedSolidarityStatements,
  options as highlightedSolidarityStatementsOptions,
} from './HighlightedSolidarityStatements';
import { RecentPapers, options as recentPapersOptions } from './RecentPapers';
import { FAQ, FAQItem, options as faqOptions } from './FAQ';
import { FullBleedImage, options as fullBleedImageOptions } from './FullBleedImage';
import { PDFEmbed, options as pdfEmbedOptions } from './PDFEmbed';
import { CenteredText } from './CenteredText';

export const components = {
  CallToAction,
  CenteredText,
  FAQ,
  FAQItem,
  FullBleedImage,
  HighlightedTestimonials,
  HighlightedSolidarityStatements,
  PDFEmbed,
  RecentPapers,
  YouTube,
};

export const options = [
  callToActionOptions,
  youTubeOptions,
  highlightedTestimonialsOptions,
  highlightedSolidarityStatementsOptions,
  recentPapersOptions,
  faqOptions,
  fullBleedImageOptions,
  pdfEmbedOptions,
];
