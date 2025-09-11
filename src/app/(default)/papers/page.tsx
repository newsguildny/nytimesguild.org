import { Metadata } from "next";
import { PageHeader } from "src/components/PageHeader";
import { ShopPaperSnippet } from "src/components/ShopPaperSnippet";
import { getPapersData } from "src/lib/collections/papers";

export default function ShopPapers() {
  const papers = getPapersData();
  return (
    <>
      <PageHeader heading="Guild Updates" />
      <main>
        {papers.map((paper) => (
          <ShopPaperSnippet key={paper.slug} paper={paper} />
        ))}
      </main>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Shop Papers - The New York Times Guild",
    openGraph: {
      title: "Shop Papers",
      type: "website",
    },
  };
}
