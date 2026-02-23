export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLinks {
  googleScholar?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  orcid?: string;
  semanticScholar?: string;
}

export interface SiteConfig {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  affiliation: string;
  department: string;
  lab: string;
  labUrl: string;
  tagline: string;
  email: string;
  siteUrl: string;
  profileImage: string;
  officeAddress: string;
  officeHours: string;
  social: SocialLinks;
  nav: NavItem[];
}
