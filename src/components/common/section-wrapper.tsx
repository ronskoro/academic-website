import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  alternate?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  alternate = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 py-10 md:py-14",
        alternate && "bg-background-alt",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
