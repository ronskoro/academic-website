"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicationCard } from "./publication-card";
import { Publication } from "@/types/publication";
import { AnimatedSection } from "@/components/common/animated-section";

const TYPE_LABELS: Record<string, string> = {
  all: "All",
  conference: "Conference",
  journal: "Journal",
  preprint: "Preprint",
  workshop: "Workshop",
};

interface PublicationListProps {
  publications: Publication[];
}

export function PublicationList({ publications }: PublicationListProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    let result = publications;

    if (typeFilter !== "all") {
      result = result.filter((p) => p.type === typeFilter);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.authors.some((a) => a.toLowerCase().includes(query)) ||
          p.venue.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.abstract?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [publications, search, typeFilter]);

  const grouped = useMemo(() => {
    const groups: Record<number, Publication[]> = {};
    filtered.forEach((p) => {
      if (!groups[p.year]) groups[p.year] = [];
      groups[p.year].push(p);
    });
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, pubs]) => ({ year: Number(year), publications: pubs }));
  }, [filtered]);

  const types = useMemo(() => {
    const set = new Set(publications.map((p) => p.type));
    return ["all", ...Array.from(set)];
  }, [publications]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <label htmlFor="pub-search" className="sr-only">
            Search publications
          </label>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            id="pub-search"
            placeholder="Search publications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs value={typeFilter} onValueChange={setTypeFilter}>
          <TabsList>
            {types.map((type) => (
              <TabsTrigger key={type} value={type} className="text-xs">
                {TYPE_LABELS[type] || type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-foreground-muted">
        Showing {filtered.length} of {publications.length} publications
      </p>

      <div className="mt-8 space-y-10">
        {grouped.map(({ year, publications: pubs }) => (
          <div key={year}>
            <h2 className="mb-3 text-sm font-medium text-foreground-muted">
              {year}
            </h2>
            <div className="space-y-4">
              {pubs.map((pub, i) => (
                <AnimatedSection key={pub.id} delay={i * 0.05}>
                  <PublicationCard publication={pub} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-12 text-center text-foreground-muted">
            No publications found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
