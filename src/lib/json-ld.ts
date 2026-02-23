import siteConfig from "@/content/site-config.json";
import { Publication } from "@/types/publication";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    affiliation: {
      "@type": "Organization",
      name: siteConfig.affiliation,
    },
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    image: `${siteConfig.siteUrl}${siteConfig.profileImage}`,
    sameAs: [
      siteConfig.social.googleScholar,
      siteConfig.social.github,
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.orcid,
    ].filter(Boolean),
  };
}

export function generateScholarlyArticleSchema(pub: Publication) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: pub.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    datePublished: pub.year.toString(),
    publisher: pub.venue,
    url: pub.pdfUrl || undefined,
    abstract: pub.abstract || undefined,
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} — ${siteConfig.title}`,
    url: siteConfig.siteUrl,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}
