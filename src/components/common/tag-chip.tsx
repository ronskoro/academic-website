import { cn } from "@/lib/utils";

interface TagChipProps {
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function TagChip({ label, className, onClick, active }: TagChipProps) {
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200 active:scale-95",
        active
          ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
          : "border-border bg-muted text-foreground-muted hover:bg-accent-blue/5 hover:text-foreground",
        onClick && "cursor-pointer",
        className
      )}
    >
      {label}
    </Tag>
  );
}
