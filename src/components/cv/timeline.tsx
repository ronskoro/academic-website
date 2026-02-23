"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSection } from "@/components/common/animated-section";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { CVSection, CVEntry } from "@/types/cv";
import { cn } from "@/lib/utils";

function TimelineNode() {
  return <div className="absolute left-[1px] top-8 z-10 size-[9px] rounded-full border-2 border-border bg-background transition-colors duration-300 group-hover:border-foreground/40" />;
}

function TimelineLine() {
  return <div className="absolute bottom-0 left-[5px] top-8 w-px bg-border group-last:bg-transparent" />;
}

function TimelineHeader({ entry }: { entry: CVEntry }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h4 className="text-sm font-semibold">{entry.title}</h4>
      <span className="text-xs text-foreground-muted">
        {entry.startDate}
        {entry.endDate ? ` — ${entry.endDate}` : ""}
      </span>
    </div>
  );
}

function TimelineDetailsButton({ expanded }: { expanded: boolean }) {
  return (
    <div className="mt-1 flex items-center gap-1 text-xs text-foreground-muted">
      <ChevronDown
        className={cn(
          "size-3 transition-transform",
          expanded && "rotate-180"
        )}
      />
      {expanded ? "Less" : "More details"}
    </div>
  );
}

function TimelineDetailsList({ details }: { details: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-foreground-muted pl-1">
      {details.map((detail, i) => (
        <li key={i} className="flex gap-2.5 items-start">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-blue/50" />
          <span className="leading-relaxed">{detail}</span>
        </li>
      ))}
    </ul>
  );
}

function TimelineContainer({ children }: { children: React.ReactNode }) {
  return <div className="group relative pl-8 pb-4">{children}</div>;
}

function TimelineEntry({ entry }: { entry: CVEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = entry.details && entry.details.length > 0;

  const toggle = () => {
    if (hasDetails) setExpanded(!expanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasDetails && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <TimelineContainer>
      <TimelineNode />
      <TimelineLine />

      <SpotlightCard
        role={hasDetails ? "button" : undefined}
        tabIndex={hasDetails ? 0 : undefined}
        aria-expanded={hasDetails ? expanded : undefined}
        className={cn(
          "w-full text-left transition-all duration-300",
          hasDetails ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-ring" : "cursor-default hover:-translate-y-0"
        )}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <TimelineHeader entry={entry} />
        <p className="mt-0.5 text-sm text-foreground-muted">
          {entry.organization}
          {entry.location ? `, ${entry.location}` : ""}
        </p>
        {entry.description && (
          <p className="mt-1 text-sm text-foreground-muted">
            {entry.description}
          </p>
        )}
        {hasDetails && <TimelineDetailsButton expanded={expanded} />}
        {expanded && entry.details && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <TimelineDetailsList details={entry.details} />
            </motion.div>
          </AnimatePresence>
        )}
      </SpotlightCard>
    </TimelineContainer>
  );
}

interface TimelineSectionProps {
  section: CVSection;
  delay?: number;
}

function TimelineList({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

export function TimelineSection({ section, delay = 0 }: TimelineSectionProps) {
  return (
    <AnimatedSection delay={delay}>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">{section.title}</h2>
      <TimelineList>
        {section.entries.map((entry, i) => (
          <TimelineEntry key={i} entry={entry} />
        ))}
      </TimelineList>
    </AnimatedSection>
  );
}
