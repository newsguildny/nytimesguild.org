import { GetStaticProps } from "next";
import { PageLayout } from "../components/PageLayout";
import { getNavPagesMetadata, PageData } from "../lib/collections/pages";

interface Props {
  pagesMetadata: PageData[];
}

export default function Custom404({ pagesMetadata }: Props) {
  return (
    <PageLayout pagesMetadata={pagesMetadata}>
      <h1>404 - Page Not Found</h1>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pagesMetadata = getNavPagesMetadata();
  return { props: { pagesMetadata } };
};
