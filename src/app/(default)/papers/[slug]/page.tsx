import { Metadata } from "next";
import { components } from "src/components/customEditorComponents";
import { RecentPapers } from "src/components/customEditorComponents/RecentPapers";
import { getPaperData, getPapersFilenames } from "src/lib/collections/papers";
import { MDX } from "src/components/MDX";
import styles from "./page.module.css";

interface Props {
  params: { slug: string };
}

export default function ShopPaper({ params }: Props) {
  const paper = getPaperData(params.slug);

  return (
    <main>
      <h1 className={styles.h1}>{paper.headline}</h1>
      <MDX
        source={paper.content}
        components={{
          ...components,
          // eslint-disable-next-line jsx-a11y/alt-text
          img: (props) => <img {...props} className={styles.img} />,
        }}
      />
      <RecentPapers />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paper = getPaperData(params.slug);

  return {
    title: `${paper.headline} - The New York Times Guild`,
    openGraph: {
      title: paper.headline,
      type: "article",
      description: paper.snippet,
    },
  };
}

export function generateStaticParams() {
  const filenames = getPapersFilenames();

  return filenames.map((filename) => ({ slug: filename }));
}
