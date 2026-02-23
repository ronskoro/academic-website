"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import Link from "next/link";
import { FileText, BookOpen, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MeshGradient } from "./mesh-gradient";
import { SocialLinks } from "./social-links";
import siteConfig from "@/content/site-config.json";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      className="group/hero relative -mt-16 flex min-h-[100vh] items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <MeshGradient />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover/hero:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(120, 180, 255, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Badge
            variant="outline"
            className="mb-6 border-accent-blue/30 bg-accent-blue/5 text-accent-blue"
          >
            {siteConfig.title} @ {siteConfig.affiliation}
          </Badge>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-serif text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted md:text-xl"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/publications">
              <BookOpen className="size-4" />
              Publications
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/cv">
              <FileText className="size-4" />
              CV
            </Link>
          </Button>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <SocialLinks />
        </motion.div>
      </div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce"
      >
        <Link
          href="#about"
          className="text-foreground-muted hover:text-foreground transition-colors"
          aria-label="Scroll down to about section"
        >
          <ChevronDown className="size-6 opacity-70" />
        </Link>
      </motion.div>
    </section>
  );
}
