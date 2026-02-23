import Link from "next/link";
import { ExternalLink, Code, FileText, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TagChip } from "@/components/common/tag-chip";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  completed: "bg-muted text-muted-foreground",
  ongoing: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
};

const linkIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  demo: ExternalLink,
  code: Code,
  paper: FileText,
  dataset: Database,
};

interface ProjectCardProps {
  project: Project;
}

function ProjectStatus({ status, startDate, endDate }: { status: string; startDate: string; endDate?: string }) {
  return (
    <div className="flex items-center justify-between">
      <Badge
        variant="outline"
        className={cn("text-[10px] uppercase", statusStyles[status] || statusStyles.completed)}
      >
        {status}
      </Badge>
      <span className="text-xs text-foreground-muted">
        {startDate}
        {endDate ? ` — ${endDate}` : " — Present"}
      </span>
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <TagChip key={tag} label={tag} />
      ))}
    </div>
  );
}

function ProjectLinks({ links }: { links?: Record<string, string> }) {
  if (!links || Object.keys(links).length === 0) return null;
  return (
    <div className="mt-4 flex gap-2 border-t border-border pt-4">
      {Object.entries(links).map(([key, url]) => {
        if (!url) return null;
        const Icon = linkIcons[key] || ExternalLink;
        return (
          <Link
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-accent-blue"
          >
            <Icon className="size-3" />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        );
      })}
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <SpotlightCard className="flex h-full flex-col">
      <ProjectStatus status={project.status} startDate={project.startDate} endDate={project.endDate} />

      <h3 className="mt-3 text-base font-semibold tracking-tight">
        {project.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
        {project.description}
      </p>

      <ProjectTags tags={project.tags} />
      <ProjectLinks links={project.links} />
    </SpotlightCard>
  );
}
