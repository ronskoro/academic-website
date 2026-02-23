import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  const sizes: Record<number, string> = {
    1: "text-3xl font-bold mt-10 mb-4",
    2: "text-2xl font-semibold mt-8 mb-3",
    3: "text-xl font-semibold mt-6 mb-2",
    4: "text-lg font-medium mt-4 mb-2",
    5: "text-base font-medium mt-3 mb-1",
    6: "text-sm font-medium mt-3 mb-1",
  };

  return function Heading({ children, ...props }: React.ComponentPropsWithoutRef<typeof Tag>) {
    return (
      <Tag className={cn(sizes[level], "tracking-tight")} {...props}>
        {children}
      </Tag>
    );
  };
}

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: "border-accent-blue/30 bg-accent-blue/5",
    warning: "border-destructive/30 bg-destructive/5",
    tip: "border-success/30 bg-success/5",
  };

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4 text-sm",
        styles[type]
      )}
    >
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children }) => (
    <p className="my-4 font-serif text-base leading-relaxed text-foreground-muted">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-foreground-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="font-serif text-base leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-accent-blue/30 pl-4 italic text-foreground-muted">
      {children}
    </blockquote>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-blue underline decoration-accent-blue/30 underline-offset-2 hover:decoration-accent-blue"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="font-medium text-accent-blue underline decoration-accent-blue/30 underline-offset-2 hover:decoration-accent-blue"
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: ({ children, className, ...props }) => {
    // Inline code (no className means no language specified by rehype-pretty-code)
    if (!className) {
      return (
        <code
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code blocks are handled by rehype-pretty-code
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => (
    <CodeBlock {...props}>{children}</CodeBlock>
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-4 py-2 text-foreground-muted">
      {children}
    </td>
  ),
  Callout,
};
