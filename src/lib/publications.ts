import publicationsData from "@/content/publications.json";
import { Publication } from "@/types/publication";

const publications = publicationsData as Publication[];

export function getAllPublications(): Publication[] {
  return [...publications].sort((a, b) => b.year - a.year);
}

export function getFeaturedPublications(): Publication[] {
  return getAllPublications().filter((p) => p.featured);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  publications.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAllYears(): number[] {
  const years = new Set<number>();
  publications.forEach((p) => years.add(p.year));
  return Array.from(years).sort((a, b) => b - a);
}

export function getPublicationTypes(): string[] {
  const types = new Set<string>();
  publications.forEach((p) => types.add(p.type));
  return Array.from(types);
}
