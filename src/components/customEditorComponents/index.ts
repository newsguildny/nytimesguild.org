import { CallToAction, options as callToActionOptions } from './CallToAction';
import { YouTube, options as youTubeOptions } from './YouTube';
import {
  HighlightedTestimonials,
  options as highlightedTestimonialsOptions,
} from './HighlightedTestimonials';
import { RecentPapers, options as recentPapersOptions } from './RecentPapers';
import { FAQ, options as faqOptions } from './FAQ';
import { FullBleedImage, options as fullBleedImageOptions } from './FullBleedImage';

export const components = {
  CallToAction,
  FAQ,
  FullBleedImage,
  HighlightedTestimonials,
  RecentPapers,
  YouTube,
};

export const options = [
  callToActionOptions,
  youTubeOptions,
  highlightedTestimonialsOptions,
  recentPapersOptions,
  faqOptions,
  fullBleedImageOptions,
];
