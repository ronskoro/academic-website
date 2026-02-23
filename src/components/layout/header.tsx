"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { motion } from "framer-motion";
import siteConfig from "@/content/site-config.json";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto grid h-16 max-w-5xl grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight transition-colors hover:text-accent-blue"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
                  isActive
                    ? "text-accent-blue"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 z-0 rounded-md bg-accent-blue/10 dark:bg-accent-blue/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
