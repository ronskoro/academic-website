import type { Metadata } from "next";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { PageHeader } from "@/components/common/page-header";
import { JsonLd } from "@/components/common/json-ld";
import { PublicationList } from "@/components/publications/publication-list";
import { getAllPublications } from "@/lib/publications";
import { generateScholarlyArticleSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "A list of my research publications in machine learning, AI, and related fields.",
};

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <>
      {publications.map((pub) => (
        <JsonLd key={pub.id} data={generateScholarlyArticleSchema(pub)} />
      ))}
      <SectionWrapper>
        <PageHeader
          title="Publications"
          description={`${publications.length} papers in machine learning, AI, and related fields.`}
        />
        <PublicationList publications={publications} />
      </SectionWrapper>
    </>
  );
}
