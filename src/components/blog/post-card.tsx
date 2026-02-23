import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { TagChip } from "@/components/common/tag-chip";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { BlogPost } from "@/types/blog";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <SpotlightCard>
        <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3" />
            <time dateTime={post.frontmatter.date}>{date}</time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {post.readingTime}
          </span>
        </div>

        <h2 className="mt-3 text-base font-semibold tracking-tight">
          {post.frontmatter.title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          {post.frontmatter.excerpt}
        </p>

        {post.frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.frontmatter.tags.map((tag) => (
              <TagChip key={tag} label={tag} />
            ))}
          </div>
        )}
      </SpotlightCard>
    </Link>
  );
}
