"use client";

import { useState } from "react";
import {
  FileText,
  Code,
  ExternalLink,
  Presentation,
  Video,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { Publication } from "@/types/publication";
import { cn } from "@/lib/utils";


const typeColors: Record<string, string> = {
  conference: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  journal: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  preprint: "bg-muted text-muted-foreground",
  workshop: "bg-success/10 text-success border-success/20",
  thesis: "bg-muted text-muted-foreground",
};

function ActionButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-medium text-foreground-muted transition-colors hover:border-accent-blue/30 hover:bg-accent-blue/5 hover:text-accent-blue"
    >
      <Icon className="size-3" />
      {label}
    </a>
  );
}

function CopyBibtexButton({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that block clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = bibtex;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-medium text-foreground-muted transition-colors hover:border-accent-blue/30 hover:bg-accent-blue/5 hover:text-accent-blue"
      >
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        {copied ? "Copied!" : "BibTeX"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "BibTeX citation copied to clipboard" : ""}
      </span>
    </>
  );
}

interface PublicationCardProps {
  publication: Publication;
}

function PublicationMeta({ type, year }: { type: string; year: string | number }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <Badge
        variant="outline"
        className={cn("text-[10px] sm:text-xs uppercase", typeColors[type] || typeColors.preprint)}
      >
        {type}
      </Badge>
      <span className="text-xs sm:text-sm text-foreground-muted">{year}</span>
    </div>
  );
}

function PublicationLinks({ publication }: { publication: Publication }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {publication.pdfUrl && (
        <ActionButton href={publication.pdfUrl} icon={FileText} label="PDF" />
      )}
      {publication.codeUrl && (
        <ActionButton href={publication.codeUrl} icon={Code} label="Code" />
      )}
      {publication.projectUrl && (
        <ActionButton
          href={publication.projectUrl}
          icon={ExternalLink}
          label="Project"
        />
      )}
      {publication.slidesUrl && (
        <ActionButton
          href={publication.slidesUrl}
          icon={Presentation}
          label="Slides"
        />
      )}
      {publication.videoUrl && (
        <ActionButton
          href={publication.videoUrl}
          icon={Video}
          label="Video"
        />
      )}
      <CopyBibtexButton bibtex={publication.bibtex} />
    </div>
  );
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const [abstractOpen, setAbstractOpen] = useState(false);

  const authors = publication.authors.map((author, i) => {
    const isSelf = i === publication.selfAuthorIndex;
    return (
      <span key={i}>
        {i > 0 && ", "}
        <span className={cn(isSelf && "font-semibold text-foreground")}>
          {author}
        </span>
      </span>
    );
  });

  return (
    <SpotlightCard>
      <PublicationMeta type={publication.type} year={publication.year} />

      <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight">
        {publication.title}
      </h3>

      <p className="mt-2 text-sm text-foreground-muted">{authors}</p>

      <p className="mt-1 text-sm italic text-foreground-muted">
        {publication.venueShort}
      </p>

      <PublicationLinks publication={publication} />

      {publication.abstract && (
        <Collapsible open={abstractOpen} onOpenChange={setAbstractOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 h-auto gap-1 px-0 py-1 text-xs text-foreground-muted hover:text-foreground"
            >
              <ChevronDown
                className={cn(
                  "size-3 transition-transform",
                  abstractOpen && "rotate-180"
                )}
              />
              {abstractOpen ? "Hide abstract" : "Show abstract"}
            </Button>
          </CollapsibleTrigger>
          <AnimatePresence>
            {abstractOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="mt-2 rounded-lg bg-muted/50 p-4 text-sm leading-relaxed text-foreground-muted">
                  {publication.abstract}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Collapsible>
      )}
    </SpotlightCard>
  );
}
