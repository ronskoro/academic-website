export interface BlogPostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: string;
}
