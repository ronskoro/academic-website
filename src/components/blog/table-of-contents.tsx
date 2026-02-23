"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const items: TOCItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.charAt(1)),
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Opt out of next routing hash change jumping by using history.pushState
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <h4 className="mb-4 font-semibold text-foreground">On this page</h4>
      <ul className="space-y-1 relative border-l border-border/50">
        {headings.map((heading) => (
          <li key={heading.id} className="relative">
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              className={cn(
                "group flex w-full items-center py-1.5 pr-3 transition-colors hover:text-foreground",
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : "text-foreground-muted"
              )}
            >
              {activeId === heading.id && (
                <motion.div
                  layoutId="toc-indicator"
                  className="absolute left-[0px] w-[2px] -ml-[1px] top-1.5 bottom-1.5 bg-accent-blue rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
