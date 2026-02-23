import { AnimatedSection } from "./animated-section";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <AnimatedSection className="pb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-2 max-w-2xl text-foreground-muted">
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
