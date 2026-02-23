export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  status: "active" | "completed" | "ongoing";
  startDate: string;
  endDate?: string;
  relatedPublications?: string[];
  links?: {
    demo?: string;
    code?: string;
    paper?: string;
    dataset?: string;
  };
  team?: { name: string; url?: string }[];
}
