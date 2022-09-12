import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import type { PageData } from '../lib/collections/pages';

interface Props {
  slug?: string;
  pagesMetadata?: PageData[];
  children: ReactNode;
}

export function PageLayout({ slug, pagesMetadata, children }: Props) {
  return (
    <>
      <Navigation slug={slug} pagesMetadata={pagesMetadata} />
      {children}
      <Footer />
    </>
  );
}
