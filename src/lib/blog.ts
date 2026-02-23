import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const slugs = fs.readdirSync(BLOG_DIR).filter((entry) => {
    const fullPath = path.join(BLOG_DIR, entry);
    return fs.statSync(fullPath).isDirectory();
  });

  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null && !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 160).replace(/[#*_\n]/g, "").trim(),
      draft: data.draft || false,
    },
    content,
    readingTime: stats.text,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
