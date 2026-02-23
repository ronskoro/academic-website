import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
    title: string;
    linkHref?: string;
    linkLabel?: string;
    className?: string;
}

export function SectionActionLink({ href, label }: { href: string; label: string }) {
    return (
        <Link
            href={href}
            className="group inline-flex items-center gap-1 text-sm font-medium text-accent-blue transition-all duration-200 hover:text-foreground active:scale-95"
        >
            {label}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
    );
}

export function SectionHeader({
    title,
    linkHref,
    linkLabel,
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn("flex items-end justify-between", className)}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {linkHref && linkLabel && (
                <SectionActionLink href={linkHref} label={linkLabel} />
            )}
        </div>
    );
}
