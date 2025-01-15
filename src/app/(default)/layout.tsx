import { ReactNode } from "react";
import { Footer } from "src/components/Footer";
import { Navigation } from "src/components/Navigation";
import { getNavPagesMetadata } from "src/lib/collections/pages";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pagesMetadata = getNavPagesMetadata();

  return (
    <>
      {" "}
      <Navigation pagesMetadata={pagesMetadata} />
      {children}
      <Footer />
    </>
  );
}
