import { Metadata } from "next";
import { components } from "src/components/customEditorComponents";
import { MDX } from "src/components/MDX";
import { notFound } from "next/navigation";
import { HomeHeader } from "../../../components/HomeHeader";
import { PageHeader } from "../../../components/PageHeader";
import { getPageData, getPageSlugs } from "../../../lib/collections/pages";

const siteTitle = "The New York Times Guild";

interface Props {
  params: { slug: string[] | undefined };
}

export default async function Page({ params }: Props) {
  const slug = params.slug?.[0] ?? "index";
  const isHome = slug === "index";
  const isContractCampaign = slug === "tech-contract-campaign";

  let collectionItem: ReturnType<typeof getPageData>;
  try {
    collectionItem = getPageData(slug);
  } catch {
    return notFound();
  }
  console.log("loading what page?", slug);
  return (
    <>
      {isHome ? (
        <HomeHeader />
      ) : (
        <PageHeader
          heading={collectionItem.heading}
          subheading={collectionItem.subheading}
        />
      )}
      <main className={isContractCampaign ? "contract-campaign" : ""}>
        <MDX source={collectionItem.content} components={components} />
      </main>
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug?.[0] ?? "index";
  const isHome = slug === "index";

  let collectionItem: ReturnType<typeof getPageData>;
  try {
    collectionItem = getPageData(slug);
  } catch {
    return notFound();
  }

  return {
    title: isHome ? siteTitle : `${collectionItem.title} - ${siteTitle}`,
    openGraph: {
      title: collectionItem.title,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return getPageSlugs().map((slug) => ({
    slug: slug === "index" ? [] : [slug],
  }));
}
