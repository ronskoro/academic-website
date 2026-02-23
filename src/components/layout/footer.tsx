import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import siteConfig from "@/content/site-config.json";

const socialLinks = [
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-sm font-medium">{siteConfig.name}</p>
          <p className="text-xs text-foreground-muted">
            {siteConfig.title} &middot; {siteConfig.affiliation}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(
            (link) =>
              link.href && (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="text-foreground-muted transition-colors hover:text-accent-blue"
                >
                  <link.icon className="size-4" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              )
          )}
        </div>

        <p className="text-xs text-foreground-muted">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
