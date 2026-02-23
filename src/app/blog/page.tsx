import type { Metadata } from "next";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { PageHeader } from "@/components/common/page-header";
import { AnimatedSection } from "@/components/common/animated-section";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on machine learning, AI, and research.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <SectionWrapper>
      <PageHeader
        title="Blog"
        description="Thoughts on machine learning, AI, and research."
      />
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.075}>
              <PostCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-foreground-muted">
            Blog posts coming soon. Stay tuned!
          </p>
        </div>
      )}
    </SectionWrapper>
  );
}
