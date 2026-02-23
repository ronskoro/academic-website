import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { AnimatedSection } from "@/components/common/animated-section";
import { TimelineSection } from "@/components/cv/timeline";
import { Badge } from "@/components/ui/badge";
import cvData from "@/content/cv.json";
import teachingData from "@/content/teaching.json";
import { CVData } from "@/types/cv";

const cv = cvData as CVData;

export const metadata: Metadata = {
  title: "CV",
  description: "My academic curriculum vitae.",
};

export default function CVPage() {
  const coursesByYear = teachingData.courses.reduce(
    (acc, course) => {
      if (!acc[course.year]) acc[course.year] = [];
      acc[course.year].push(course);
      return acc;
    },
    {} as Record<number, typeof teachingData.courses>
  );

  const years = Object.keys(coursesByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <SectionWrapper>
      <AnimatedSection className="pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Curriculum Vitae
            </h1>
            <p className="mt-2 max-w-2xl text-foreground-muted">
              My academic and professional background.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="w-fit gap-2">
            <Link href="/cv.pdf" target="_blank">
              <Download className="size-3.5" />
              Download PDF
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      <div className="space-y-10">
        {cv.sections.map((section, i) => (
          <TimelineSection
            key={section.id}
            section={section}
            delay={i * 0.075}
          />
        ))}

        {/* Teaching */}
        {years.length > 0 && (
          <AnimatedSection delay={cv.sections.length * 0.075}>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              Teaching
            </h2>
            <div className="space-y-6">
              {years.map((year) => (
                <div key={year}>
                  <h3 className="mb-2 text-sm font-medium text-foreground-muted">
                    {year}
                  </h3>
                  <div className="space-y-2">
                    {coursesByYear[year].map((course) => (
                      <div
                        key={`${course.code}-${course.semester}`}
                        className="rounded-lg border border-border bg-card p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-accent-blue/10 text-accent-blue border-accent-blue/20"
                          >
                            {course.role}
                          </Badge>
                          <span className="text-xs text-foreground-muted">
                            {course.semester}
                          </span>
                        </div>
                        <h4 className="mt-2 text-sm font-semibold">
                          {course.code}: {course.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-foreground-muted">
                          {course.institution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </SectionWrapper>
  );
}
