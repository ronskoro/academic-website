export interface Publication {
  id: string;
  title: string;
  authors: string[];
  selfAuthorIndex: number;
  venue: string;
  venueShort: string;
  year: number;
  month?: number;
  type: "conference" | "journal" | "preprint" | "workshop" | "thesis";
  abstract?: string;
  pdfUrl?: string;
  codeUrl?: string;
  projectUrl?: string;
  slidesUrl?: string;
  videoUrl?: string;
  bibtex: string;
  tags: string[];
  featured?: boolean;
  doi?: string;
  arxivId?: string;
}
