import { HeroSection } from "@/components/hero/hero-section";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { AnimatedSection } from "@/components/common/animated-section";
import { TagChip } from "@/components/common/tag-chip";
import { PublicationCard } from "@/components/publications/publication-card";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedPublications } from "@/lib/publications";
import aboutData from "@/content/about.json";
import projectsData from "@/content/projects.json";
import siteConfig from "@/content/site-config.json";
import { Project } from "@/types/project";
import { ProfileImage } from "@/components/home/profile-image";
import { NewsItem } from "@/components/home/news-item";
import { SectionHeader } from "@/components/home/section-header";

const projects = projectsData as Project[];



export default function Home() {
  const featured = getFeaturedPublications();

  return (
    <>
      <HeroSection />

      {/* About */}
      <SectionWrapper id="about">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-12">
          <AnimatedSection>
            <ProfileImage src={siteConfig.profileImage} alt={`Photo of ${siteConfig.name}`} />
          </AnimatedSection>

          <div className="space-y-5">
            <AnimatedSection delay={0.075}>
              <div className="space-y-3 text-base leading-relaxed text-foreground-muted">
                {aboutData.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {aboutData.researchInterests.map((interest) => (
                  <TagChip key={interest} label={interest} />
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </SectionWrapper>

      {/* News */}
      {aboutData.news.length > 0 && (
        <SectionWrapper id="news">
          <AnimatedSection>
            <SectionHeader title="News" />
          </AnimatedSection>
          <div className="mt-6 space-y-4">
            {aboutData.news.slice(0, 5).map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <NewsItem date={item.date} text={item.text} />
              </AnimatedSection>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Selected Publications */}
      <SectionWrapper id="publications">
        <AnimatedSection>
          <SectionHeader
            title="Selected Publications"
            linkHref="/publications"
            linkLabel="View all"
          />
        </AnimatedSection>
        <div className="mt-4 space-y-3">
          {featured.slice(0, 3).map((pub, i) => (
            <AnimatedSection key={pub.id} delay={i * 0.075}>
              <PublicationCard publication={pub} />
            </AnimatedSection>
          ))}
        </div>
      </SectionWrapper>

      {/* Projects */}
      {projects.length > 0 && (
        <SectionWrapper id="projects">
          <AnimatedSection>
            <SectionHeader title="Projects" />
          </AnimatedSection>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {projects.slice(0, 4).map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.075}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
