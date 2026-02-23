import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import siteConfig from "@/content/site-config.json";

function GoogleScholarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
    </svg>
  );
}

function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-3.919-3.722h-2.4z" />
    </svg>
  );
}

const links = [
  {
    icon: GoogleScholarIcon,
    href: siteConfig.social.googleScholar,
    label: "Google Scholar",
  },
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter / X" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: OrcidIcon, href: siteConfig.social.orcid, label: "ORCID" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {links.map(
        (link) =>
          link.href && (
            <Tooltip key={link.label}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card/50 text-foreground-muted transition-all duration-200 active:scale-90 hover:-translate-y-0.5 hover:border-accent-blue/30 hover:text-accent-blue hover:shadow-sm"
                >
                  <link.icon className="size-4" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>{link.label}</TooltipContent>
            </Tooltip>
          )
      )}
    </div>
  );
}
