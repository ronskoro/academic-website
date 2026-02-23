import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { TagChip } from "@/components/common/tag-chip";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { mdxComponents } from "@/components/blog/mdx-components";
import { JsonLd } from "@/components/common/json-ld";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import siteConfig from "@/content/site-config.json";
import "katex/dist/katex.min.css";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Use a sync approach for static generation
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    description: post.frontmatter.excerpt,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SectionWrapper>
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to blog
          </Link>
        </div>

        <div className="relative mt-8 lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          <article className="mx-auto max-w-prose">
            <header>
              <h1 className="text-3xl font-bold tracking-tight">
                {post.frontmatter.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  <time dateTime={post.frontmatter.date}>{date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>
              </div>
              {post.frontmatter.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.frontmatter.tags.map((tag) => (
                    <TagChip key={tag} label={tag} />
                  ))}
                </div>
              )}
              <hr className="mt-8 border-border" />
            </header>

            <div className="mt-8">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath, remarkGfm],
                    rehypePlugins: [rehypeSlug, rehypeKatex],
                  },
                }}
              />
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </SectionWrapper>
    </>
  );
}
